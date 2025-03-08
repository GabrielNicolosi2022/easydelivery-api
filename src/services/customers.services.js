import customerModel from "../models/customers.model.js";

const getAll = async () => await customerModel.find().lean();

const getById = async (id) => await customerModel.findById(id).lean();

const create = async () => await customerModel.create().lean();

const update = async (id, data) =>
  await customerModel
    .findByIdAndUpdate({ _id: id }, { $set: { data } }, { new: true })
    .exec();

const deleteOne = async (id) => await customerModel.deleteOne(id);

export { getAll, getById, create, update, deleteOne };
