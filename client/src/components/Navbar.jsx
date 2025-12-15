import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        <h3>TaskFlow</h3> 
      </Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link" to="/">Dashboard</Link>
        <Link className="nav-link" to="/tasks">Tasks</Link>
        <Link className="nav-link" to="/add-task">Add Task</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;

