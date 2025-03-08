import operatorModel from "../models/operators.model.js";

const getAll = async () => await operatorModel.find().lean();

const getById = async (id) => await operatorModel.findById(id).lean();

const create = async () => await operatorModel.create().lean();

const update = async (id, data) =>
  await operatorModel
    .findByIdAndUpdate({ _id: id }, { $set: { data } }, { new: true })
    .exec();

const deleteOne = async (id) => await operatorModel.deleteOne(id);

export { getAll, getById, create, update, deleteOne };
