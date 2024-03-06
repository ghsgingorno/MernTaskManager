import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: ["http://localhost:3000"], // when you deploy, just add  your website url here to allow access from that domain
  })
);
app.use("/api/tasks", router);
dotenv.config();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Home Page");
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
