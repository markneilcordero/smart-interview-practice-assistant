import React from "react";

const SessionSummaryTable = ({ sessions }) => {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="alert alert-info">
        No session data available.
      </div>
    );
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">📄 Session Summary</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Correct</th>
              <th>Incorrect</th>
              <th>Skipped</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => {
              const total = session.questions.length;
              const correct = session.questions.filter((q) => q.correct).length;
              const skipped = session.questions.filter((q) => !q.answer).length;
              const incorrect = total - correct - skipped;

              const formattedDate = new Date(session.date).toLocaleString();

              return (
                <tr key={session.sessionId || index}>
                  <td>{index + 1}</td>
                  <td>{formattedDate}</td>
                  <td>{total}</td>
                  <td className="text-success">{correct}</td>
                  <td className="text-danger">{incorrect}</td>
                  <td className="text-warning">{skipped}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionSummaryTable;
