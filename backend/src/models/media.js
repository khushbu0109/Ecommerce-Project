const mongoose = require("mongoose");

const { Schema } = mongoose;
const mediaSchema = new Schema({
  m_type: {
    type: String,
    require: true,
  },
  m_url: {
    type: String,
    require: true,
  },
  m_size: {
    type: String,
  },
  update_At: {
    type: Date,
    require: true,
    default: Date.now,
  },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Mediamodel = new mongoose.model("media", mediaSchema);
module.exports = Mediamodel;
