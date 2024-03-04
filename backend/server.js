import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Tasks from "./models/TaskModel.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
