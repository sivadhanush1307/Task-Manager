function EditTask() {
    return (
      <div className="container mt-4 col-md-6">
        <h3>Edit Task</h3>
        <input className="form-control mb-2" defaultValue="Learn React" />
        <select className="form-control mb-2">
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <button className="btn btn-primary">Update Task</button>
      </div>
    );
  }
  export default EditTask;
  