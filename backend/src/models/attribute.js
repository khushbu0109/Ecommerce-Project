const mongoose = require("mongoose");
const attributeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    term:[
        {
            name:{type:String, required:true},
            description:{type:String}
        }
    ],
    date_created:{
        type:Date,
        default:Date.now
    }
});
const Attribute = mongoose.model("attribute", attributeSchema);
module.exports = Attribute;