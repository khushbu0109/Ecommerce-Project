const express = require("express");
const Variation = require("../models/variations");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const variation = await Variation.find().sort({ _id: -1 });
    if (variation) {
      return res
        .status(200)
        .json({ status: "Success", msg: "Found", data: variation });
    }

    res.status(201).json({ status: "Failed", msg: "Found", data: variation });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

router.get("/:attr_id", async (req, res) => {
  try {
    const { attr_id } = req.params;

    const variation = await Variation.find({ attributes: attr_id });
    if (!variation) {
      return res
        .status(201)
        .json({ status: "Failed", msg: "Variation not found" });
    }
    res
      .status(200)
      .json({ status: "Success", msg: "Variation found", data: variation });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      attribute,
      description,
      sku,
      price,
      regular_price,
      sale_price,
      status,
      image,
    } = req.body;

    const variation = new Variation({
      attribute: attribute,
      description: description,
      sku: sku,
      price: price,
      regular_price: regular_price,
      sale_price: sale_price,
      status: status,
      image: image,
    });

    const response = await variation.save();
    if (!response) {
      return res.status(201).json({ status: "Failed", msg: "Invalid details" });
    }

    res.status(200).json({
      status: "Success",
      msg: "Variation has been created",
      data: variation,
    });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const olddata = await Variation.findById(id);

    if (!olddata) {
      return res.status(201).json({ status: "Failed", msg: "Invalid ID" });
    }

    const data = await Variation.findByIdAndDelete(id);

    res.status(200).json({ status: "Success", msg: "data has been delete" });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    const { attribute,
      description,
      sku,
      price,
      regular_price,
      sale_price,
      status,
      image, } = req.body;

    const olddate = await Variation.findById(req.params.id);
    if (!olddate) {
      return res.status(201).json({ status: "Failed", msg: "Invalid id" });
    }

    let newdata = {};
    if (attribute) {
      newdata.attribute = attribute;
    }
    if (description) {
      newdata.description = description;
    }
    if (sku) {
      newdata.sku = sku;
    }
    if (price) {
      newdata.price = price;
    }
    if (regular_price) {
      newdata.regular_price = regular_price;
    }
    if (sale_price) {
      newdata.sale_price = sale_price;
    }
    if (status) {
      newdata.status = status;
    }
    else{
      newdata.status = status;
    }
    if (image) {
      newdata.image = image;
    }

    const data = await Variation.findByIdAndUpdate(
      req.params.id,
      { $set: newdata },
      { new: true }
    );

    res
      .status(200)
      .json({ status: "Success", message: "Variation has been updated", data });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

module.exports = router;
