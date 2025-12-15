import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api/taskApi";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // COMPLETE
  const handleComplete = async (task) => {
    await updateTask(task._id, {
      ...task,
      status: "Completed",
      progress: 100,
    });
    loadTasks();
  };

  // OPEN EDIT MODAL
  const openEditModal = (task) => {
    setEditTask({ ...task });
    setShowModal(true);
  };

  // EDIT CHANGE
  const handleEditChange = (e) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE EDIT
  const handleEditSave = async () => {
    await updateTask(editTask._id, editTask);
    setShowModal(false);
    loadTasks();
  };

  // FILTER
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return task.status === "Pending";
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "High") return task.priority === "High";
    return true;
  });

  return (
    <div className="container mt-5 fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white"> My Tasks</h2>

        <select
          className="form-select w-25"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="High">High Priority</option>
        </select>
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-white">No tasks found</p>
      )}

      {filteredTasks.map((task) => (
        <div key={task._id} className="glass-card p-4 mb-3 hover-scale">
          <div className="row align-items-center">
            {/* Title */}
            <div className="col-md-4">
              <h5>{task.title}</h5>
              <small className="text-light">
                {task.category || "General"} • Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No date"}
              </small>
            </div>

            {/* Priority */}
            <div className="col-md-2 text-center">
              <span
                className={`badge px-3 py-2 bg-${
                  task.priority === "High"
                    ? "danger"
                    : task.priority === "Medium"
                    ? "warning"
                    : "success"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* Status */}
            <div className="col-md-2 text-center">
              <span
                className={`badge px-3 py-2 bg-${
                  task.status === "Completed" ? "success" : "warning"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Actions */}
            <div className="col-md-4 text-end">
              {task.status !== "Completed" && (
                <button
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={() => handleComplete(task)}
                >
                  Complete
                </button>
              )}

              <button
                className="btn btn-outline-warning btn-sm me-2"
                onClick={() => openEditModal(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 🔥 EDIT MODAL */}
      {showModal && editTask && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Task</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="title"
                  value={editTask.title}
                  onChange={handleEditChange}
                />

                <textarea
                  className="form-control mb-2"
                  name="description"
                  value={editTask.description || ""}
                  onChange={handleEditChange}
                />

                <select
                  className="form-select mb-2"
                  name="priority"
                  value={editTask.priority}
                  onChange={handleEditChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <select
                  className="form-select"
                  name="status"
                  value={editTask.status}
                  onChange={handleEditChange}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleEditSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
