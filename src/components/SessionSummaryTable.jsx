import React, { useState } from "react";

const SessionSummaryTable = ({ sessions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!sessions || sessions.length === 0) {
    return (
      <div className="alert alert-info">
        No session data available.
      </div>
    );
  }

  const toggleAnswers = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">📄 Session Summary</h5>
      <div className="row">
        {[...sessions].reverse().map((session, index) => {
          const total = session.questions.length;
          const correct = session.questions.filter((q) => q.correct).length;
          const skipped = session.questions.filter((q) => !q.answer || q.answer.trim() === "").length;
          const incorrect = total - correct - skipped;

          const formattedDate = new Date(session.date).toLocaleString();
          const realIndex = sessions.length - 1 - index;

          return (
            <div className="col-md-6 col-lg-4 mb-3" key={session.sessionId || index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h6 className="card-title mb-1">Session {realIndex + 1}</h6>
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

                  <div className="text-end mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => toggleAnswers(index)}
                    >
                      {openIndex === index ? "Hide Answers" : "Show Answers"}
                    </button>
                  </div>

                  {openIndex === index && (
                    <ul className="list-group list-group-flush mt-3">
                      {session.questions.map((q, i) => (
                        <li key={i} className="list-group-item small">
                          <strong>Q:</strong> {q.question || `#${q.id}`}<br />
                          <strong>A:</strong> {q.answer || <em className="text-warning">Skipped</em>}<br />
                          <strong>Status:</strong>{" "}
                          {q.correct ? (
                            <span className="text-success">Correct</span>
                          ) : q.answer ? (
                            <span className="text-danger">Incorrect</span>
                          ) : (
                            <span className="text-warning">Skipped</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
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
