import deliveryModel from "../models/deliveries.model.js";

const getAll = async () => await deliveryModel.find().lean();

const getById = async (id) => await deliveryModel.findById(id).lean();

const create = async () => await deliveryModel.create().lean();

const update = async (id, data) =>
  await deliveryModel
    .findByIdAndUpdate({ _id: id }, { $set: { data } }, { new: true })
    .exec();

const deleteOne = async (id) => await deliveryModel.deleteOne(id);

export { getAll, getById, create, update, deleteOne };
