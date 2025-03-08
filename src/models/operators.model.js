import mongoose from "mongoose";

const operatorCollection = "Operators";

const operatorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "admin-chofer", "chofer"],
  },
});

const operatorModel = mongoose.model(operatorCollection, operatorSchema);

export default operatorModel;
