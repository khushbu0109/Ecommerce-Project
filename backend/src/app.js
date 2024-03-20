const express = require("express");
const cors = require("cors");
require("../src/db/db");

const path = require("path");
const app = express();
const expressFilleupload = require("express-fileupload")
const port = process.env.PORT || 4000;
var fs = require("fs");


app.use(cors());
/* app.use(compression()); */
app.use(express.json());
app.use(
  expressFilleupload({
    useTempFiles:true,
    tempFileDir:"static/temp",
    limits:{fileSize:10*1024*1024},
  })
)
app.use("/media", express.static("static"));
app.use(express.static(path.join(__dirname, "static")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    console.log(req.body);
    res.send("Hii");
  } catch (error) {
    console.log(error);
  }
});


// route define here
app.use("/api/media" , require ("./router/Media"))
app.use("/api/product",require("./router/Product"))
app.use("/api/category" , require ("./router/Category"))
app.use("/api/attribute" , require ("./router/Attribute"))
app.use('/api/coupon', require("./router/Coupon"))
app.use('/api/variation', require("./router/Variation"))

/* app.use('/api/user', require("./router/User")) */
app.use('/api/order',require("./router/Order"))
app.use('/api/customer',require("./router/Customer"))

app.listen(port, () => {
    console.log(`Server has been started on , ${port}`);
  });
