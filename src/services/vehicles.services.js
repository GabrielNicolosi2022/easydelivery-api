import vehicleModel from "../models/vehicles.model.js";

const getAll = async () => await vehicleModel.find().lean();

const getById = async (id) => await vehicleModel.findById(id).lean();

const create = async () => await vehicleModel.create().lean();

const update = async (id, data) =>
  await vehicleModel
    .findByIdAndUpdate({ _id: id }, { $set: { data } }, { new: true })
    .exec();

const deleteOne = async (id) => await vehicleModel.deleteOne(id);

export { getAll, getById, create, update, deleteOne };
