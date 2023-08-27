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
  const existingAdminByUsername = await admin.findOne({ username });
  const existingAdminByEmail = await admin.findOne({ email });

  const existingAdmin = existingAdminByUsername || existingAdminByEmail;

  if (existingAdmin) {
    return res.status(403).json({ message: "Admin already exists" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const newAdmin = new admin({ username, email, password });
  await newAdmin.save();
  const token = jwt.sign({ username, role: "admin" }, secretKey, {
    expiresIn: "1h",
  });
  res.json({ message: "Admin created successfully", token });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingAdmin = await admin.findOne({ username, password });

  if (existingAdmin) {
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "invalid username or password !!" });
  }
});

router.post("/addcourse", authenticateJwt, async (req, res) => {
  const newCourse = new course(req.body);
  await newCourse.save();
  res.json({ message: "Course created successfully", courseId: newCourse.id });
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  try {
    const Course = await course.findById(req.params.courseId);

    if (!Course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ Course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/course/:courseId", authenticateJwt, async (req, res) => {
  const updatedCourse = await course.findByIdAndUpdate(
    req.params.courseId,
    req.body
  );

  if (updatedCourse) {
    res.json({ message: "Course updated successfully", updatedCourse });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

module.exports = router;