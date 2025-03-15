const data_1 = {
  first_name: "Gabriel",
  last_name: "Nicolosi",
  phone: "1130462293",
  username: "GabrielDev",
  password: "1234",
  role: "admin",
};

const data_2 = {
  first_name: "Miguel",
  last_name: "Castro",
  phone: "1120458975",
  username: "migueCastro",
  password: "6789",
  role: "chofer",
};

const arrayData = [
  {
    first_name: "Gabriel",
    last_name: "Nicolosi",
    phone: "1130462293",
    username: "GabrielDev",
    password: "1234",
    role: "admin",
  },
  {
    first_name: "Miguel",
    last_name: "Castro",
    phone: "1120458975",
    username: "migueCastro",
    password: "6789",
    role: "chofer",
  },
];

const incompleteData = {
  first_name: "Miguel",
  last_name: "Castro",
  username: "migueCastro",
  password: "6789",
  role: "chofer",
};

const invalidData = {
  first_name: "Gabriel",
  last_name: "Nicolosi",
  phone: 1130462293,
  username: "GabrielDev",
  password: "1234",
  role: "admin",
};

export { data_1, data_2, arrayData, incompleteData, invalidData };
