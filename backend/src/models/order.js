const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  status: {
    type: Boolean,
    required: true,

  },
  total: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },

      p_name: {type: String,},
      quantity: { type: Number },
      price: { type: Number },


});
const Order = mongoose.model("order", orderSchema);
module.exports = Order;

