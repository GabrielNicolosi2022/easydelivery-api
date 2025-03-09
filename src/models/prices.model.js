import mongoose from "mongoose";

const pricesListCollection = "PriceList";

const pricesZoneSchema = mongoose.Schema({
  zone: {
    type: String,
    required: true,
    Enum: ["alrededores", "caba", "sur", "norte", "oeste"],
  },
  group: {
    type: Number,
    required: true,
  },
  cities: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const pricesListSchema = mongoose.Schema({
  priceZone: pricesZoneSchema,
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const pricesListModel = mongoose.model(pricesListCollection, pricesListSchema);

export default pricesListModel;
