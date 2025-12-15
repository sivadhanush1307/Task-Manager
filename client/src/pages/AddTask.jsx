import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api/taskApi";

function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
    category: "General",
    progress: 0,
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(task);
    navigate("/tasks");
  };

  return (
    <div className="container mt-5 fade-in col-md-8">
      <div className="glass-card p-4">
        <h3 className="mb-3"> Create New Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />

          <div className="row">
            <div className="col">
              <select
                className="form-select"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col">
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-success mt-3 w-100">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
