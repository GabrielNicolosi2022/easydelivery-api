// Crear una lista de precios por zona
export const formatPriceZoneList = {
  priceZone: {
    zone: "caba",
    cities: ["Expresos"],
    price: 55000,
  },
};

// Crear una lista de precios multi-zona
export const formatPriceMultiZoneList = {
  priceZone: {
    zone: "caba",
    cities: ["general"],
    price: 50000,
  },
  priceZone: {
    zone: "caba",
    cities: ["Expresos"],
    price: 55000,
  },
  priceZone: {
    zone: "alrededores",
    cities: ["Munro", "Florida", "Carapachay", "Olivos", "Vicente Lopez"],
    price: 50000,
  },
  priceZone: {
    zone: "sur",
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
