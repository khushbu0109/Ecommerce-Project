const express = require("express");
const Catmodel = require("../models/category");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// create category in js
router.post(
  "/",

  [body("name", "Enter category name").isLength({ min: 1 })],
  async (req, res) => {
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
      return res
        .status(206)
        .json({ status: "Failed", message: "Invalid Parameters", err: errros });
    }

    try {
      const { name, cat_type, sub_cat, status, meta_data } = req.body;

      const oldCat = await Catmodel.findOne({
        name: name,
        cat_type: cat_type,
      });
      if (oldCat) {
        return res.status(201).json({
          status: "failed",
          message: "catagory already exists",
        });
      }
      let newCat = new Catmodel({
        name,
        cat_type,
        sub_cat,
        status,
        meta_data,
      });

      const data = await newCat.save();
      res.status(200).json({
        status: "success",
        message: "Category has been added",
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
router.get("/getAllCat", async (req, res) => {
  try {
    const old_cat = await Catmodel.find();
    if (!old_cat) {
      return res
        .status(201)
        .json({ status: "Failed", message: "Category not found" });
    }

    if (old_cat.length > 0) {
      return res
        .status(200)
        .json({ status: "Success", message: "Category found", data: old_cat });
    }

    res.status(200).json({
      status: "Success",
      message: "Category Not found",
      data: old_cat,
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const old_cat = await Catmodel.findById(id);
  if (!old_cat) {
    return res
      .status(201)
      .json({ status: "Failed", message: "Category not found" });
  }

  const result = await Catmodel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "Success", message: "Category has been Deleted" });
});

/* For Update */
router.put("/:id",  async (req, res) => {
  const { id } = req.params;
  const { name, cat_type, status, meta_data } = req.body;
  let updatedata = {};

  const old_cat = await Catmodel.findById(id);
  if (!old_cat) {
    return res
      .status(201)
      .json({ status: "Failed", message: "Category not found" });
  }

  if (name) {
    updatedata.name = name;
  }

  if (cat_type) {
    updatedata.cat_type = cat_type;
  }

  if (status) {
    updatedata.status = status;
  } else {
    updatedata.status = status;
  }

  if (meta_data) {
    updatedata.meta_data = meta_data;
  }

  const result = await Catmodel.findByIdAndUpdate(
    id,
    { $set: updatedata },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Category has been updated",
    data: result,
  });
});

//   add sub categoruy
router.post("/addSubCat/:cat_id", async (req, res) => {
  try {
    const { sub_cat_name } = req.body;

    let category = await Catmodel.findById(req.params.cat_id);
    if (!category) {
      return res
        .status(201)
        .json({ status: "Failed", message: "Category not found" });
    }

    if (category.sub_cat.length > 0) {
      for (let i = 0; i < category.sub_cat.length; i++) {
        const element = category.sub_cat[i];

        if (element.name === sub_cat_name) {
          return res.status(200).json({
            status: "Failed",
            message: "Sub Category Already Insertd",
          });
        } else {
          category.sub_cat.push({ name: sub_cat_name });
          break;
        }
      }
    } else {
      category.sub_cat.push({ name: sub_cat_name });
    }

    const update = await Catmodel.findByIdAndUpdate(
      category._id,
      { $set: category },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      message: "Sub Category has been added",
      data: update,
    });
  } catch (error) {
    res.status(202).json({
      status: "failed",
      message: "server internal error",
      error: error.message,
    });
  }
});

// delete sup category
router.delete("/deleteSubCat/:p_id/:sub_id", async (req, res) => {
  try {
    const { p_id, sub_id } = req.params;


    const parentcat = await Catmodel.findById(p_id);
    if (!parentcat) {
      return res
        .status(201)
        .json({ status: "Failed", message: "Parent Category not found" });
    }

    let findStatus = false;
    for (let j = 0; j < parentcat.sub_cat.length; j++) {
      const sub_element = parentcat.sub_cat[j];
      console.log(sub_element._id);
      if (sub_element._id.toString() === sub_id.toString()) {
        findStatus = true;
        parentcat.sub_cat.splice(j, 1);
        break;
      }

    }
    if (!findStatus) {
      return res
        .status(201)
        .json({ status: "Failed", message: "Sub Category not found" });
    }

    let updateCategory = await Catmodel.findByIdAndUpdate(
      p_id,
      { $set: parentcat },
      { new: true }
    );
    res
      .status(200)
      .json({
        status: "Success",
        message: "Sub category has been deleted",
        data: updateCategory,
      });
  } catch (error) {
    res.status(202).json({
      status: "failed",
      message: "server internal error",
      error: error.message,
    });
  }
});
module.exports = router;
