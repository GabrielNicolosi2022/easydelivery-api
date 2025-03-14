import { operatorDataFormatted } from "../dto/operators.dto.js";
import { validateFormatData } from "../helpers/commonValidations.helpers.js";
import { validateOperatorsFields } from "../helpers/operatorsValidations.helpers.js";
import {
  getAll,
  getById,
  getByUsername,
  create,
  update,
  deleteOne,
} from "../services/operators.services.js";
import { createHash } from "../utils/hash.utils.js";
import getLogger from "../utils/log.utils.js";
import { convertStringsToLowerCase } from "../utils/conversions.utils.js";

const log = getLogger();

// Crear nuevo operador
const createOperator = async (req, res) => {
  let data = req.body;
  log.debug("createOperator - data: ", data);
  try {
    // Convertir todos los datos strings a minúsculas
    data = convertStringsToLowerCase(data);

    // Validar que data sea un objeto y no sea enviado vacío
    const validatedFormatData = validateFormatData(data);
    // log.debug("createOperator - validatedFormatData: " + validatedFormatData);
    if (validatedFormatData) {
      log.error(validatedFormatData);
      return res
        .status(400)
        .json({ status: "error", mesage: validatedFormatData });
    }
    // Validar campos obligatorios para el operador antes de crearlo
    const validatedFields = validateOperatorsFields(data);
    // log.debug("createOperator - validatedFields: " + validatedFields);
    if (validatedFields) {
      log.error(validatedFields);
      return res
        .status(400)
        .json({ status: "error", message: validatedFields });
    }
    // Verificar que el operador no exista en la base de datos
    const existingOperator = await getByUsername(data.username);
    log.debug("createOperator - existingOperator: " + existingOperator);
    if (existingOperator) {
      log.info("Operator already exists");
      return res
        .status(400)
        .json({ status: "error", message: "Operator already exists" });
    }
    // Hashear la password del Nuevo operador
    const hashedPassword = createHash(data.password);
    // Enviar al servicio la data con la password hasheada
    const createdOperator = await create({ ...data, password: hashedPassword });
    // Dar formato a la respuesta del servicio
    const newOperator = operatorDataFormatted(createdOperator);

    res.status(201).json({
      status: "success",
      message: "New operator created",
      payload: newOperator,
    });
  } catch (err) {
    log.fatal("Error al crear el nuevo operador", err, err.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Obtener todos los operadores
const getAllOperators = async (req, res) => {
  try {
    const data = await getAll();
    if (!data) {
      log.error("No se encontraron operadores en la base de datos");
      return res.status(404).json({
        status: "error",
        message: "No se encontraron operadores en la base de datos",
      });
    }
    // Dar formato a la respuesta del servicio
    const formattedData = data.map((operator) =>
      operatorDataFormatted(operator)
    );

    return res.status(200).json({
      status: "success",
      message: "Operadores encontrados...",
      payload: formattedData,
    });
  } catch (err) {
    log.fatal("Error al obtener los operadores", err);
    res.status(500).json({ status: "error", messaje: "Internal Server Error" });
  }
};

// Obtener un operador mediante su id
const getOperatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getById(id);
    if (!data) {
      log.error("No se encontró el operador en la base de datos");
      return res.status(404).json({
        status: "error",
        message: "No se encontró el operador en la base de datos",
      });
    }
    // Dar formato a la respuesta del servicio
    const formattedData = operatorDataFormatted(data);
    res.status(200).json({
      status: "succes",
      message: "Operador encontrado",
      payload: formattedData,
    });
  } catch (err) {
    log.fatal("Error al obtener el operador", err);
    res.status(500).json({ status: "error", messaje: "Internal Server Error" });
  }
};

// Obtener un operador mediante su username
//! Está funcionando pero no le encuento el sentido a la ruta...
const getOperatorByUsername = async (req, res) => {
  const { username } = req.body;
  console.log("username: ", username);
  try {
    const data = await getByUsername(username);
    console.log("data: ", data);
    if (!data) {
      log.error("No se encontró el operador en la base de datos");
      return res.status(404).json({
        status: "error",
        message: "No se encontró el operador en la base de datos",
      });
    }
    // Dar formato a la respuesta del servicio
    const formattedData = operatorDataFormatted(data);
    res.status(200).json({
      status: "succes",
      message: "Operador encontrado",
      payload: formattedData,
    });
  } catch (err) {
    log.fatal("Error al obtener el operador", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Actualizar datos de operador
const updateOperator = async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  let data = req.body;
  console.log("data: ", data);
  try {
    // Convertir todos los datos strings a minúsculas
    data = convertStringsToLowerCase(data);

    // Validar que data sea un objeto y no sea enviado vacío
    const validatedFormatData = validateFormatData(data);
    // log.debug("updateOperator - validatedFormatData: " + validatedFormatData);
    if (validatedFormatData) {
      log.error(validatedFormatData);
      return res
        .status(400)
        .json({ status: "error", mesage: validatedFormatData });
    }
    console.log("data: ", data);
    const modifyOperator = await update(id, data);
    console.log("modifyOperator: ", modifyOperator);
    // Dar formato a la respuesta del servicio
    const updatedOperator = operatorDataFormatted(modifyOperator);

    res.status(200).json({
      status: "success",
      message: "Operator successfully updated",
      payload: updatedOperator,
    });
  } catch (err) {
    log.fatal("Error al modificar el operador", err, err.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Eliminar un operador
const deleteOperator = async (req, res) => {
  const { id } = req.body;
  try {
    const findOperator = getById(id);
    if (!findOperator) {
      log.error("Operator not found");
      return res
        .status(404)
        .json({ status: "error", message: "Operator not found" });
    }
    const deletedOperator = deleteOne(id);

    res
      .status(200)
      .json({ status: "success", message: "Operator succesfully deleted" });
  } catch (err) {
    log.fatal("Error intentando eliminar el operador", err, err.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export {
  createOperator,
  getAllOperators,
  getOperatorById,
  getOperatorByUsername,
  updateOperator,
  deleteOperator,
};
