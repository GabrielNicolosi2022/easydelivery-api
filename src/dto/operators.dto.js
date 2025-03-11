export const operatorDataFormatted = (data) => {
  const { _id, first_name, last_name, phone, username, role } = data;

  return {
    operator_Id: _id,
    first_name: first_name,
    last_name: last_name,
    username: username,
    phone: phone,
    role: role,
  };
};
