import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRouter from "./routes/taskRouter.js";

dotenv.config();

const app = express();

/* =======================
   CORS CONFIGURATION
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",               // Vite local
      "https://task-manager-frontend.onrender.com" // Render frontend
      
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/tasks", taskRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
