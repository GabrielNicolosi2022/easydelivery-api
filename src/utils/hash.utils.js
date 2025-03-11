import bcrypt from "bcrypt";

export const createHash = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const isValidPassword = (operator, password) => {
  bcrypt.compareSync(password, operator.password);
};

export const isSamePassword = async (password, hashedPassword) => {
  bcrypt.compare(password, hashedPassword);
};
