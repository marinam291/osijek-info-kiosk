export type LocationItem = {
  id: string;
  naziv: { HR: string; EN: string };
  opis: { HR: string; EN: string };
  vrijemeHoda: { HR: string; EN: string };
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
};

export const osijekLocations: LocationItem[] = [
  {
    id: "ChIJs67LHLnnXEcRT6Ko9pivzn0",
    naziv: { HR: "Tvrđa", EN: "Tvrđa (Old Town)" },
    opis: {
      HR: "Stara barokna jezgra grada i središte noćnog života.",
      EN: "The old Baroque city core and the center of nightlife.",
    },
    vrijemeHoda: { HR: "20 min", EN: "20 min walk" },
    latitude: 45.5585723,
    longitude: 18.6980934,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5585723,18.6980934&dirflg=w",
  },
  {
    id: "ChIJ98TtjqfnXEcRqvgTMTfIkwI",
    naziv: {
      HR: "Konkatedrala sv. Petra i Pavla",
      EN: "Co-cathedral of St. Peter and St. Paul",
    },
    opis: {
      HR: "Prekrasna neogotička građevina u samom centru, visoka 90 metara.",
      EN: "A stunning Neo-Gothic building in the city center, 90 meters tall.",
    },
    vrijemeHoda: { HR: "3 min", EN: "3 min walk" },
    latitude: 45.5608813,
    longitude: 18.6757071,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5608813,18.6757071&dirflg=w",
  },
  {
    id: "ChIJTRT26KPnXEcRYHxqE1AZzlY",
    naziv: { HR: "Pješački most", EN: "Pedestrian Bridge" },
    opis: {
      HR: "Simbol Osijeka preko rijeke Drave s predivnim pogledom.",
      EN: "Symbol of Osijek over the Drava River with a scenic view.",
    },
    vrijemeHoda: { HR: "10 min", EN: "10 min walk" },
    latitude: 45.5636021,
    longitude: 18.6853641,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5636021,18.6853641&dirflg=w",
  },
  {
    id: "ChIJhUEOzhLnXEcRvIYNugrSoJg",
    naziv: { HR: "Zoološki vrt", EN: "Osijek Zoo" },
    opis: {
      HR: "Najveći zoološki vrt u Hrvatskoj, smješten na lijevoj obali Drave.",
      EN: "The largest zoo in Croatia, located on the left bank of the Drava River.",
    },
    vrijemeHoda: { HR: "40 min hoda", EN: "40 min walk" },
    latitude: 45.5686912,
    longitude: 18.6675451,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5686912,18.6675451&dirflg=w",
  },
];
