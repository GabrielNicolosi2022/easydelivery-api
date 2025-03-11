// Validar campos obligatorios para crear operadores
export const validateOperatorsFields = (data) => {
  const { first_name, last_name, phone, username, password, role } = data;

  if (!(first_name || last_name || phone || username || password || role)) {
    return "Missing required fields";
  }
  // si no hay errores
  return null;
};
