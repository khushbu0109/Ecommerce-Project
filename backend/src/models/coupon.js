const mongoose = require("mongoose");
const coupon = mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  discount: { type: String }, // percentage, fixed cart discount, fixed product discount
  usage_limit: { type: Number },
  individual_use: { type: Number },
  product_id: { type: String },
  shipping_tags: { type: String },
  exclude_sale_items: { type: String },
  minimum_amount: { type: Number },
  expiry_date: { type: Date },
  createAt: { type: Date, default: Date.now },

});

const Coupon = new mongoose.model("coupon", coupon);
module.exports = Coupon;
