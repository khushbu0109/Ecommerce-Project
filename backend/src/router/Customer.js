const express = require("express");
const Custmodel = require("../models/customer");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// create category in js
router.post(
  "/createCustomer",

  [body("f_name", "Enter customer name").isLength({ min: 1 })],
  async (req, res) => {
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
      return res
        .status(206)
        .json({ status: "Failed", message: "Invalid Parameters", err: errros });
    }

    try {
      const { f_name,
        l_name,
        image,
        address,
        city,
        email,
        phone,
        country,
        orders,
        password,status } = req.body;

      const oldCust = await Custmodel.findOne({
        f_name: f_name,
        l_name: l_name,
      });
      if (oldCust) {
        return res.status(201).json({
          status: "failed",
          message: "customer already exists",
        });
      }
      let newCat = new Custmodel({

     f_name,
        l_name,
        image,
        address,
        city,
        email,
        phone,
        country,
        orders,
        password,
        status
      });

      const data = await newCat.save();
      res.status(200).json({
        status: "Success",
        message: "Customer has been added",
        data: data,
      });
    } catch (error) {
      res.status(202).json({
        status: "failed",
        message: "server internal error",
        error: error,
      });
    }
  }
);
// get all categoru
router.get("/getCustomer", async (req, res) => {
  try {
    const oldCust = await Custmodel.find();
    if (!oldCust) {
      return res
        .status(201)
        .json({ status: "Failed", message: "Customer not found" });
    }

    if (oldCust.length > 0) {
      return res
        .status(200)
        .json({ status: "Success", message: "Customer found", data: oldCust });
    }

    res.status(200).json({
      status: "Success",
      message: "Customer Not found",
      data: oldCust,
    });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

// delete category
/* For delete */
router.delete("/deleteCustomer/:id", async (req, res) => {
  const { id } = req.params;

  const oldCust = await Custmodel.findById(id);
  if (!oldCust) {
    return res
      .status(201)
      .json({ status: "Failed", message: "Customer not found" });
  }

  const result = await Custmodel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "Success", message: "Customer has been Deleted" });
});

/* For Update */
router.put("/update/:id",  async (req, res) => {
  const { id } = req.params;
  const {  f_name,
    l_name,
    image,
    address,
    city,
    email,
    phone,
    country,
    orders,
    password ,
  status} = req.body;
  let updatedata = {};

  const oldCust = await Custmodel.findById(id);
  if (!oldCust) {
    return res
      .status(201)
      .json({ status: "Failed", message: "Customer not found" });
  }

  if (f_name) {
    updatedata.f_name = f_name;
  }

  if (l_name) {
    updatedata.l_name = l_name;
  }

  if (image) {
    updatedata.image = image;
  }

  if (address) {
    updatedata.address = address;
  }

  if (city) {
    updatedata.city = city;
  }

  if (email) {
    updatedata.email = email;
  }
  if (phone) {
    updatedata.phone = phone;
  }
  if (country) {
    updatedata.country = country;
  }
  if (orders) {
    updatedata.orders = orders;
  }
  if (password) {
    updatedata.password = password;
  }
  if (status) {
    updatedata.status = status;
  }
  else  {
    updatedata.status = status;
  }

  const result = await Custmodel.findByIdAndUpdate(
    id,
    { $set: updatedata },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Customer has been updated",
    data: result,
  });
});



module.exports = router;
