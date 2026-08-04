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
      },
      {
        id: "t4",
        naziv: isHR ? "Zoološki vrt Osijek" : "Osijek Zoo",
        opis: isHR
          ? "Smješten na lijevoj obali Drave, ovo je najveći zoološki vrt u Hrvatskoj površinom, idealan za obiteljski izlet i rekreaciju."
          : "Located on the left bank of the Drava, this is the largest zoo in Croatia by area, ideal for a family trip and recreation.",
        slika: require("../../assets/images/zoo.jpg"),
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
      },
      {
        id: "d2",
        naziv: "Pannonian Challenge",
        vrijeme: isHR ? "Svibanj / Lipanj" : "May / June",
        opis: isHR
          ? "Najveći festival ekstremnog sporta i urbane kulture u regiji. Okuplja najbolje BMX, skate i romobil vozače svijeta."
          : "The largest extreme sports and urban culture festival in the region, gathering the world's best BMX, skate, and scooter riders.",
      },
      {
        id: "d3",
        naziv: isHR ? "Advent u Osijeku" : "Advent in Osijek",
        vrijeme: isHR ? "Prosinac" : "December",
        opis: isHR
          ? "Višestruko nagrađivan kao jedan od najljepših Advenata u Hrvatskoj, donosi čarobnu atmosferu, klizalište i bogatu gastronomsku ponudu."
          : "Multiple times awarded as one of the most beautiful Advents in Croatia, bringing a magical atmosphere, ice rink, and rich gastronomic offer.",
      },
    ],

    usluge: [
      {
        id: "u1",
        naziv: isHR ? "Javni prijevoz (GPP)" : "Public Transport (GPP)",
        opis: isHR
          ? "Grad je povezan odličnom mrežom tramvaja i autobusa. Glavna tramvajska linija (Linija 1) povezuje istok (Zeleno polje) i zapad (Višnjevac)."
          : "The city is connected by an excellent network of trams and buses. The main tram line (Line 1) connects the east (Zeleno polje) and west (Višnjevac).",
        info: "Tel: 031 228 300",
      },
      {
        id: "u2",
        naziv: isHR ? "Dežurna ljekarna" : "Duty Pharmacy",
        opis: isHR
          ? 'Ljekarna "Centar" na Trgu Ante Starčevića dežurna je 0-24h za sve hitne slučajeve i potrebe građana.'
          : '"Centar" Pharmacy at Ante Starčević Square is on duty 24/7 for all emergencies and citizen needs.',
        info: "Tel: 031 211 744",
      },
      {
        id: "u3",
        naziv: isHR
          ? "Nextbike sustav javnih bicikala"
          : "Nextbike Public Bike System",
        opis: isHR
          ? "Iznajmite bicikl na jednoj od brojnih stanica u gradu i provozajte se najdužom i najsigurnijom mrežom biciklističkih staza u Hrvatskoj."
          : "Rent a bike at one of the many city stations and ride along the longest and safest bicycle path network in Croatia.",
        info: isHR ? "Aplikacija: Nextbike" : "App: Nextbike",
      },
    ],
  };
};
