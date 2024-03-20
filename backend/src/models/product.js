const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
  p_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  date_created: {
    type: Date,
  },
  date_modified: {
    type: Date,
  },
  status: {
    type: Boolean,
    required: true,
  },
  featured: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: String,
  },
  regular_price: {
    type: String,
  },
  sale_price: {
    type: String,
  },
  tags: {
    type: String,
  },
  cat_id: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "category",
  },
  images: {
    type: String,
    require: true,
    trim: true,
  },
  Delivery_Day: {
    type: String,
  },
  Customer_Review: {
    type: String,
  },
  Discount: {
    type: String,
  },
  Sizes: {
    type: String,
  },
  Availability: {
    type: String,
  },

  attributes: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  variations: {
    type: String,
  },
  stock_status: {
    type: String,
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
