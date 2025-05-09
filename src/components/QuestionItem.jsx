import React from "react";

const QuestionItem = ({ question, onEdit, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{question.question}</h5>
        <p className="text-muted mb-2">
          <strong>Category:</strong> {question.category} |{" "}
          <strong>Difficulty:</strong> {question.difficulty}
        </p>
        <p className="mb-2">
          <strong>Hint:</strong> {question.hint}
        </p>
        <p className="mb-0">
          <strong>Expected Keywords:</strong>{" "}
          {question.expectedKeywords?.join(", ") || "None"}
        </p>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
          ✏️ Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;
