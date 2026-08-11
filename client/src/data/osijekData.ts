export const getOsijekData = (language: string) => {
  const isHR = language === "HR";

  return {
    turizam: [
      {
        id: "t1",
        naziv: isHR ? "Tvrđa" : "Tvrđa (Baroque Citadel)",
        opis: isHR
          ? "Najočuvaniji kompleks barokne arhitekture u Hrvatskoj i povijesno srce Osijeka. Idealno za šetnju kamenim ulicama, posjet muzejima i uživanje u lokalnim kafićima."
          : "The best-preserved complex of Baroque architecture in Croatia and the historic heart of Osijek. Ideal for walking paved streets, visiting museums, and enjoying local cafes.",
        slika: require("../../assets/images/tvrda.jpg"),
        qrLink: "https://www.osijek.hr/kultura/tvrda/",
      },
      {
        id: "t2",
        naziv: isHR
          ? "Konkatedrala sv. Petra i Pavla"
          : "Co-Cathedral of St. Peter and Paul",
        opis: isHR
          ? "Prepoznatljiva neogotička građevina sagrađena od crvene fasadne cigle. Njezin zvonik visok 90 metara dominira glavnim gradskim trgom."
          : "A recognizable neo-Gothic building built of red facade brick. Its 90-meter-high bell tower dominates the main city square.",
        slika: require("../../assets/images/katedrala.jpg"),
        qrLink: "https://svpetaripavao.hr/konkatedrala/",
      },
      {
        id: "t3",
        naziv: isHR
          ? "Promenada i Pješački most"
          : "Promenade & Pedestrian Bridge",
        opis: isHR
          ? "Najljepša šetnica uz rijeku Dravu u regiji. Pješački most, koji spaja Osijek s Baranjom, jedan je od glavnih simbola grada i omiljeno mjesto za fotografiranje."
          : "The most beautiful promenade along the Drava River in the region. The pedestrian bridge, connecting Osijek with Baranja, is a major city symbol and a favorite photo spot.",
        slika: require("../../assets/images/promenada.jpg"),
        qrLink:
          "https://www.osijek.hr/osjecka-promenada-najljepsa-europska-setnica-uz-rijeku/",
      },
      {
        id: "t4",
        naziv: isHR ? "Zoološki vrt Osijek" : "Osijek Zoo",
        opis: isHR
          ? "Smješten na lijevoj obali Drave, ovo je najveći zoološki vrt u Hrvatskoj površinom, idealan za obiteljski izlet i rekreaciju."
          : "Located on the left bank of the Drava, this is the largest zoo in Croatia by area, ideal for a family trip and recreation.",
        slika: require("../../assets/images/zoo.jpg"),
        qrLink: "https://www.zoo-osijek.hr",
      },
      {
        id: "t5",
        naziv: isHR
          ? "Europska avenija i Secesija"
          : "European Avenue & Secession",
        opis: isHR
          ? "Jedinstveni niz secesijskih palača s kraja 19. i početka 20. stoljeća, najljepši primjer secesijske arhitekture u ovom dijelu Europe."
          : "A unique row of Secessionist palaces from the late 19th and early 20th centuries, the finest example of Secessionist architecture in this part of Europe.",
        slika: require("../../assets/images/promenada.jpg"), // Možeš zamijeniti vlastitom slikom secesije
        qrLink: "https://www.tzosijek.hr",
      },
    ],

    dogadjanja: [
      {
        id: "d1",
        naziv: isHR
          ? "Osječko ljeto kulture (OLJK)"
          : "Osijek Summer of Culture (OLJK)",
        vrijeme: isHR ? "Srpanj / Kolovoz" : "July / August",
        opis: isHR
          ? "Najveća kulturna manifestacija u istočnoj Hrvatskoj s bogatim kazališnim, filmskim, glazbenim i likovnim programom na otvorenome."
          : "The largest cultural event in eastern Croatia with a rich outdoor theater, film, music, and art program.",
        slika: require("../../assets/images/oljk1.jpg"),
        galerija: [
          require("../../assets/images/oljk1.jpg"),
          require("../../assets/images/oljk2.jpg"),
        ],
        qrLink: "https://www.tzosijek.hr/osjecko-ljeto-kulture-2026-1507",
      },
      {
        id: "d2",
        naziv: "Pannonian Challenge",
        vrijeme: isHR ? "Svibanj / Lipanj" : "May / June",
        opis: isHR
          ? "Najveći festival ekstremnog sporta i urbane kulture u regiji. Okuplja najbolje BMX, skate i romobil vozače svijeta."
          : "The largest extreme sports and urban culture festival in the region, gathering the world's best BMX, skate, and scooter riders.",
        slika: require("../../assets/images/pannonian1.jpg"),
        galerija: [
          require("../../assets/images/pannonian1.jpg"),
          require("../../assets/images/pannonian2.jpg"),
        ],
        qrLink: "https://pannonian.hr",
      },
      {
        id: "d3",
        naziv: isHR ? "Advent u Osijeku" : "Advent in Osijek",
        vrijeme: isHR ? "Prosinac" : "December",
        opis: isHR
          ? "Višestruko nagrađivan kao jedan od najljepših Advenata u Hrvatskoj, donosi čarobnu atmosferu, klizalište i bogatu gastronomsku ponudu."
          : "Multiple times awarded as one of the most beautiful Advents in Croatia, bringing a magical atmosphere, ice rink, and rich gastronomic offer.",
        slika: require("../../assets/images/advent1.jpg"),
        galerija: [
          require("../../assets/images/advent1.jpg"),
          require("../../assets/images/advent2.jpg"),
        ],
        qrLink: "https://www.tzosijek.hr/stranica.php?id=1475",
      },
      {
        id: "d4",
        naziv: isHR ? "Dani vina i turizma" : "Wine & Tourism Days",
        vrijeme: isHR ? "Listopad" : "October",
        opis: isHR
          ? "Manifestacija posvećena vrhunskim vinima Slavonije i Baranje uz bogat glazbeni i gastronomski program."
          : "An event dedicated to top wines of Slavonia and Baranja with a rich music and gastronomic program.",
        slika: require("../../assets/images/oljk1.jpg"),
        qrLink: "https://www.tzosijek.hr",
      },
    ],

    usluge: {
      zdravstvo: [
        {
          id: "u_z1",
          naziv: isHR ? "Hitna medicinska služba" : "Emergency Medical Service",
          opis: isHR
            ? "Hitni medicinski prijem i intervencije 0-24h."
            : "Emergency medical care 24/7.",
          info: "Tel: 194 / 031 225 555",
          qrLink: "https://www.hznzih.hr",
        },
        {
          id: "u_z2",
          naziv: isHR
            ? "Dom zdravlja Osječko-baranjske županije"
            : "Health Center Osijek",
          opis: isHR
            ? "Opća medicina, pedijatrija, laboratorij i specijalističke ordinacije."
            : "General medicine, pediatrics, laboratory and specialist clinics.",
          info: "Tel: 031 225 100",
          qrLink: "https://www.dzoob.hr",
        },
        {
          id: "u_z3",
          naziv: isHR ? "Dežurna ljekarna (Centar)" : "Duty Pharmacy (Center)",
          opis: isHR
            ? 'Ljekarna "Centar" na Trgu Ante Starčevića dežurna je 0-24h.'
            : '"Centar" Pharmacy at Ante Starčević Square is on duty 24/7.',
          info: "Tel: 031 211 744",
          qrLink: "https://ljekarne-srce.hr",
        },
        {
          id: "u_z4",
          naziv: isHR
            ? "Klinički bolnički centar Osijek (KBC)"
            : "Osijek Clinical Hospital Center",
          opis: isHR
            ? "Glavna bolnica u Osijeku za sve zdravstvene potrebe."
            : "Main hospital in Osijek for all healthcare needs.",
          info: "Tel: 031 223 111",
          qrLink: "https://www.kbco.hr",
        },
      ],
      prijevoz: [
        {
          id: "u_p1",
          naziv: isHR ? "Javni prijevoz (GPP)" : "Public Transport (GPP)",
          opis: isHR
            ? "Mreža tramvaja i autobusa diljem grada."
            : "Tram and bus network across the city.",
          info: "Tel: 031 228 300",
          qrLink: "https://web.gpp-osijek.com",
        },
        {
          id: "u_p2",
          naziv: isHR
            ? "Željeznički kolodvor Osijek"
            : "Osijek Railway Station",
          opis: isHR
            ? "Informacije o dolascima i odlascima vlakova (HŽ)."
            : "Train arrivals and departures information.",
          info: "Tel: 060 333 444",
          qrLink: "https://www.hzpp.hr",
        },
        {
          id: "u_p3",
          naziv: isHR ? "Taksi službe Osijek" : "Osijek Taxi Services",
          opis: isHR
            ? "Brz i pouzdan gradski prijevoz taksijem."
            : "Fast and reliable city taxi transport.",
          info: "Tel: Cammeo: 031 288 288",
          qrLink: "https://cammeo.hr",
        },
        {
          id: "u_p4",
          naziv: isHR
            ? "Sustav javnih bicikala (eMobi)"
            : "Public Bike System (eMobi)",
          opis: isHR
            ? "Najam bicikala na stanicama diljem grada."
            : "Bike rental at stations across the city.",
          info: "App: Nextbike",
          qrLink: "https://bikesharemap.com/osijek",
        },
      ],
      gradskeUsluge: [
        {
          id: "u_g1",
          naziv: isHR
            ? "Turistička zajednica grada Osijeka"
            : "Osijek Tourist Board",
          opis: isHR
            ? "Sve informacije za posjetitelje i turiste."
            : "All information for visitors and tourists.",
          info: "Tel: 031 203 782",
          qrLink: "https://www.tzosijek.hr",
        },
        {
          id: "u_g2",
          naziv: isHR ? "Policijska postaja" : "Police Station",
          opis: isHR
            ? "Hitne policijske intervencije i prijave."
            : "Emergency police interventions and reports.",
          info: "Tel: 192 / 031 237 237",
          qrLink: "https://osijek-baranjska.policija.hr",
        },
      ],
    },

    smjestaj: {
      hoteli: [
        {
          id: "s_h1",
          naziv: "Hotel Osijek",
          opis: isHR
            ? "Luksuzni hotel s 4 zvjezdice smješten uz samu obalu Drave s predivnim pogledom."
            : "Luxury 4-star hotel located right on the Drava riverbank with a wonderful view.",
          info: "★★★★ | Tel: 031 230 000",
          slika: require("../../assets/images/hotelosijek.png"),
          qrLink: "https://www.hotelosijek.png",
        },
        {
          id: "s_h2",
          naziv: "Hotel Waldinger",
          opis: isHR
            ? "Elegantni boutique hotel u secesijskoj zgradi u samom pješačkom središtu grada."
            : "Elegant boutique hotel in a Secessionist building right in the pedestrian city center.",
          info: "★★★★ | Tel: 031 250 400",
          slika: require("../../assets/images/hotelwaldinger.jpg"),
          qrLink: "https://www.waldinger.jpg",
        },
      ],
      apartmani: [
        {
          id: "s_a1",
          naziv: "Apartmani Tvrđa / Old Town",
          opis: isHR
            ? "Ugodno uređeni apartmani unutar povijesne jezgre Tvrđe."
            : "Cozy furnished apartments within the historic core of Tvrđa.",
          info: isHR ? "Privatni smještaj" : "Private Accommodation",
          slika: require("../../assets/images/apartmanitvrda.jpeg"),
          qrLink:
            "https://www.booking.com/searchresults.hr.html?ss=Tvrđa+Osijek",
        },
        {
          id: "s_a2",
          naziv: "City Center Apartments Osijek",
          opis: isHR
            ? "Moderni apartmani u blizini glavnog trga i svih sadržaja."
            : "Modern apartments close to the main square and all amenities.",
          info: isHR ? "Privatni smještaj" : "Private Accommodation",
          slika: require("../../assets/images/apartmanicentar.png"),
          qrLink:
            "https://www.booking.com/searchresults.hr.html?ss=Center+Osijek",
        },
      ],
      hosteli: [
        {
          id: "s_ho1",
          naziv: "Hostel Street",
          opis: isHR
            ? "Moderan i originalno uređen hostel u Gundulićevoj ulici, poznat po hodniku oslikanom poput gradske ulice."
            : "Modern and uniquely designed hostel in Gundulićeva Street, famous for its hallway painted like a city street.",
          info: isHR
            ? "Povoljan smještaj | Tel: 031 200 230"
            : "Budget Accommodation | Tel: +385 31 200 230",
          slika: require("../../assets/images/hostelstreet.jpg"),
          qrLink: "https://www.tzosijek.hr/hosteli-85",
        },
        {
          id: "s_ho2",
          naziv: "Hostel OS",
          opis: isHR
            ? "Smješten u samom centru grada u povijesnoj zgradi, nudi udoban smještaj u privatnim i zajedničkim sobama."
            : "Located right in the city center in a historic building, offering comfortable private and shared rooms.",
          info: isHR
            ? "U centru grada | Tel: 031 300 000"
            : "City Center | Tel: +385 31 300 000",
          slika: require("../../assets/images/hostelos.jpg"),
          qrLink: "https://www.tzosijek.hr",
        },
      ],
    },
  };
};
