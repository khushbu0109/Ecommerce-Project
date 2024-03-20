
const mongoose = require("mongoose");
const customer = mongoose.Schema({
  f_name: { type: String },
  l_name: { type: String },
  image: { type: String },
  address: { type: String },
  city: { type: String },
  email: { type: String },
  phone: { type: Number },
  country: { type: String ,required:true},
  orders: { type: String ,required:true },
  password: { type: String ,required:true },
  status:{type: Boolean,required:true}
});

const Customer = new mongoose.model("customer", customer);
module.exports = Customer;
