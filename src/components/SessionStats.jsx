import React from "react";

const SessionStats = ({ total, answered, correct, skipped }) => {
  return (
    <div className="card bg-light mt-4">
      <div className="card-body">
        <h6 className="card-title mb-3">📊 Session Stats</h6>
        <div className="row text-center">
          <div className="col">
            <h5>{total}</h5>
            <p className="mb-0 text-muted">Total</p>
          </div>
          <div className="col">
            <h5>{answered}</h5>
            <p className="mb-0 text-primary">Answered</p>
          </div>
          <div className="col">
            <h5>{correct}</h5>
            <p className="mb-0 text-success">Correct</p>
          </div>
          <div className="col">
            <h5>{skipped}</h5>
            <p className="mb-0 text-warning">Skipped</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;
