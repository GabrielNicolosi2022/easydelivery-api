import mongoose from "mongoose";

const pricesListCollection = "PriceList";

const pricesListSchema = mongoose.Schema({
  priceZone: {
    zone: {
      type: String,
      required: true,
      Enum: ["alrededores", "caba", "sur", "norte", "oeste"],
    },
    cities: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const pricesListModel = mongoose.model(pricesListCollection, pricesListSchema);

export default pricesListModel;
