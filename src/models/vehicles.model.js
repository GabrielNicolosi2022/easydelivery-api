import mongoose from "mongoose";

const vehicleCollection = "Vehicles";

const vehicleSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "mini flete",
      "furgon corto",
      "furgon largo",
      "caja corta",
      "caja larga",
      "otros",
    ],
  },
  registration: {
    type: String,
    required: true,
  },
  assignedDriver: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Operators",
  },
});

const vehicleModel = mongoose.model(vehicleCollection, vehicleSchema);

export default vehicleModel;
