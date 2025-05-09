import React, { useEffect, useState } from "react";

const QuestionFormModal = ({ initialData, onSave, onClose }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [hint, setHint] = useState("");
  const [expectedKeywords, setExpectedKeywords] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || "");
      setCategory(initialData.category || "");
      setDifficulty(initialData.difficulty || "Easy");
      setHint(initialData.hint || "");
      setExpectedKeywords((initialData.expectedKeywords || []).join(", "));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const keywordsArray = expectedKeywords
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw);

    const newQuestion = {
      ...initialData,
      question,
      category,
      difficulty,
      hint,
      expectedKeywords: keywordsArray,
    };

    onSave(newQuestion);
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? "Edit Question" : "Add New Question"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Question</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Difficulty</label>
                  <select
                    className="form-select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Hint</label>
                <input
                  type="text"
                  className="form-control"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Expected Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Comma-separated keywords"
                  value={expectedKeywords}
                  onChange={(e) => setExpectedKeywords(e.target.value)}
                />
                <small className="text-muted">Example: scope, block, reassignment</small>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {initialData ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionFormModal;
