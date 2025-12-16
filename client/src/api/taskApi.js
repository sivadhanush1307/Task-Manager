import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-ibgo.onrender.com/api",
});

export const fetchTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const getTaskById = (id) => API.get(`/tasks/${id}`);
