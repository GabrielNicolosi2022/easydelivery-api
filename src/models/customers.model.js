import mongoose from "mongoose";

const customerCollection = "Customers";

const contactSchema = mongoose.Schema({
  contactName: {
    type: String,
  },
  position: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const customersSchema = mongoose.Schema({
  customerName: {
    //nombre
    type: String,
    required: true,
  },
  address: {
    //direccion
    type: String,
    required: true,
  },
  city: {
    //ciudad
    type: String,
    required: true,
  },
  phone: {
    //telefono
    type: String,
    required: true,
  },
  //contactos en la empresa
  contacts: [contactSchema],
  role: {
    type: String,
    required: true,
    enum: ["empresa", "particular"],
  },
});

const customerModel = mongoose.model(customerCollection, customersSchema);

export default customerModel;
