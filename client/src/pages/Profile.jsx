import { useEffect, useState } from "react";
import { fetchTasks } from "../api/taskApi";

function Profile() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
    progress: 0,
    lastUpdated: "N/A",
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const res = await fetchTasks();
    const tasks = res.data;

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    const highPriority = tasks.filter(t => t.priority === "High").length;

    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    const lastUpdatedTask = tasks
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

    setStats({
      total,
      completed,
      pending,
      highPriority,
      progress,
      lastUpdated: lastUpdatedTask
        ? new Date(lastUpdatedTask.updatedAt).toLocaleString()
        : "N/A",
    });
  };

  return (
    <div className="container mt-5 fade-in col-md-8">
      <div className="glass-card p-4 text-center">
        {/* Profile Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="rounded-circle mb-3"
          width="120"
          alt="Profile"
        />

        <h4>Siva Dhanush</h4>
        <p className="text-light mb-4">Frontend Developer</p>

        {/* Stats Row */}
        <div className="row text-center">
          <div className="col">
            <h5>{stats.total}</h5>
            <p>Total Tasks</p>
          </div>
          <div className="col">
            <h5 className="text-success">{stats.completed}</h5>
            <p>Completed</p>
          </div>
          <div className="col">
            <h5 className="text-warning">{stats.pending}</h5>
            <p>Pending</p>
          </div>
          <div className="col">
            <h5 className="text-danger">{stats.highPriority}</h5>
            <p>High Priority</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <h6>Overall Completion</h6>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${stats.progress}%` }}
            >
              {stats.progress}%
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-4 text-light">
          <p>
            <strong>Last Task Update:</strong> <br />
            {stats.lastUpdated}
          </p>
        </div>

        <button className="btn btn-primary mt-3">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
