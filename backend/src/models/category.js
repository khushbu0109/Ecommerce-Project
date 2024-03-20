const mongoose = require("mongoose");
const category = mongoose.Schema({
  name: { type: String },
  cat_type: {
    type: String,
    default: "blog", //type is  - blog, product, etc
  },
  sub_cat:[
    {
        name:{type: String},
        createAt:{type: Date, default: Date.now}
    }
  ],
  meta_data:
    {
        title:{type:String},
        description:{type:String},
        keywords:{type:String}
    }
  ,
  status:{
    type:Boolean,

  },
  createAt: { type: Date, default: Date.now },
});

const Catmodel = new mongoose.model("category", category);
module.exports = Catmodel;
