import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import SessionStats from "./SessionStats";
import useLocalStorage from "../hooks/useLocalStorage";

// Sample question dataset as fallback
const defaultQuestions = [
  {
    id: 1,
    question: "What is the difference between var, let, and const in JavaScript?",
    category: "Frontend",
    difficulty: "Medium",
    hint: "Think about scope and reassignment.",
    expectedKeywords: ["scope", "block", "reassignment"],
  },
  {
    id: 2,
    question: "Explain RESTful API principles.",
    category: "Backend",
    difficulty: "Easy",
    hint: "Focus on HTTP methods and statelessness.",
    expectedKeywords: ["GET", "POST", "PUT", "DELETE", "stateless"],
  },
];

const PracticePage = () => {
  const [questions] = useLocalStorage("interview_questions", defaultQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (answer) => {
    const current = questions[currentIndex];
    const isCorrect = current.expectedKeywords.some((keyword) =>
      answer.toLowerCase().includes(keyword.toLowerCase())
    );

    setAnswered((prev) => [
      ...prev,
      {
        id: current.id,
        answer,
        correct: isCorrect,
      },
    ]);

    // Move to next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
    }
  };

  const handleShowHint = () => setShowHint(true);

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container my-5">
      <h2 className="mb-4">🧠 Interview Practice</h2>

      {currentQuestion ? (
        <>
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            showHint={showHint}
            onShowHint={handleShowHint}
          />

          <SessionStats
            total={questions.length}
            answered={answered.length}
            correct={answered.filter((q) => q.correct).length}
            skipped={answered.filter((q) => !q.answer).length}
          />
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default PracticePage;
