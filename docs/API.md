# API dokumentacija

## Osnovno

Lokalna Docker adresa API-ja je `http://localhost:5000`. U produkciji se koristi javni HTTPS URL Render Web Servicea. Kontaktne rute registrirane su pod prefiksom `/api`.

## GET /

Osnovna provjera da je Express aplikacija pokrenuta.

Odgovor:

```text
Info Kiosk Server sa Sequelize-om je spreman!
```

## GET /api/health

Health check koji koristi statusni widget klijenta.

```json
{
  "status": "online",
  "timestamp": "2026-09-11T12:00:00.000Z"
}
```

Status: `200`.

## GET /api/items

Vraća stavke iz baze, galerije i povezane GPP linije/polaske gdje postoje. Dodatna događanja pokušavaju se dohvatiti s Osijek031; osnovni lokalni podaci ostaju dostupni ako vanjski izvor ne uspije.

Opcionalni query parametri:

- `godina` - godina, npr. `2026`
- `mjesec` - broj mjeseca od `1` do `12`

Primjer:

```text
GET /api/items?godina=2026&mjesec=9
```

Primjer stavke:

```json
{
  "id": "t1",
  "categoryKey": "turizam",
  "subCategory": "znamenitosti",
  "nazivHr": "Tvrđa",
  "nazivEn": "Tvrđa (Baroque Citadel)",
  "opisHr": "Opis na hrvatskom",
  "opisEn": "Description in English",
  "infoHr": "Dodatne informacije",
  "infoEn": "Additional information",
  "slika": "tvrda.jpg",
  "qrLink": "https://example.com",
  "ItemGalleries": [{ "imagePath": "tvrda-2.jpg" }]
}
```

Statusi: `200` uspjeh, `500` greška baze/servera.

## GET /api/event-details

Dohvaća opis događaja s vanjske poveznice.

Query parametar `url` je obavezan. Relativne Osijek031 poveznice nadopunjuju se automatski.

```text
GET /api/event-details?url=https%3A%2F%2Fwww.osijek031.com%2F...
```

Uspjeh:

```json
{ "opis": "Dohvaćeni opis događaja." }
```

Statusi: `400` nedostaje URL, `404` stranica nije dostupna, `500` greška dohvaćanja/parsiranja.

## GET /api/locations

Vraća lokacije prikazane na karti.

```json
{
  "id": "location-1",
  "nazivHr": "Tvrđa",
  "nazivEn": "Tvrđa (Old Town)",
  "opisHr": "Opis lokacije",
  "opisEn": "Location description",
  "vrijemeHodaHr": "10 min hoda",
  "vrijemeHodaEn": "10 min walk",
  "latitude": 45.5687,
  "longitude": 18.695,
  "googleMapsUrl": "https://maps.google.com/..."
}
```

Statusi: `200` uspjeh, `500` greška baze/servera.

## POST /api/check-email-block

Provjerava privremenu blokadu emaila.

Zahtjev:

```json
{ "email": "korisnik@example.com" }
```

Odgovori:

```json
{ "isBlocked": false }
```

ili:

```json
{ "isBlocked": true, "daysLeft": 2 }
```

Statusi: `200` uspjeh, `400` email nedostaje ili nije tekst.

## POST /api/send-email

Validira i obrađuje poruku iz kontakt-forme. Za neanonimne poruke šalje verifikacijski email prije konačne dostave gradonačelniku.

Zahtjev:

```json
{
  "lang": "hr",
  "isAnonymous": false,
  "senderName": "Ana Anić",
  "senderEmail": "ana@student.hr",
  "messageBody": "Poštovani, želim postaviti pitanje."
}
```

Pravila:

- `lang` je `hr` ili `en`
- `isAnonymous` je obavezan boolean
- za neanonimnu poruku potrebni su ime i valjana email adresa
- ime je ograničeno na 40, email na 50 znakova
- poruka ne smije biti prazna
- nedozvoljeni izrazi se odbijaju
- dopuštena su najviše 3 uspješno poslane poruke s istog uređaja u 15 minuta; neispravni zahtjevi, blokade, odustajanje, verifikacijski email i SMTP greške ne troše limit

Statusi: `200` uspjeh, `400` neispravan zahtjev, `403` blokiran email, `429` rate limit, `500` greška SMTP-a/servera.

## GET /api/verify-email

Prikazuje stranicu za potvrdu poveznice iz verifikacijskog emaila. Samo otvaranje poveznice ne šalje poruku, što sprječava automatske provjere poveznica u email servisima.

Parametri:

- `token` - token pending poruke
- `action` - `confirm` ili `cancel`

```text
GET /api/verify-email?token=TOKEN&action=confirm
```

Za stvarnu potvrdu stranica šalje:

```text
POST /api/verify-email?token=TOKEN&action=confirm
```

`confirm` tada šalje poruku gradonačelniku i briše pending poruku nakon uspjeha. `cancel` koristi isti GET/POST obrazac, a POST briše pending poruku i privremeno blokira email.

## Konfiguracija

```env
PORT=5000
DB_HOST=database
DB_NAME=osijek_kiosk
DB_USER=root
DB_PASSWORD=root
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
PUBLIC_SERVER_URL=http://localhost:5000
```

`PUBLIC_SERVER_URL` mora biti dostupna uređaju koji otvara verifikacijski email. Lokalno koristi se `http://localhost:5000`; na Renderu treba postaviti javni HTTPS URL Web Servicea. CORS je uključen za komunikaciju Expo web klijenta s API-jem.
