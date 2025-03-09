import { findZoneWithGroup } from "../services/prices.services.js";

// Verificar que los datos proporcionados tienen un formato válido y que éste no este vacío
export const validateFormatData = (data) => {
  if (!(typeof data === "object" || Object.keys(data) > 0)) {
    return "Bad request: invalid sent format";
  }
  // si no tiene errores
  return null;
};

// Validar campos obligatorios para la lista de precios antes de crearla
export const validateFields = (data) => {
  const { priceZone } = data;
  if (
    !priceZone ||
    !priceZone.zone ||
    !priceZone.group ||
    !priceZone.cities ||
    !priceZone.price
  ) {
    return "Missing required fields";
  }
  // si no tiene errores
  return null;
};
