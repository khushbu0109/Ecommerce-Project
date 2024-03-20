const express = require("express");
const Productmodel = require("../models/product");
const Catmodel= require ("../models/category.js")
const { body, validationResult } = require("express-validator");
const router = express.Router();

// create product in js
router.post(
  "/addProduct",

  [body("p_name", "Enter product name").isLength({ min: 1 })],
  async (req, res) => {
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
      return res
        .status(206)
        .json({ status: "Failed", message: "Invalid Parameters", err: errros });
    }

    try {
      const {
        p_name,
        slug,
        featured,
        status,
        date_created,
        date_modified,
        description,
        sku,
        price,
        regular_price,
        sale_price,
        tags,
        cat_id,
        images,
        attributes,
        variations,
        stock_status,
        Delivery_Day,
        Customer_Review,
        Discount,
        Sizes,
        Availability,
      } = req.body;

      const oldCat = await Productmodel.findOne({
        p_name: p_name,
      });
      if (oldCat) {
        return res.status(201).json({
          status: "failed",
          message: "product already exists",
        });
      }
      let newProd = new Productmodel({
        p_name,
        slug,
        featured,
        status,
        date_created,
        date_modified,
        description,
        sku,
        price,
        regular_price,
        sale_price,
        tags,
        cat_id,
        images,
        attributes,
        variations,
        stock_status,
        Delivery_Day,
        Customer_Review,
        Discount,
        Sizes,
        Availability,
      });

      const data = await newProd.save();
      res.status(200).json({
        status: "Success",
        message: "product has been added",
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
// get all product
router.get("/getProduct", async (req, res) => {
  try {
    const old_prod = await Productmodel.find();
    if (!old_prod) {
      return res
        .status(201)
        .json({ status: "Failed", message: "product not found" });
    }

    if (old_prod.length > 0) {
      return res
        .status(200)
        .json({ status: "Success", message: "product found", data: old_prod });
    }

    res.status(200).json({
      status: "Success",
      message: "product Not found",
      data: old_prod,
    });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

// delete product
/* For delete */
router.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;

  const old_prod = await Productmodel.findById(id);
  if (!old_prod) {
    return res
      .status(201)
      .json({ status: "Failed", message: "product not found" });
  }

  const result = await Productmodel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "Success", message: "product has been Deleted" });
});

/* For Update */
router.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const {
    p_name,
    slug,
    featured,
    status,
    date_created,
    date_modified,
    description,
    sku,
    price,
    regular_price,
    sale_price,
    tags,
    cat_id,
    images,
    attributes,
    variations,
    stock_status,
    Delivery_Day,
    Customer_Review,
    Discount,
    Sizes,
    Availability,
  } = req.body;
  let updatedata = {};

  const old_prod = await Productmodel.findById(id);
  if (!old_prod) {
    return res
      .status(201)
      .json({ status: "Failed", message: "product not found" });
  }

  if (p_name) {
    updatedata.p_name = p_name;
  }

  if (slug) {
    updatedata.slug = slug;
  }

  if (date_created) {
    updatedata.date_created = date_created;
  }

  if (date_modified) {
    updatedata.date_modified = date_modified;
  }

  if (description) {
    updatedata.description = description;
  }

  if (featured) {
    updatedata.featured = featured;
  }

  if (sku) {
    updatedata.sku = sku;
  }

  if (price) {
    updatedata.price = price;
  }

  if (regular_price) {
    updatedata.regular_price = regular_price;
  }

  if (sale_price) {
    updatedata.sale_price = sale_price;
  }
  if (tags) {
    updatedata.tags = tags;
  }
  if (cat_id) {
    updatedata.cat_id = cat_id;
  }
  if (images) {
    updatedata.images = images;
  }
  if (attributes) {
    updatedata.attributes = attributes;
  }
  if (variations) {
    updatedata.variations = variations;
  }
  if (stock_status) {
    updatedata.stock_status = stock_status;
  }
  if (Delivery_Day) {
    updatedata.stock_status = stock_status;
  }
  if (Customer_Review) {
    updatedata.stock_status = stock_status;
  }
  if (Discount) {
    updatedata.stock_status = stock_status;
  }
  if (Sizes) {
    updatedata.stock_status = stock_status;
  }
  if (Availability) {
    updatedata.stock_status = stock_status;
  }
  if (status) {
    updatedata.status = status;
  } else {
    updatedata.status = status;
  }
  const result = await Productmodel.findByIdAndUpdate(
    id,
    { $set: updatedata },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "product has been updated",
    data: result,
  });
});



/* getting product by category name */

router.get("/byCat/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;

    // Find the category by name
    const category = await Catmodel.findOne({ name: categoryName });

    if (!category) {
      return res
        .status(404)
        .json({
          status: "Error",
          message: "Category not found",
        });
    }

    const categoryId = category._id; // Get the category ID from the found category
    const products = await Productmodel.find({ cat_id: categoryId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({
          status: "Error",
          message: "No products found for this category",
        });
    }

    res.json({ status: "Success", data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});



// delete sup category

module.exports = router;
