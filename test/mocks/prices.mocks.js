// Crear una lista de precios por zona
export const formatPriceZoneList = {
  priceZone: {
    zone: "caba",
    group: 2,
    cities: ["Expresos"],
    price: 55000,
  },
};

// Crear una lista de precios multi-zona
export const formatPriceMultiZoneList = {
  priceZone: {
    zone: "caba",
    group: 1,
    cities: ["general"],
    price: 50000,
  },
  priceZone: {
    zone: "caba",
    group: 2,
    cities: ["Expresos"],
    price: 55000,
  },
  priceZone: {
    zone: "alrededores",
    group: 1,
    cities: ["Munro", "Florida", "Carapachay", "Olivos", "Vicente Lopez"],
    price: 50000,
  },
  priceZone: {
    zone: "sur",
    group: 3,
    cities: ["Berazategui", "Florencio Varela", "Hudson"],
    price: 120000,
  },
};

// Crear lista de precios adicionales
export const formatAdditionalPriceList = {
  additional: {
    description: ["escalera hasta 2mt"],
    price: 7500,
  },
  additional: {
    description: ["escalera + 2mt"],
    price: 10000,
  },
};
