import sequelize, { initializeDatabase } from "./config/database.js";
import Item from "./models/Item.js";
import ItemGallery from "./models/ItemGallery.js";
import MapLocation from "./models/MapLocation.js";

export async function seedDatabase() {
  try {
    await initializeDatabase();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log(
      "Baza je očišćena. Krećem s unosom svih podataka sa slikama...",
    );

    await Item.bulkCreate([
      {
        id: "t1",
        categoryKey: "turizam",
        nazivHr: "Tvrđa",
        nazivEn: "Tvrđa (Baroque Citadel)",
        opisHr:
          "Najočuvaniji kompleks barokne arhitekture u Hrvatskoj i povijesno srce Osijeka. Idealno za šetnju kamenim ulicama, posjet muzejima i uživanje u lokalnim kafićima.",
        opisEn:
          "The best-preserved complex of Baroque architecture in Croatia and the historic heart of Osijek. Ideal for walking paved streets, visiting museums, and enjoying local cafes.",
        slika: "tvrda.jpg",
        qrLink: "https://www.osijek.hr/kultura/tvrda/",
      },
      {
        id: "t2",
        categoryKey: "turizam",
        nazivHr: "Konkatedrala sv. Petra i Pavla",
        nazivEn: "Co-Cathedral of St. Peter and Paul",
        opisHr:
          "Prepoznatljiva neogotička građevina sagrađena od crvene fasadne cigle. Njezin zvonik visok 90 metara dominira glavnim gradskim trgom.",
        opisEn:
          "A recognizable neo-Gothic building built of red facade brick. Its 90-meter-high bell tower dominates the main city square.",
        slika: "katedrala.jpg",
        qrLink: "https://svpetaripavao.hr/konkatedrala/",
      },
      {
        id: "t3",
        categoryKey: "turizam",
        nazivHr: "Promenada i Pješački most",
        nazivEn: "Promenade & Pedestrian Bridge",
        opisHr:
          "Najljepša šetnica uz rijeku Dravu u regiji. Pješački most, koji spaja Osijek s Baranjom, jedan je od glavnih simbola grada i omiljeno mjesto za fotografiranje.",
        opisEn:
          "The most beautiful promenade along the Drava River in the region. The pedestrian bridge, connecting Osijek with Baranja, is a major city symbol and a favorite photo spot.",
        slika: "promenada.jpg",
        qrLink:
          "https://www.osijek.hr/osjecka-promenada-najljepsa-europska-setnica-uz-rijeku/",
      },
      {
        id: "t4",
        categoryKey: "turizam",
        nazivHr: "Zoološki vrt Osijek",
        nazivEn: "Osijek Zoo",
        opisHr:
          "Smješten na lijevoj obali Drave, ovo je najveći zoološki vrt u Hrvatskoj površinom, idealan za obiteljski izlet i rekreaciju.",
        opisEn:
          "Located on the left bank of the Drava, this is the largest zoo in Croatia by area, ideal for a family trip and recreation.",
        slika: "zoo.jpg",
        qrLink: "https://www.zoo-osijek.hr",
      },
      {
        id: "t5",
        categoryKey: "turizam",
        nazivHr: "Europska avenija i Secesija",
        nazivEn: "European Avenue & Secession",
        opisHr:
          "Jedinstveni niz secesijskih palača s kraja 19. i početka 20. stoljeća, najljepši primjer secesijske arhitekture u ovom dijelu Europe.",
        opisEn:
          "A unique row of Secessionist palaces from the late 19th and early 20th centuries, the finest example of Secessionist architecture in this part of Europe.",
        slika: "promenada.jpg",
        qrLink: "https://www.tzosijek.hr",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "m_1",
        categoryKey: "muzeji",
        nazivHr: "Muzej Slavonije",
        nazivEn: "Museum of Slavonia",
        vrijemeHr: "Uto - Sub: 10:00 - 18:00",
        vrijemeEn: "Tue - Sat: 10:00 AM - 06:00 PM",
        opisHr:
          "Najveći muzej općeg tipa u Hrvatskoj, s bogatim zbirkama koje predstavljaju kulturnu, povijesnu i prirodnu baštinu Slavonije.",
        opisEn:
          "The largest general museum in Croatia, with rich collections presenting the cultural, historical, and natural heritage of Slavonia.",
        infoHr: "Zbirke i izložbe Muzeja Slavonije",
        infoEn: "Collections and exhibitions at the Museum of Slavonia",
        slika: "mso.jpg",
        qrLink: "https://mso.hr",
      },
      {
        id: "m_2",
        categoryKey: "muzeji",
        nazivHr: "Arheološki muzej Osijek",
        nazivEn: "Archaeological Museum Osijek",
        vrijemeHr: "Uto - Sub: 10:00 - 18:00",
        vrijemeEn: "Tue - Sat: 10:00 AM - 06:00 PM",
        opisHr:
          "Čuva i predstavlja arheološke nalaze koji svjedoče o životu ljudi na području Osijeka i Slavonije kroz tisuće godina.",
        opisEn:
          "Preserves and presents archaeological finds that tell the story of life in Osijek and Slavonia over thousands of years.",
        infoHr: "Arheološka baština Osijeka i Slavonije",
        infoEn: "Archaeological heritage of Osijek and Slavonia",
        slika: "arheoloski.png",
        qrLink: "https://amo.hr",
      },
      {
        id: "m_3",
        categoryKey: "muzeji",
        nazivHr: "Muzej likovnih umjetnosti",
        nazivEn: "Museum of Fine Arts",
        vrijemeHr: "Uto - Pet: 10:00 - 20:00",
        vrijemeEn: "Tue - Fri: 10:00 AM - 08:00 PM",
        opisHr:
          "Muzej čuva vrijednu zbirku slika i skulptura hrvatskih i europskih umjetnika od 18. stoljeća do suvremenog doba.",
        opisEn:
          "The museum houses a valuable collection of paintings and sculptures by Croatian and European artists from the 18th century to the present.",
        infoHr: "Zbirka hrvatske i europske umjetnosti",
        infoEn: "Collection of Croatian and European art",
        slika: "mlu.jpg",
        qrLink: "https://mlu.hr",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "d1",
        categoryKey: "dogadjanja",
        nazivHr: "Osječko ljeto kulture (OLJK)",
        nazivEn: "Osijek Summer of Culture (OLJK)",
        vrijemeHr: "Srpanj / Kolovoz",
        vrijemeEn: "July / August",
        opisHr:
          "Najveća kulturna manifestacija u istočnoj Hrvatskoj s bogatim kazališnim, filmskim, glazbenim i likovnim programom na otvorenome.",
        opisEn:
          "The largest cultural event in eastern Croatia with a rich outdoor theater, film, music, and art program.",
        slika: "oljk1.jpg",
        qrLink: "https://www.tzosijek.hr/osjecko-ljeto-kulture-2026-1507",
      },
      {
        id: "d2",
        categoryKey: "dogadjanja",
        nazivHr: "Pannonian Challenge",
        nazivEn: "Pannonian Challenge",
        vrijemeHr: "Svibanj / Lipanj",
        vrijemeEn: "May / June",
        opisHr:
          "Najveći festival ekstremnog sporta i urbane kulture u regiji. Okuplja najbolje BMX, skate i romobil vozače svijeta.",
        opisEn:
          "The largest extreme sports and urban culture festival in the region, gathering the world's best BMX, skate, and scooter riders.",
        slika: "pannonian1.jpg",
        qrLink: "https://pannonian.hr",
      },
      {
        id: "d3",
        categoryKey: "dogadjanja",
        nazivHr: "Advent u Osijeku",
        nazivEn: "Advent in Osijek",
        vrijemeHr: "Prosinac",
        vrijemeEn: "December",
        opisHr:
          "Višestruko nagrađivan kao jedan od najljepših Advenata u Hrvatskoj, donosi čarobnu atmosferu, klizalište i bogatu gastronomsku ponudu.",
        opisEn:
          "Multiple times awarded as one of the most beautiful Advents in Croatia, bringing a magical atmosphere, ice rink, and rich gastronomic offer.",
        slika: "advent1.jpg",
        qrLink: "https://www.tzosijek.hr/stranica.php?id=1475",
      },
      {
        id: "d4",
        categoryKey: "dogadjanja",
        nazivHr: "Dani vina i turizma",
        nazivEn: "Wine & Tourism Days",
        vrijemeHr: "Listopad",
        vrijemeEn: "October",
        opisHr:
          "Manifestacija posvećena vrhunskim vinima Slavonije i Baranje uz bogat glazbeni i gastronomski program.",
        opisEn:
          "An event dedicated to top wines of Slavonia and Baranja with a rich music and gastronomic program.",
        slika: "oljk1.jpg",
        qrLink: "https://www.tzosijek.hr",
      },
      {
        id: "dani-piva-1",
        categoryKey: "dogadjanja",
        nazivHr: "Dani prvog hrvatskog piva (1. dan)",
        nazivEn: "First Croatian Beer Days (Day 1)",
        datum: "2026-08-26",
        opisHr: "Koncert: Dražen Zečić",
        opisEn: "Concert: Dražen Zečić",
      },
      {
        id: "dani-piva-2",
        categoryKey: "dogadjanja",
        nazivHr: "Dani prvog hrvatskog piva (2. dan)",
        nazivEn: "First Croatian Beer Days (Day 2)",
        datum: "2026-08-27",
        opisHr: "Koncert: Džejla Ramović i Dženan Lončarević",
        opisEn: "Concert: Džejla Ramović & Dženan Lončarević",
      },
      {
        id: "dani-piva-3",
        categoryKey: "dogadjanja",
        nazivHr: "Dani prvog hrvatskog piva (3. dan)",
        nazivEn: "First Croatian Beer Days (Day 3)",
        datum: "2026-08-28",
        opisHr: "Koncert: Plavi orkestar",
        opisEn: "Concert: Plavi orkestar",
      },
      {
        id: "dani-piva-4",
        categoryKey: "dogadjanja",
        nazivHr: "Dani prvog hrvatskog piva (4. dan)",
        nazivEn: "First Croatian Beer Days (Day 4)",
        datum: "2026-08-29",
        opisHr: "Koncert: Slavonske lole",
        opisEn: "Concert: Slavonske lole",
      },
      {
        id: "dani-piva-5",
        categoryKey: "dogadjanja",
        nazivHr: "Dani prvog hrvatskog piva (5. dan)",
        nazivEn: "First Croatian Beer Days (Day 5)",
        datum: "2026-08-30",
        opisHr: "Koncert: Grupa Dalmatino",
        opisEn: "Concert: Grupa Dalmatino",
      },
    ]);

    await ItemGallery.bulkCreate([
      { itemId: "d1", imagePath: "oljk1.jpg" },
      { itemId: "d1", imagePath: "oljk2.jpg" },
      { itemId: "d2", imagePath: "pannonian1.jpg" },
      { itemId: "d2", imagePath: "pannonian2.jpg" },
      { itemId: "d3", imagePath: "advent1.jpg" },
      { itemId: "d3", imagePath: "advent2.jpg" },
    ]);

    await Item.bulkCreate([
      {
        id: "u_z1",
        categoryKey: "usluge",
        subCategory: "zdravstvo",
        nazivHr: "Hitna medicinska služba",
        nazivEn: "Emergency Medical Service",
        opisHr: "Hitni medicinski prijem i intervencije 0-24h.",
        opisEn: "Emergency medical care 24/7.",
        infoHr: "Tel: 194 / 031 225 555",
        infoEn: "Tel: 194 / 031 225 555",
        slika: "hitna.png",
        qrLink:
          "https://www.google.com/maps/dir/?api=1&origin=45.5585522,18.678293&destination=45.5428,18.6938",
      },
      {
        id: "u_z2",
        categoryKey: "usluge",
        subCategory: "zdravstvo",
        nazivHr: "Dom zdravlja Osječko-baranjske županije",
        nazivEn: "Health Center Osijek",
        opisHr:
          "Opća medicina, pedijatrija, laboratorij i specijalističke ordinacije.",
        opisEn:
          "General medicine, pediatrics, laboratory and specialist clinics.",
        infoHr: "Tel: 031 225 100",
        infoEn: "Tel: 031 225 100",
        slika: "domzdravlja.jpg",
      },
      {
        id: "u_z3",
        categoryKey: "usluge",
        subCategory: "zdravstvo",
        nazivHr: "Dežurna ljekarna (Centar)",
        nazivEn: "Duty Pharmacy (Center)",
        opisHr: 'Ljekarna "Centar" na Trgu Ante Starčevića dežurna je 0-24h.',
        opisEn: '"Centar" Pharmacy at Ante Starčević Square is on duty 24/7.',
        infoHr: "Tel: 031 211 744",
        infoEn: "Tel: 031 211 744",
        slika: "ljekarna.jpg",
      },
      {
        id: "u_z4",
        categoryKey: "usluge",
        subCategory: "zdravstvo",
        nazivHr: "Klinički bolnički centar Osijek (KBC)",
        nazivEn: "Osijek Clinical Hospital Center",
        opisHr: "Glavna bolnica u Osijeku za sve zdravstvene potrebe.",
        opisEn: "Main hospital in Osijek for all healthcare needs.",
        infoHr: "Tel: 031 223 111",
        infoEn: "Tel: 031 223 111",
        slika: "kbc.jpg",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "u_p1",
        categoryKey: "usluge",
        subCategory: "prijevoz",
        nazivHr: "Javni prijevoz (GPP)",
        nazivEn: "Public Transport (GPP)",
        opisHr:
          "Mreža tramvaja i autobusa diljem grada. Skenirajte QR kod za vozni red i polaske.",
        opisEn:
          "Tram and bus network across the city. Scan the QR code for timetables and departures.",
        infoHr: "Tel: 031 228 300",
        infoEn: "Tel: 031 228 300",
        slika: "gpp.jpg",
        qrLink: "https://web.gpp-osijek.com/polasci-2/",
      },
      {
        id: "u_p2",
        categoryKey: "usluge",
        subCategory: "prijevoz",
        nazivHr: "Željeznički kolodvor Osijek",
        nazivEn: "Osijek Railway Station",
        opisHr: "Informacije o dolascima i odlascima vlakova (HŽ).",
        opisEn: "Train arrivals and departures information.",
        infoHr: "Tel: 060 333 444",
        infoEn: "Tel: 060 333 444",
        slika: "hz.jpg",
      },
      {
        id: "u_p4",
        categoryKey: "usluge",
        subCategory: "prijevoz",
        nazivHr: "Sustav javnih bicikala (eMobi)",
        nazivEn: "Public Bike System (eMobi)",
        opisHr: "Najam bicikala na stanicama diljem grada.",
        opisEn: "Bike rental at stations across the city.",
        infoHr: "App: Nextbike",
        infoEn: "App: Nextbike",
        slika: "emobi.jpg",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "t_1",
        categoryKey: "usluge",
        subCategory: "taksi",
        nazivHr: "Cammeo Taxi Osijek",
        nazivEn: "Cammeo Taxi Osijek",
        infoHr: "031 288 888",
        infoEn: "031 288 888",
        opisHr:
          "Najveći taksi prijevoznik u gradu s mogućnošću poziva ili aplikacije.",
        opisEn:
          "The largest taxi provider in the city with call or app options.",
      },
      {
        id: "t_2",
        categoryKey: "usluge",
        subCategory: "taksi",
        nazivHr: "Uber Osijek",
        nazivEn: "Uber Osijek",
        infoHr: "Aplikacija",
        infoEn: "App",
        opisHr: "Globalna usluga prijevoza dostupna putem mobilne aplikacije.",
        opisEn: "Global ride-hailing service available via mobile app.",
        qrLink: JSON.stringify({
          android:
            "https://play.google.com/store/apps/details?id=com.ubercab&hl=en-US",
          ios: "https://apps.apple.com/us/app/uber-request-a-ride/id368677368",
        }),
      },
      {
        id: "t_3",
        categoryKey: "usluge",
        subCategory: "taksi",
        nazivHr: "Bolt Osijek",
        nazivEn: "Bolt Osijek",
        infoHr: "Aplikacija",
        infoEn: "App",
        opisHr:
          "Popularna platforma za naručivanje vožnji putem pametnog telefona.",
        opisEn: "Popular platform for ordering rides via smartphone.",
        qrLink: JSON.stringify({
          android:
            "https://play.google.com/store/apps/details?id=ee.mtakso.client&hl=en-US&pli=1",
          ios: "https://apps.apple.com/us/app/bolt-request-a-ride/id675033630",
        }),
      },
      {
        id: "t_4",
        categoryKey: "usluge",
        subCategory: "taksi",
        nazivHr: "Osiječki taxi",
        nazivEn: "Osijek Taxi",
        infoHr: "031 200 200",
        infoEn: "031 200 200",
        opisHr: "Osječki taxi koji je uvijek bio više od taxi službe.",
        opisEn:
          "The Osijek taxi that has always been more than a taxi service.",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "u_g1",
        categoryKey: "usluge",
        subCategory: "gradskeUsluge",
        nazivHr: "Turistička zajednica grada Osijeka",
        nazivEn: "Osijek Tourist Board",
        opisHr: "Sve informacije za posjetitelje i turiste.",
        opisEn: "All information for visitors and tourists.",
        infoHr: "Tel: 031 203 782",
        infoEn: "Tel: 031 203 782",
        slika: "tzgo.jpg",
        qrLink: "https://www.tzosijek.hr",
      },
      {
        id: "u_g2",
        categoryKey: "usluge",
        subCategory: "gradskeUsluge",
        nazivHr: "Policijska postaja",
        nazivEn: "Police Station",
        opisHr: "Hitne policijske intervencije i prijave.",
        opisEn: "Emergency police interventions and reports.",
        infoHr: "Tel: 192 / 031 237 237",
        infoEn: "Tel: 192 / 031 237 237",
        slika: "mup.jpg",
        qrLink: "https://osijek-baranjska.policija.hr",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "s_h1",
        categoryKey: "smjestaj",
        subCategory: "hoteli",
        nazivHr: "Hotel Osijek",
        nazivEn: "Hotel Osijek",
        opisHr:
          "Luksuzni hotel s 4 zvjezdice smješten uz samu obalu Drave s predivnim pogledom.",
        opisEn:
          "Luxury 4-star hotel located right on the Drava riverbank with a wonderful view.",
        infoHr: "★★★★ | Tel: 031 230 000",
        infoEn: "★★★★ | Tel: 031 230 000",
        slika: "hotelosijek.png",
      },
      {
        id: "s_h2",
        categoryKey: "smjestaj",
        subCategory: "hoteli",
        nazivHr: "Hotel Waldinger",
        nazivEn: "Hotel Waldinger",
        opisHr:
          "Elegantni boutique hotel u secesijskoj zgradi u samom pješačkom središtu grada.",
        opisEn:
          "Elegant boutique hotel in a Secessionist building right in the pedestrian city center.",
        infoHr: "★★★★ | Tel: 031 250 400",
        infoEn: "★★★★ | Tel: 031 250 400",
        slika: "hotelwaldinger.jpg",
      },
      {
        id: "s_a1",
        categoryKey: "smjestaj",
        subCategory: "apartmani",
        nazivHr: "Apartmani Tvrđa / Old Town",
        nazivEn: "Apartments Tvrđa / Old Town",
        opisHr: "Ugodno uređeni apartmani unutar povijesne jezgre Tvrđe.",
        opisEn: "Cozy furnished apartments within the historic core of Tvrđa.",
        infoHr: "Privatni smještaj",
        infoEn: "Private Accommodation",
        slika: "apartmanitvrda.jpeg",
      },
      {
        id: "s_a2",
        categoryKey: "smjestaj",
        subCategory: "apartmani",
        nazivHr: "City Center Apartments Osijek",
        nazivEn: "City Center Apartments Osijek",
        opisHr: "Moderni apartmani u blizini glavnog trga i svih sadržaja.",
        opisEn: "Modern apartments close to the main square and all amenities.",
        infoHr: "Privatni smještaj",
        infoEn: "Private Accommodation",
        slika: "apartmanicentar.png",
      },
      {
        id: "s_ho1",
        categoryKey: "smjestaj",
        subCategory: "hosteli",
        nazivHr: "Hostel Street",
        nazivEn: "Hostel Street",
        opisHr:
          "Moderan i originalno uređen hostel u Gundulićevoj ulici, poznat po hodniku oslikanom poput gradske ulice.",
        opisEn:
          "Modern and uniquely designed hostel in Gundulićeva Street, famous for its hallway painted like a city street.",
        infoHr: "Povoljan smještaj | Tel: 031 200 230",
        infoEn: "Budget Accommodation | Tel: +385 31 200 230",
        slika: "hostelstreet.jpg",
      },
      {
        id: "s_ho2",
        categoryKey: "smjestaj",
        subCategory: "hosteli",
        nazivHr: "Hostel OS",
        nazivEn: "Hostel OS",
        opisHr:
          "Smješten u samom centru grada u povijesnoj zgradi, nudi udoban smještaj u privatnim i zajedničkim sobama.",
        opisEn:
          "Located right in the city center in a historic building, offering comfortable private and shared rooms.",
        infoHr: "U centru grada | Tel: 031 300 000",
        infoEn: "City Center | Tel: +385 31 300 000",
        slika: "hostelos.jpg",
      },
    ]);

    await Item.bulkCreate([
      {
        id: "tr_1",
        categoryKey: "trgovine",
        nazivHr: "Portanova Shopping Center",
        nazivEn: "Portanova Shopping Center",
        opisHr:
          "Veliki trgovački centar s brojnim trgovinama mode, obuće, opreme za dom, elektronike, ugostiteljskim sadržajima i kinom.",
        opisEn:
          "A large shopping center with stores for fashion, footwear, home goods, electronics, dining options, and a cinema.",
        infoHr: "Otvoreno 09:00 - 21:00",
        infoEn: "Open 09:00 AM - 09:00 PM",
        slika: "portanova.jpg",
        qrLink: "https://www.portanova.hr",
      },
      {
        id: "tr_2",
        categoryKey: "trgovine",
        nazivHr: "Mall Osijek",
        nazivEn: "Mall Osijek",
        opisHr:
          "Suvremeni trgovački centar u središtu Osijeka s raznovrsnom ponudom trgovina, usluga, restorana i sadržaja za slobodno vrijeme.",
        opisEn:
          "A modern shopping center in central Osijek with a wide selection of shops, services, restaurants, and leisure activities.",
        infoHr: "Otvoreno 09:00 - 21:00",
        infoEn: "Open 09:00 AM - 09:00 PM",
        slika: "mall.jpg",
        qrLink: "https://mallosijek.hr",
      },
      {
        id: "tr_3",
        categoryKey: "trgovine",
        nazivHr: "Glavna osječka tržnica (Pijaca)",
        nazivEn: "Osijek Main Farmers Market",
        opisHr:
          "Tradicionalna osječka tržnica na kojoj se svakodnevno nude svježe voće, povrće, domaći proizvodi, cvijeće i lokalne namirnice.",
        opisEn:
          "Osijek's traditional market, offering fresh fruit, vegetables, homemade products, flowers, and local groceries every day.",
        infoHr: "Radno vrijeme: 07:00 - 13:00",
        infoEn: "Working hours: 07:00 AM - 01:00 PM",
        slika: "trznica.jpg",
        qrLink: "https://www.osjecka-trznica.hr",
      },
    ]);

    await MapLocation.bulkCreate([
      {
        id: "ChIJs67LHLnnXEcRT6Ko9pivzn0",
        nazivHr: "Tvrđa",
        nazivEn: "Tvrđa (Old Town)",
        opisHr: "Stara barokna jezgra grada i središte noćnog života.",
        opisEn: "The old Baroque city core and the center of nightlife.",
        vrijemeHodaHr: "20 min",
        vrijemeHodaEn: "20 min walk",
        latitude: 45.5585723,
        longitude: 18.6980934,
        googleMapsUrl:
          "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5585723,18.6980934&dirflg=w",
      },
      {
        id: "ChIJ98TtjqfnXEcRqvgTMTfIkwI",
        nazivHr: "Konkatedrala sv. Petra i Pavla",
        nazivEn: "Co-cathedral of St. Peter and St. Paul",
        opisHr:
          "Prekrasna neogotička građevina u samom centru, visoka 90 metara.",
        opisEn:
          "A stunning Neo-Gothic building in the city center, 90 meters tall.",
        vrijemeHodaHr: "3 min",
        vrijemeHodaEn: "3 min walk",
        latitude: 45.5608813,
        longitude: 18.6757071,
        googleMapsUrl:
          "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5608813,18.6757071&dirflg=w",
      },
      {
        id: "ChIJTRT26KPnXEcRYHxqE1AZzlY",
        nazivHr: "Pješački most",
        nazivEn: "Pedestrian Bridge",
        opisHr: "Simbol Osijeka preko rijeke Drave s predivnim pogledom.",
        opisEn: "Symbol of Osijek over the Drava River with a scenic view.",
        vrijemeHodaHr: "10 min",
        vrijemeHodaEn: "10 min walk",
        latitude: 45.5636021,
        longitude: 18.6853641,
        googleMapsUrl:
          "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5636021,18.6853641&dirflg=w",
      },
      {
        id: "ChIJhUEOzhLnXEcRvIYNugrSoJg",
        nazivHr: "Zoološki vrt",
        nazivEn: "Osijek Zoo",
        opisHr:
          "Najveći zoološki vrt u Hrvatskoj, smješten na lijevoj obali Drave.",
        opisEn:
          "The largest zoo in Croatia, located on the left bank of the Drava River.",
        vrijemeHodaHr: "40 min hoda",
        vrijemeHodaEn: "40 min walk",
        latitude: 45.5686912,
        longitude: 18.6675451,
        googleMapsUrl:
          "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5686912,18.6675451&dirflg=w",
      },
    ]);

    console.log(
      "SVI podaci iz osijekData i mapLocations sa slikama su uspješno uneseni u bazu!",
    );
  } catch (error) {
    console.error("Greška pri seedanju:", error);
    throw error;
  }
}
