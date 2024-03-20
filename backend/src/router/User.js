const express = require("express");

const userModel = require("../models/user.js");
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const requireSignIn = require("../middleware/adminMid.js");
router.post("/addUser", async (req, res) => {
  try {
    const { name, email, address, phone, password } = req.body;
    if (!name) {
      return res.json({ message: "Name is Required.." });
    }
    const oldUser = await userModel.findOne({ email: email });
    if (oldUser) {
      return res.status(200).json({
        success: false,
        message: "User Already Registered..",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      address,
      phone,
    });
    const data = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User has been Created",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while Registering..",
      err: err.message,
    });
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invailed Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not Registered!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password!",
      });
    }

    const token = await JWT.sign(
      { _id: user._id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in Login",
      error: error.message,
    });
  }
});


router.get("/checkAdmin",requireSignIn,async(req,res)=>{
  if(req.user.role===1){
    res.send("Admin")
  }
  else{
    res.send("Hello")
  }
})

module.exports = router;
