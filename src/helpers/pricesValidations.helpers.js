// Validar campos obligatorios para la lista de precios antes de crearla
export const validatePriceFields = (data) => {
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
