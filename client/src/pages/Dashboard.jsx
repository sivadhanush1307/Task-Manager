import { useEffect, useState } from "react";
import { fetchTasks } from "../api/taskApi";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
    progress: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const res = await fetchTasks();
    const tasks = res.data;

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    const highPriority = tasks.filter(t => t.priority === "High").length;

    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    setStats({
      total,
      completed,
      pending,
      highPriority,
      progress,
    });
  };

  return (
    <div className="container mt-5 fade-in">
      <h2 className="text-white mb-4"> Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="glass-card p-4 text-center hover-scale">
            <h6>Total Tasks</h6>
            <h1>{stats.total}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center hover-scale">
            <h6>Completed</h6>
            <h1 className="text-success">{stats.completed}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center hover-scale">
            <h6>Pending</h6>
            <h1 className="text-warning">{stats.pending}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center hover-scale">
            <h6>High Priority</h6>
            <h1 className="text-danger">{stats.highPriority}</h1>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 mt-4">
        <h5>Task Progress</h5>
        <div className="progress mt-2">
          <div
            className="progress-bar bg-success"
            style={{ width: `${stats.progress}%` }}
          >
            {stats.progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
