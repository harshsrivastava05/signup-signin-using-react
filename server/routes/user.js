const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { user, admin, course } = require("../db");
const { secretKey } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const username = req.username;
    res.json({ username: username });
  });
  
  router.get("/course", authenticateJwt, async (req, res) => {
    const allcourses = await course.find({});
    res.json({ allcourses });
  });

router.post("/signup", async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    const existinguserByUsername = await user.findOne({ username });
    const existinguserByEmail = await user.findOne({ email });
  
    const existinguser = existinguserByUsername || existinguserByEmail;
  
    if (existinguser) {
      return res.status(403).json({ message: "User already exists" });
    }
  
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    const newUser = new user({ username, email, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    }); 
    res.json({ message: "User created successfully", token });
  });
  
  
  router.post("/courses/:courseId", authenticateJwt, async(req,res)=>{
    const courses = await course.findById(req.params.courseId);
    if(courses){
      const User = await user.findOne({username: req.user.username});
      if(User){
        User.purchasedCourses.push(courses);
        await User.save();
        res.json({message:"course bought succesfully"});
      } else {
        res.status(403).json({message:"user not found"})
      }
    } else {
      res.status(403).json({message:"course not found"})
    }
  });

module.exports = router;
