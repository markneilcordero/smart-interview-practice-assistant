import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionFormModal from "./QuestionFormModal";
import useLocalStorage from "../hooks/useLocalStorage";

const QuestionManagerPage = () => {
  const [questions, setQuestions] = useLocalStorage("interview_questions", []);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
  const handleClear = () => {
    setQuestions([]);
  };

  window.addEventListener("localStorageCleared", handleClear);
  return () => window.removeEventListener("localStorageCleared", handleClear);
}, []);

  const handleAdd = (newQuestion) => {
    const updated = [...questions, { ...newQuestion, id: Date.now() }];
    setQuestions(updated);
    setShowForm(false);
  };

  const handleEdit = (updatedQuestion) => {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
    setEditingQuestion(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  };

  const openEditForm = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛠️ Question Manager</h2>

      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          setEditingQuestion(null);
          setShowForm(true);
        }}
      >
        ➕ Add New Question
      </button>

      {questions.length === 0 ? (
        <div className="alert alert-warning">No questions found.</div>
      ) : (
        <div className="row">
          {questions.map((q) => (
            <div className="col-md-6 mb-3" key={q.id}>
              <QuestionItem
                question={q}
                onEdit={() => openEditForm(q)}
                onDelete={() => handleDelete(q.id)}
              />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <QuestionFormModal
          initialData={editingQuestion}
          onSave={editingQuestion ? handleEdit : handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default QuestionManagerPage;
