import mongoose from "mongoose";

const additionalPricesCollection = "AdditionalPrices";

const additionalPricesSchema = mongoose.Schema({
  additional: {
    description: {
      type: String,
      enum: ["escalera hasta 2mt", "escalera + 2mt"],
    },
    price: {
      type: Number,
    },
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const additionalPricesModel = mongoose.model(
  additionalPricesCollection,
  additionalPricesSchema
);

export default additionalPricesModel;
