const mongoose = require("mongoose");

const db = "mongodb://127.0.0.1:27017/e-commerce";

mongoose.connect(db, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () =>{
    console.log("Connection is done");
}).catch((e)=>{
    console.log(`Connection is not connect to database ${e}`);
})