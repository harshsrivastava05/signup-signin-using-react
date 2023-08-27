const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const adminRouter = require("./routes/admin"); 
const userRouter = require("./routes/user"); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
    "mongodb+srv://harshsrivastava07:manya1234harsh@cluster0.bsbrmty.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
  );

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    
  });