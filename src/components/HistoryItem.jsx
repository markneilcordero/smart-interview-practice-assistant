import React from "react";

const HistoryItem = ({ session, index }) => {
  const total = session.questions.length;
  const correct = session.questions.filter((q) => q.correct).length;
  const skipped = session.questions.filter((q) => !q.answer).length;
  const incorrect = total - correct - skipped;

  const formattedDate = new Date(session.date).toLocaleString();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-1">Session {index + 1}</h5>
        <p className="text-muted">{formattedDate}</p>

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
  );
};

export default HistoryItem;
