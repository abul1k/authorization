const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./authRouter");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:5555098440@cluster0.umqgwg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
