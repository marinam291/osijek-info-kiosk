export type ServiceCategory = {
  key: string;
  label: string;
};

export function getServiceCategories(isHR: boolean): ServiceCategory[] {
  return [
    { key: "sve", label: isHR ? "Sve usluge" : "All Services" },
    { key: "zdravstvo", label: isHR ? "Zdravstvo" : "Healthcare" },
    { key: "prijevoz", label: isHR ? "Prijevoz" : "Transport" },
    {
      key: "gradskeUsluge",
      label: isHR ? "Gradske usluge" : "City Services",
    },
    { key: "smjestaj", label: isHR ? "Smještaj" : "Accommodation" },
    { key: "trgovine", label: isHR ? "Trgovine i šoping" : "Shopping" },
  ];
}

export function getTransportCategories(isHR: boolean): ServiceCategory[] {
  return [
    { key: "sve", label: isHR ? "Svi prijevozi" : "All Transport" },
    { key: "javni", label: isHR ? "Javni prijevoz" : "Public Transport" },
    { key: "taksi", label: isHR ? "Taksi" : "Taxi" },
  ];
}

export function getAccommodationCategories(isHR: boolean): ServiceCategory[] {
  return [
    { key: "sve", label: isHR ? "Svi smještaji" : "All" },
    { key: "hoteli", label: isHR ? "Hoteli" : "Hotels" },
    { key: "apartmani", label: isHR ? "Apartmani" : "Apartments" },
    { key: "hosteli", label: isHR ? "Hosteli" : "Hostels" },
  ];
}
