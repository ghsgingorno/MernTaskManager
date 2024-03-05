import express from "express";
import {
  createTask,
  GetAllTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
} from "../controller/TaskController.js";

const router = express.Router();

router.route("/").get(GetAllTasks).post(createTask);
router.route("/:id").get(GetTask).patch(UpdateTask).delete(DeleteTask);

// router.post("/", createTask);
// router.get("/", GetAllTasks);
// router.get("/:id", GetTask);
// router.patch("/:id", UpdateTask);
// router.delete("/:id", DeleteTask);

export default router;
