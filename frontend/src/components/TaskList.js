import axios from "axios";
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";

const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Please enter a task name", {
        position: "top-center",
      });
    }
    try {
      await axios.post("http://localhost:3001/api/tasks", formData);
      setFormData({ ...setFormData, name: "" });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: </b> 0
        </p>
        <p>
          <b>Completed Tasks: </b> 0
        </p>
      </div>
      <hr />
      <Task />
    </div>
  );
};

export default TaskList;
