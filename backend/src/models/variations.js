const mongoose = require("mongoose");
const variation = mongoose.Schema({
    attribute:{
        type:String,
        require:true
    },
    date_created:{type:Date, default:Date.now},
    description:{type:String},
    sku:{type:String},
    price:{type:String},
    regular_price:{type:String},
    sale_price:{type:String},
    status:{type:Boolean}, // publish
    /* image:[
        {
            id: { type: String },
            date_created: { type: Date, default: Date.now },
            src: { type: String },
            name: { type: String },
            alt: { type: String },
          },
    ], */

    image:{
        type:String,
        default:"dummy"
    }

});
const Variation = mongoose.model("variation", variation);
module.exports = Variation;