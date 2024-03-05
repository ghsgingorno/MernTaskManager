import Tasks from "../models/TaskModel.js";

// CreateTask

const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GetAllTasks

const GetAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Task

const GetTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    if (!task) {
      res.status(404).json(`No Task Found with the id: ${id}`);
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task

const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json(`No Task To Update with the id: ${id}`);
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json(`No Task To Delete with the id: ${id}`);
    }
    res.status(201).send("Task Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, GetAllTasks, GetTask, UpdateTask, DeleteTask };
