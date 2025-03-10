// Verificar que los datos proporcionados tienen un formato válido y que éste no este vacío
export const validateFormatData = (data) => {
  if (!(typeof data === "object" || Object.keys(data) > 0)) {
    return "Bad request: invalid sent format";
  }
  // si no tiene errores
  return null;
};
