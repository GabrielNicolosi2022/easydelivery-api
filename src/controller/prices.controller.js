import getLogger from "../utils/log.utils.js";
import { validateFormatData } from "../helpers/commonValidations.helpers.js";
import { validatePriceFields } from "../helpers/pricesValidations.helpers.js";
import * as pricesServices from "../services/prices.services.js";

const log = getLogger();

// Traer lista completa de precios (zonas + adicionales)
const getPricesList = async (req, res) => {
  try {
    /* Obtener los query params */
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query;

    const sortOptions = {};
    if (sort) {
      if (sort === "asc") {
        sortOptions.price = 1;
      } else if (sort === "desc") {
        sortOptions.price = -1;
      }
    }

    const filter = {};
    if (query) {
      if (query.zone) {
        filter.$or = [{ zone: query.zone }];
      }
      if (query.zone.city) {
        filter.$or = [{ city: query.zone.city }];
      }
    }
    const zonePrices = await pricesServices.getAllPrices(filter, sortOptions);
    const AdditionalPrices = await pricesServices.getAllAdditionalPrices();

    const priceList = {
      precios: zonePrices,
      adicionales: AdditionalPrices,
    };

    res.status(200).json({
      status: "success",
      message: "Lista de precios",
      message:
        "Recordar que los adicionales de escalera son siempre por piso por bulto.\nRecordar que si la entrega tiene mas de un sitio de carga debe pedir recotización.",
      payload: priceList,
    });
  } catch (error) {
    log.error("Error al obtener las listas de precios", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Crear lista de precios
// TODO enviar todos los datos Strings convertidos a minusculas '.toLowerCase()'
const createPricesList = async (req, res) => {
  const data = req.body;
  log.info("createPricesList - requestData: ", data);
  try {
    // Validar que data sea un objeto y no sea enviado vacío
    const validatedData = validateFormatData(data);
    if (validatedData) {
      log.error(validatedData);
      return res
        .status(400)
        .json({ status: "Request error", message: validatedData });
    }
    // Validar campos obligatorios para la lista de precios antes de crearla
    const validatedFields = validatePriceFields(data);
    if (validatedFields) {
      log.error(validatedFields);
      return res
        .status(400)
        .json({ status: "Request error", message: validatedFields });
    }

    // Verificar si la zona ya existe con el mismo grupo
    const existingZoneWithGroup = await pricesServices.findZoneWithGroup(
      data.priceZone.zone,
      data.priceZone.group
    );
    if (existingZoneWithGroup) {
      // verificar si la ciudad existe en el grupo
      const existingCity = existingZoneWithGroup.priceZone.cities.includes(
        data.priceZone.cities[0]
      );
      if (existingCity) {
        log.error("La ciudad ya existe en este grupo.");
        return res.status(400).json({
          status: "Request error",
          message: "La ciudad ya existe en este grupo.",
        });
      } else {
        // agregar la/s ciudad/es al grupo
        existingZoneWithGroup.priceZone.cities.push(data.priceZone.cities[0]);
        await existingZoneWithGroup.save();
        return res.status(200).json({
          status: "success",
          message: "Ciudad agregada al grupo existente.",
          payload: existingZoneWithGroup,
        });
      }
    } else {
      // Crear un nuevo documento para el nuevo grupo
      const newPriceList = await pricesServices.createPrice({
        priceZone: {
          zone: data.priceZone.zone,
          group: data.priceZone.group,
          cities: data.priceZone.cities,
          price: data.priceZone.price,
        },
      });
      res.status(201).json({
        status: "success",
        message: "Lista de precios creada",
        payload: newPriceList,
      });
    }
  } catch (error) {
    log.fatal("Error al crear la lista de precios", error, error.message);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export { getPricesList, createPricesList };
