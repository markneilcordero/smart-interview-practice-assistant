import React, { useState } from "react";

const QuestionCard = ({ question, onAnswer, showHint, onShowHint }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onAnswer(answer);
    setAnswer("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{question.question}</h5>
        <p className="text-muted mb-2">
          <strong>Category:</strong> {question.category} |{" "}
          <strong>Difficulty:</strong> {question.difficulty}
        </p>

        {showHint && (
          <div className="alert alert-info p-2" role="alert">
            💡 <strong>Hint:</strong> {question.hint}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Type your answer here..."
              rows="4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onShowHint}
            >
              Show Hint
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Answer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionCard;
