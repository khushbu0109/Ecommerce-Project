const express = require("express");
const Coupon = require("../models/coupon");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const coupon = await Coupon.find().sort({ _id: -1 });
    res
      .status(200)
      .json({ status: "Success", msg: "Data found", data: coupon });
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
    const { name, desc, discount, amount, expiry_date } = req.body;

    const old_data = await Coupon.findOne({ name });
    if (old_data) {
      return res
        .status(201)
        .json({ status: "Failed", msg: "Name already exists" });
    }

    const newdata = new Coupon({
      name,
      desc,
      discount,
      amount,
      expiry_date,
      usage_limit,
individual_use,
product_id,
shippig_tags,
exclude_sale_items,
minimum_amount,
    });
    const data = await newdata.save();
    res
      .status(200)
      .json({ status: "Success", msg: "Coupon has been created.", data });
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

    const olddata = await Coupon.findById(id);

    if (!olddata) {
      return res.status(201).json({ status: "Failed", msg: "Invalid ID" });
    }

    const data = await Coupon.findByIdAndDelete(id);

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
    const { name, desc, discount, amount, expiry_date,usage_limit,
      individual_use,
      product_id,
      shippig_tags,
      exclude_sale_items,
      minimum_amount, } = req.body;

    const olddate = await Coupon.findById(req.params.id);
    if (!olddate) {
      return res.status(201).json({ status: "Failed", msg: "Invalid id" });
    }

    let newdata = {};
    if (name) {
      newdata.name = name;
    }
    if (desc) {
      newdata.desc = desc;
    }
    if (discount) {
      newdata.discount = discount;
    }
    if (amount) {
      newdata.amount = amount;
    }
    if (expiry_date) {
      newdata.expiry_date = expiry_date;
    }

    if (usage_limit) {
      newdata.usage_limit = usage_limit;
    }
    if (individual_use) {
      newdata.individual_use = individual_use;
    }
    if (product_id) {
      newdata.product_id = product_id;
    }
    if (shippig_tags) {
      newdata.shippig_tags = shippig_tags;
    }
    if (exclude_sale_items) {
      newdata.exclude_sale_items = exclude_sale_items;
    }
    if (minimum_amount) {
      newdata.minimum_amount = minimum_amount;
    }

    const data = await Coupon.findByIdAndUpdate(
      req.params.id,
      { $set: newdata },
      { new: true }
    );

    res
      .status(200)
      .json({ status: "Success", msg: "Coupon has been update", data });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});
module.exports = router;
