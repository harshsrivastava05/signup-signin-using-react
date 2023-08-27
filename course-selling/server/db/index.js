const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  });
  
  const adminschema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
  const courseschema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
  });
  
  // define mongoose model
  const user = mongoose.model("user", userschema);
  const admin = mongoose.model("admin", adminschema);
  const course = mongoose.model("course", courseschema);

  module.exports = {
    user,
    admin,
    course
  }