const express = require('express');
const Order=require("../models/order")
const router=express.Router();
const { body, validationResult } = require("express-validator");

router.get("/getOrder",async(req,res)=>{
    try{
        const old_order=await Order.find()
        if(!old_order){
            return res.status(201).json({
                status:"Failed",
                message:"Order not Found"
            })
        }
        if(old_order){
            return res.status(200).json({
                status:"Success",
                message:"Order is Found",
                data:old_order
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Category Not found",
            data: old_cat,
          });
    }
    catch(error){
        res.status(202).json({
            status:"Failed",
            message:"Server Internal Error",
            err:error.message
        })

    }
})
router.post("/postOrder",[body("p_name", "Enter order name").isLength({ min: 1 })],
async (req, res) => {
  const errros = validationResult(req);
  if (!errros.isEmpty()) {
    return res
      .status(206)
      .json({ status: "Failed", message: "Invalid Parameters", err: errros });
  }
  try{
    const{
        p_name,
        status,
        total,
        createdAt,
        quantity,
        price
    }=req.body;
    const oldOrder=await Order.findOne({
        p_name:p_name,
    });
    if(oldOrder){
        return res.status(201).json({
            status:"failed",
            message:"Order already exists"
        });
    }
    let newOrder=new Order({
        p_name,
        status,
        total,
        createdAt,
        quantity,
        price
    });
    const data = await newOrder.save();
    res.status(200).json({
      status: "Success",
      message: "Order has been added",
      data: data,
    });
  } catch (error) {
    res.status(202).json({
      status: "failed",
      message: "server internal error",
      error: error,
    });
}})

router.delete("/deleteOrder/:id",async(req,res)=>{
    const{id}=req.params;
    const old_order=await Order.findById(id);
    if(!old_order){
        return res.status(201).json({
            status:"Failed",
            message:"product not found"
        });
    }
    const result =await Order.findByIdAndDelete(id);
    res.status(200).json({status:"Success",message:"Order has been Deleted"})
});

router.put("/updateOrder/:id",async(req,res)=>{
    const{id}=req.params;
    const{
        p_name,
        status,
        total,
        createdAt,
        quantity,
        price

    }=req.body;
    let updatedata={};
    const old_order=await Order.findById(id);
    if(!old_order){
        return res.status(201).json({
            status:"Failed",
            message:"Order not Found"
        })
    }
    if(p_name){
        updatedata.p_name=p_name;
    }
    if(status){
        updatedata.status=status;
    }
    else{
        updatedata.status=status
    }
    if(total){
        updatedata.total=total;
    }
    if(createdAt){
        updatedata.createdAt=createdAt;
    }
    if(quantity){
        updatedata.quantity=quantity;
    }
    if(price){
        updatedata.price=price;
    }
    const result = await Order.findByIdAndUpdate(
        id,
        { $set: updatedata },
        { new: true }
      );
      res.status(200).json({
        status: "Success",
        message: "order has been updated",
        data: result,
      });
})
module.exports=router;
