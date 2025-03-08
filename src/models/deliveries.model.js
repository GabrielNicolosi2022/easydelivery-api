import mongoose from "mongoose";

const deliveriesCollection = "Deliveries";

/* Productos a entregar */
const productData = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});
/* Datos de entrega */
const deliveryData = mongoose.Schema({
  scheduledDate: {
    type: String,
    required: true,
  },
  timeRange: {
    type: String,
    required: true,
  },
  products: [productData],
  address: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  observations: {
    type: String,
    required: true,
  },
  tripCost: {
    type: String,
    required: true,
  },
  additional: {
    type: String,
  },
  totalCost: {
    type: String,
  },
  deliveryState: {
    type: String,
    enum: ["en camino", "entregado", "demorado", "no entregado"],
  },
});

const deliveriesList = mongoose.Schema({
  /* Datos del cliente */
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Customers",
  },
  /* Datos de entrega */
  deliveriesData: [deliveryData],

  /* Datos de vehiculo y conductor */
  vehicle: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Vehicles",
  },
});

const deliveriesSchema = mongoose.Schema({
  allDeliveries: [deliveriesList],
});

const deliveryModel = mongoose.model(deliveriesCollection, deliveriesSchema);

export default deliveryModel;
