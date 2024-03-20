const express = require("express");
const Attribute = require("../models/attribute");
const router = express.Router();

router.get("/getAtt", async (req, res) => {
  try {
    const attr = await Attribute.find().sort({ _id: -1 });
    res
      .status(200)
      .json({ status: "Success", message: "Data found", data: attr });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

router.post("/addAttribute", async (req, res) => {
  try {
    const { name, term } = req.body;

    const olddata = await Attribute.findOne({ name: name });
    if (olddata) {
      return res
        .status(200)
        .json({ status: "Failed", msg: "Name is already exist" });
    }

    const attr = new Attribute({ name, term });
    const response = await attr.save();
    res.status(200).json({
      status: "success",
      message: "Attribute has been created",
      data: response,
    });
  } catch (e) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: e.message,
    });
  }
});

router.delete("/deleteAttribute/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const attr = await Attribute.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: "Success", msg: "Attribute has been deleted" });
  } catch (e) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: e.message,
    });
  }
});

// edit attribute section
router.put("/editAttribute/:id", async (req, res) => {

    const{id}=req.params;
    const{
        name

    }=req.body;
    let updatedata={};
    const old_order=await Attribute.findById(id);
    if(!old_order){
        return res.status(201).json({
            status:"Failed",
            message:"Attribute not Found"
        })
    }
    if(name){
        updatedata.name=name;
    }

    const result = await Attribute.findByIdAndUpdate(
        id,
        { $set: updatedata },
        { new: true }
      );
      res.status(200).json({
        status: "Success",
        message: "Attribute has been updated",
        data: result,
      });

});
module.exports = router;
