import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/tasks", taskRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

