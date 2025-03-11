import operatorModel from "../models/operators.model.js";

const getAll = async () => await operatorModel.find().lean();

const getById = async (id) => await operatorModel.findById(id).lean();

const getByUsername = async (username) =>
  await operatorModel.findOne({ username: username }).lean();

const create = async (data) => await operatorModel.create(data);

const update = async (id, data) =>
  await operatorModel
    .findByIdAndUpdate({ _id: id }, { $set: { data } }, { new: true })
    .exec();

const deleteOne = async (id) => await operatorModel.deleteOne(id);

export { getAll, getById, getByUsername, create, update, deleteOne };
