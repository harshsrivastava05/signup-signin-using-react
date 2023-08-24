const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const secretKey = "superS3cr3t1";

// define mongoose schema
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

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
    
        req.username = decoded.username; // Extract the username from the token
        next();
      });
  } else {
    res.sendStatus(401);
  }
};

//connect to mongodb
mongoose.connect(
  "mongodb+srv://harshsrivastava07:manya1234harsh@cluster0.bsbrmty.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.post("/admin/signup", async (req, res) => {
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
  }); // Pass the correct object here
  res.json({ message: "Admin created successfully", token });
});

app.post("/admin/signin", async (req, res) => {
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

app.get("/admin/me", authenticateJwt,async (req, res) => {

    const username = req.username; 
    res.json({ username : username });
    
});

app.post("/admin/addcourse", authenticateJwt, async (req, res) => {
  const newCourse = new course(req.body);
  await newCourse.save();
  res.json({ message: "Course created successfully", courseId: newCourse.id });
});

app.get("/admin/course/:courseId", authenticateJwt, async (req, res) => {
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

app.put("/admin/course/:courseId", authenticateJwt, async (req, res) => {
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

app.get("/admin/course", authenticateJwt, async (req, res) => {
  const allcourses = await course.find({});
  res.json({ allcourses });
});

app.post("/user/signup", async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  const existinguserByUsername = await admin.findOne({ username });
  const existinguserByEmail = await admin.findOne({ email });

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
  }); // Pass the correct object here
  res.json({ message: "User created successfully", token });
});


app.post("/user/courses/:courseid", authenticateJwt, async(req,res)=>{
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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  
});
