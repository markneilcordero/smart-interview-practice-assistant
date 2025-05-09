import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import SessionStats from "./SessionStats";
import useLocalStorage from "../hooks/useLocalStorage";

// Sample fallback question set
const defaultQuestions = [/* ...your questions here (unchanged) */];

const PracticePage = () => {
  const [questions] = useLocalStorage("interview_questions", defaultQuestions);
  const [sessions, setSessions] = useLocalStorage("interview_sessions", []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

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

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
    }
  };

  const handleShowHint = () => setShowHint(true);

  const handleFinishSession = () => {
    const session = {
      sessionId: Date.now(),
      date: new Date().toISOString(),
      questions: answered.map((a) => {
        const q = questions.find((q) => q.id === a.id);
        return {
          ...a,
          category: q.category,
          difficulty: q.difficulty,
        };
      }),
    };

    setSessions([...sessions, session]);
    setFinished(true);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container my-5">
      <h2 className="mb-4">🧠 Interview Practice</h2>

      {!finished && currentQuestion ? (
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

          {/* Show Finish button at the end */}
          {currentIndex === questions.length - 1 && answered.length === questions.length && (
            <button className="btn btn-success mt-3" onClick={handleFinishSession}>
              ✅ Finish Session
            </button>
          )}
        </>
      ) : finished ? (
        <div className="alert alert-success">
          🎉 Session saved! You can view it in your <strong>History</strong> or check your <strong>Dashboard</strong>.
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default PracticePage;
