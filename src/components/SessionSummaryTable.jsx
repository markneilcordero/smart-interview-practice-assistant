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
    <div className="mb-4">
      <h5 className="mb-3">📄 Session Summary</h5>
      <div className="row">
        {sessions.map((session, index) => {
          const total = session.questions.length;
          const correct = session.questions.filter((q) => q.correct).length;
          const skipped = session.questions.filter((q) => !q.answer).length;
          const incorrect = total - correct - skipped;

          const formattedDate = new Date(session.date).toLocaleString();

          return (
            <div className="col-md-6 col-lg-4 mb-3" key={session.sessionId || index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h6 className="card-title mb-1">Session {index + 1}</h6>
                  <p className="text-muted mb-3">{formattedDate}</p>

                  <div className="row text-center">
                    <div className="col">
                      <h6 className="mb-0">{total}</h6>
                      <small>Total</small>
                    </div>
                    <div className="col">
                      <h6 className="mb-0 text-success">{correct}</h6>
                      <small>Correct</small>
                    </div>
                    <div className="col">
                      <h6 className="mb-0 text-danger">{incorrect}</h6>
                      <small>Incorrect</small>
                    </div>
                    <div className="col">
                      <h6 className="mb-0 text-warning">{skipped}</h6>
                      <small>Skipped</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionSummaryTable;
