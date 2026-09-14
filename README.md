# Osijek Info Kiosk

Digitalni informacijski kiosk za Grad Osijek. Prikazuje turističke znamenitosti, muzeje, događanja, gradske usluge, smještaj, trgovine, kartu grada, vrijeme, vijesti i kontakt-formu za gradonačelnika.

Projekt se sastoji od Expo/React Native klijenta, Express/TypeScript API-ja i MySQL baze. Preporučeni način pokretanja je Docker Compose.

## Sadržaj

- [Mogućnosti](#mogućnosti)
- [Tehnologije](#tehnologije)
- [Struktura projekta](#struktura-projekta)
- [Preduvjeti](#preduvjeti)
- [Pokretanje s Dockerom](#pokretanje-s-dockerom)
- [Objava na Renderu](#objava-na-renderu)
- [Lokalni razvoj](#lokalni-razvoj)
- [Konfiguracija](#konfiguracija)
- [Baza i seed podaci](#baza-i-seed-podaci)
- [Provjera projekta](#provjera-projekta)
- [API](#api)
- [Sigurnost](#sigurnost)
- [Rješavanje problema](#rješavanje-problema)
- [Dokumentacija](#dokumentacija)

## Mogućnosti

- početni ekran s vizualnim identitetom grada
- hrvatski i engleski jezik
- screensaver nakon neaktivnosti i kiosk način rada
- znamenitosti i muzeji s detaljnim opisima
- događanja s dohvatom detalja s vanjskog izvora
- imenik zdravstva, javnih usluga, prijevoza, taksija, smještaja i trgovina
- karta s lokacijama i poveznicama za navigaciju
- sat, vremenska prognoza i ticker gradskih vijesti
- statusna poruka kada API nije dostupan
- kontakt-forma s email verifikacijom
- Dockerizirani klijent, API i MySQL baza

Korisničko sučelje prvenstveno je optimizirano za kiosk zaslon rezolucije
`1920 x 1080`. Layout koristi responzivno skaliranje kako bi se prilagodio i
drugim veličinama zaslona.

Za muzeje, znamenitosti, zdravstvo, gradske usluge, smještaj i trgovine detalji se prikazuju kao opis bez QR koda. QR se koristi samo tamo gdje je poveznica predviđena za tu funkciju.

## Tehnologije

### Klijent

- Expo SDK, Expo Router i React Native Web
- React 19 i TypeScript
- Reanimated, Gesture Handler i SVG
- Expo Image, AV, Font, Device, Linking, Splash Screen i System UI
- `react-native-qrcode-svg` za QR prikaze gdje su potrebni
- ESLint

### Server

- Node.js 20+, Express 5 i TypeScript
- Sequelize, MySQL 8 i `mysql2`
- `dotenv`, `cors`, Zod i `validator`
- Nodemailer, vlastiti limiter uspješnih slanja i Winston
- `tsx` za razvoj

### Vanjski izvori

- Open-Meteo za vremensku prognozu
- WordPress API Grada Osijeka za ticker vijesti
- Osijek031 za vanjska događanja
- Google Maps za kartu i navigaciju
- Gmail SMTP za kontakt-formu

## Struktura projekta

```text
osijek-info-kiosk/
├── client/
│   ├── src/
│   │   ├── app/                 # Expo Router ulaz
│   │   ├── components/          # viewovi, modali i widgeti
│   │   ├── config/              # konfiguracija UI kategorija
│   │   ├── context/             # tema aplikacije
│   │   ├── services/            # API i vanjski servisi
│   │   └── utils/               # pomoćne funkcije
│   ├── assets/
│   ├── Dockerfile
│   ├── app.json
│   └── package.json
├── server/
│   ├── config/                  # baza i logger
│   ├── models/                  # Sequelize modeli
│   ├── routes/                  # Express rute
│   ├── schemas/                 # Zod sheme zahtjeva
│   ├── utils/                   # email predlošci i pomoćne funkcije
│   ├── seed.ts                  # demo podaci
│   ├── server.ts                # API ulaz
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── API.md
│   └── PROJECT_DOCUMENTATION.md
├── docker-compose.yml
└── README.md
```

## Preduvjeti

- Docker Desktop s Docker Composeom
- Node.js 20+ i npm
- slobodni portovi `3307`, `5000` i `8081`

## Pokretanje s Dockerom

Nakon kloniranja iz korijena projekta napravi lokalnu konfiguraciju:

```powershell
Copy-Item server\.env.example server\.env
```

Za kontakt-formu upiši stvarni Gmail račun i Gmail App Password u `server/.env`. Zatim pokreni sustav:

```bash
docker compose up --build
```

Otvori klijent na [http://localhost:8081](http://localhost:8081). API je na `http://localhost:5000` s računala na kojem radi Docker, a MySQL je izložen na host portu `3307`.

Za zaustavljanje:

```bash
docker compose down
```

`docker compose down -v` briše i MySQL volumen, odnosno sve lokalne podatke baze.

## Objava na Renderu

Projekt se na Renderu objavljuje kao dva servisa:

1. `server` kao **Web Service**
2. `client` kao **Static Site**

Render ne nudi MySQL bazu u ovom projektu, pa prije servera trebaš imati dostupnu vanjsku MySQL bazu i podatke za spajanje. Baza mora biti dostupna s interneta, a u njoj treba postojati baza `osijek_kiosk`.

### 1. Server Web Service

Na Renderu odaberi **New > Web Service**, poveži GitHub repozitorij i postavi:

```text
Root Directory: server
Build Command: npm install && npm run build
Start Command: npm start
Health Check Path: /api/health
```

U Environment Variables dodaj:

```env
PORT=10000
DB_HOST=adresa-mysql-servera
DB_NAME=osijek_kiosk
DB_USER=korisnik_baze
DB_PASSWORD=lozinka_baze
EMAIL_USER=tvoj_gmail@gmail.com
EMAIL_PASS=gmail_app_password
PUBLIC_SERVER_URL=https://osijek-info-kiosk.onrender.com
```

Render sam postavlja `PORT`; nemoj se oslanjati na lokalni port `5000` u produkciji. Nakon deploya u `PUBLIC_SERVER_URL` upiši stvarni URL Render Web Servicea koji obrađuje `/api` rute, npr. `https://osijek-kiosk-api.onrender.com`.

### 2. Client Static Site

Na Renderu odaberi **New > Static Site**, ponovno poveži isti repozitorij i postavi:

```text
Root Directory: client
Build Command: npm install && npm run build:web
Publish Directory: dist
```

Dodaj build environment variable s URL-om servera:

```env
EXPO_PUBLIC_API_URL=https://osijek-info-kiosk.onrender.com
```

Nakon deploya otvori Render URL statičke stranice. Ako promijeniš server URL, moraš ponovno izgraditi client jer se `EXPO_PUBLIC_API_URL` ugrađuje tijekom builda.

### Važne napomene

- `PUBLIC_SERVER_URL` mora biti javni HTTPS URL servera jer ga korisnik otvara iz emaila.
- Gmail koristi App Password, ne običnu lozinku Gmail računa.
- Besplatni Render server može se uspavati nakon neaktivnosti, pa prvi zahtjev može biti sporiji.
- Za produkciju ne stavljaj stvarne lozinke u repozitorij; unesi ih samo u Render Environment Variables.

## Lokalni razvoj

Klijent:

```bash
cd client
npm install
npm run web
```

Za Expo development server koristi `npm start`.

Server zahtijeva dostupan MySQL. Za pokretanje izvan Dockera postavi `DB_HOST=localhost` u `server/.env`:

```bash
cd server
npm install
npm run dev
```

## Konfiguracija

Kopiraj [server/.env.example](server/.env.example) u `server/.env`:

```env
PORT=5000
DB_HOST=database
DB_NAME=osijek_kiosk
DB_USER=root
DB_PASSWORD=root
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PUBLIC_SERVER_URL=http://localhost:5000
```

- U Dockeru je `DB_HOST=database` ime Compose servisa.
- Izvan Dockera koristi `DB_HOST=localhost`.
- `EMAIL_USER` i `EMAIL_PASS` potrebni su za kontakt-formu.
- `PUBLIC_SERVER_URL` se koristi u linkovima email potvrde. Lokalno je `http://localhost:5000`; na Renderu mora biti javni HTTPS URL Web Servicea.
- `server/.env` ne smije se commitati.

Klijent zadano koristi `https://osijek-info-kiosk.onrender.com`. Za lokalni Docker razvoj postavi `EXPO_PUBLIC_API_URL` na `http://localhost:5000`, a za drugi LAN uređaj na LAN adresu API računala:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

Nakon promjene ponovno pokreni Expo ili Docker client.

## Baza i seed podaci

Server pri pokretanju provjerava bazu, čeka MySQL, sinkronizira Sequelize modele i pokreće seed ako nema stavki u tablici `items`.

Ručno seedanje potpuno briše postojeće tablice i ponovno unosi demo podatke. Koristi ga samo u razvoju:

```bash
docker compose stop server
docker compose run --rm server node --import tsx -e "import('./seed.ts').then(({ seedDatabase }) => seedDatabase())"
docker compose up -d server client
```

## Provjera projekta

```bash
npm run lint --prefix client
npm run build --prefix server
curl http://localhost:5000/api/health
```

Health odgovor treba sadržavati `"status":"online"`.

## API

Glavne rute:

- `GET /` - osnovna poruka servera
- `GET /api/health` - status servera
- `GET /api/items` - sadržaj i događanja
- `GET /api/event-details?url=...` - detalji vanjskog događaja
- `GET /api/locations` - lokacije za kartu
- `POST /api/check-email-block` - provjera blokiranog emaila
- `POST /api/send-email` - slanje verifikacijskog emaila
- `GET /api/verify-email?token=...&action=confirm|cancel` - prikaz potvrde ili odustajanja
- `POST /api/verify-email?token=...&action=confirm|cancel` - stvarna potvrda slanja ili odustajanje

Detalji i primjeri nalaze se u [docs/API.md](docs/API.md).

## Sigurnost

- Ne commitaj `server/.env`, Gmail App Password ni druge tajne.
- Za javni deployment koristi HTTPS u `PUBLIC_SERVER_URL`.
- Kontaktna ruta koristi Zod validaciju i ograničava na najviše 3 uspješno poslane poruke s istog uređaja u 15 minuta; neuspjeli pokušaji ne troše limit.
- Razvojne MySQL vrijednosti `root/root` nisu primjer za produkciju.
- U produkciji ograniči javno izlaganje MySQL porta i koristi zasebnog DB korisnika.
- Verifikacijski linkovi moraju biti dostupni uređaju koji otvara email.

## Rješavanje problema

### Nedostaje `server/.env`

```powershell
Copy-Item server\.env.example server\.env
```

### Server javlja izgubljenu vezu

```bash
docker compose ps
curl http://localhost:5000/api/health
docker compose logs --tail=100 server
```

### Baza nije dostupna

Provjeri da je `kiosk_mysql_db` `healthy` i da je `DB_HOST=database` unutar Dockera.

### Klijent ne vidi API

Ako su klijent i API na različitim računalima, postavi `EXPO_PUBLIC_API_URL` na LAN adresu API računala i ponovno pokreni klijent.

### Email ne radi

Provjeri Gmail App Password, `EMAIL_USER`, `EMAIL_PASS` i `PUBLIC_SERVER_URL`. Obična Gmail lozinka nije zamjena za App Password.

## Dokumentacija

- [API dokumentacija](docs/API.md)
- [Projektna dokumentacija](docs/PROJECT_DOCUMENTATION.md)

## Licenca

Projekt nema javno definiranu licencu i namijenjen je internom/edukacijskom korištenju kao gradski informacijski kiosk.
