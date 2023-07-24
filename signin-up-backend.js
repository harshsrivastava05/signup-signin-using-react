const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminauth = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(401).json({ message: "Admin authentication failed" });
  }
};

const userauth = (req, res, next) => {
  const { username, password } = req.headers; 
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

app.post("/admin/signin", adminauth, (req, res) => { 
  res.json({ message: "logged in successfully" });
});




app.post("/admin/signup", (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  const existingadmin = ADMINS.find(
    (a) =>
      a.username === username && a.email === email && a.password === password
  );

  if (password === confirmpassword) {
    if (existingadmin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      ADMINS.push({ username, email, password });
      res.json({ message: "Admin created successfully" });
    }
  } else {
    res.status(400).json({ message: "Password does not match" });
  }
});



app.post("/admin/courses/:courseid", adminauth, (req, res) => {
  const courseid = parseInt(req.params.courseid);
  const course = COURSES.find((c) => c.id === courseid);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});

app.get("/admin/courses", adminauth, (req, res) => {
  res.json({ courses: COURSES });
});

app.post("/users/signup", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedcourse: [],
  };
  USERS.push(user);
  res.json({ message: "usser created successfully" });
});

app.post("/users/login", userauth, (req, res) => {
  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", userauth, (req, res) => {
  const filteredCourses = COURSES.filter((c) => c.published);
  res.json({ courses: filteredCourses });
});

app.post("/users/courses/:courseid", userauth, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedcourses", userauth, (req, res) => {
  var purchasedCourseIds = req.user.purchasedCourses;
  [1, 4];
  var purchasedCourses = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourses.push(COURSES[i]);
    }
  }

  res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
