function TaskDetails() {
    return (
      <div className="container mt-5 fade-in col-md-8">
        <div className="glass-card p-4">
          <h2>🎯 Build React UI</h2>
  
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
            alt="task"
            width="120"
            className="my-3"
          />
  
          <p>Create modern UI using Bootstrap & React.</p>
  
          <span className="badge bg-danger mb-2">High Priority</span>
  
          <div className="progress mt-3">
            <div className="progress-bar bg-warning" style={{ width: "45%" }}>
              45% Completed
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default TaskDetails;
  