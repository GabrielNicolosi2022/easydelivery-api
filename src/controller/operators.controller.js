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

const log = getLogger();

// Crear nuevo operador
const createOperator = async (req, res) => {
  const data = req.body;
  log.debug("createOperator - data: ", data);
  try {
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
      message: err.message,
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

export { createOperator, getAllOperators };
