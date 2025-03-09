import pricesModel from "../models/prices.model.js";
import additionalPricesModel from "../models/additionalsPrices.model.js";

/* Servicios para la lista de precios por zona */
const getAllPrices = async () => await pricesModel.find().lean();

const getPriceById = async (id) => await pricesModel.findOne(id).lean();

const createPrice = async (priceData) => await pricesModel.create(priceData);

const updatePrice = async (id, priceData) =>
  await pricesModel
    .findByIdAndUpdate({ _id: id }, { $set: { priceData } }, { new: true })
    .exec();

const deletePrice = async (id) => await pricesModel.deleteOne(id);

// Servicios relacionados
const findZoneWithGroup = async (zone, group) =>
  await pricesModel.findOne({
    "priceZone.zone": zone,
    "priceZone.group": group,
  });

/* Servicios para los precios adicionales */
const getAllAdditionalPrices = async () =>
  await additionalPricesModel.find().lean();

const getAdditionalPriceById = async (id) =>
  await additionalPricesModel.findById(id).lean();

const createAdditionalPrice = async (additionalPriceData) =>
  await additionalPricesModel.create(additionalPriceData);

const updateAdditionalPrice = async (id, additionalPriceData) =>
  await additionalPricesModel
    .findByIdAndUpdate(id, additionalPriceData, { new: true })
    .lean();

const deleteAdditionalPrice = async (id) =>
  await additionalPricesModel.findByIdAndDelete(id);

export {
  getAllPrices,
  getPriceById,
  createPrice,
  updatePrice,
  deletePrice,
  getAllAdditionalPrices,
  getAdditionalPriceById,
  createAdditionalPrice,
  updateAdditionalPrice,
  deleteAdditionalPrice,
  findZoneWithGroup,
};
