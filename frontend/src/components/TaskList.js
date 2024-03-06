import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
// import { URL } from "../App.js";
import { toast } from "react-toastify";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // array of task objects
  const [completedTasks, setCompletedTasks] = useState([]); // array of completed task objects
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  // Get all tasks on component mount

  // Function to add a new task
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
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3001/api/tasks");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Please enter a task name", {
        position: "top-center",
      });
    }
    try {
      await axios.post(`http://localhost:3001/api/tasks`, formData);
      setFormData({ ...setFormData, name: "" });
      toast.success("Task created successfully!", {
        position: "top-center",
      });
      getTasks();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      toast.success("Task deleted Successfully", {
        position: "top-center",
      });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
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
      {isLoading && (
        <div className="--flex-center">
          <image src={loadingImg} alt="loader" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">
          No Task Found, please add a task to display here.
        </p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
