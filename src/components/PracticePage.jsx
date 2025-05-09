import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import SessionStats from "./SessionStats";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionHistory from "../hooks/useSessionHistory";

// Sample fallback question set
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
  {
    id: 3,
    question: "Can you tell us a little about yourself and your background in development?",
    category: "General",
    difficulty: "Easy",
    hint: "Focus on your strengths and experience.",
    expectedKeywords: ["Full Stack", "Laravel", "React", "Vue", "RESTful APIs"],
  },
  {
    id: 4,
    question: "What kind of projects do you usually work on?",
    category: "Project Experience",
    difficulty: "Easy",
    hint: "Mention common applications you build.",
    expectedKeywords: ["dashboards", "admin panels", "CMS", "inventory", "architecture"],
  },
  {
    id: 5,
    question: "How do you approach building RESTful APIs with Laravel?",
    category: "Backend",
    difficulty: "Medium",
    hint: "Mention routing, validation, and conventions.",
    expectedKeywords: ["routes", "validation", "resource controller", "authorization"],
  },
  {
    id: 6,
    question: "What is your experience with frontend technologies?",
    category: "Frontend",
    difficulty: "Medium",
    hint: "Highlight frameworks and UI skills.",
    expectedKeywords: ["React", "Vue", "HTML", "CSS", "Bootstrap"],
  },
  {
    id: 7,
    question: "How do you handle backend-frontend communication in your projects?",
    category: "Full Stack",
    difficulty: "Medium",
    hint: "Talk about APIs and authentication.",
    expectedKeywords: ["AJAX", "Axios", "JWT", "Sanctum", "CORS"],
  },
  {
    id: 8,
    question: "What types of architecture are you comfortable working with?",
    category: "Architecture",
    difficulty: "Medium",
    hint: "Explain monolithic vs headless vs decoupled.",
    expectedKeywords: ["Monolithic", "Headless", "Decoupled", "Laravel", "React"],
  },
  {
    id: 9,
    question: "How do you ensure code quality and maintainability in your projects?",
    category: "Best Practices",
    difficulty: "Medium",
    hint: "Think DRY, SOLID, testing.",
    expectedKeywords: ["DRY", "SOLID", "modular", "testing", "documentation"],
  },
  {
    id: 10,
    question: "What tools or libraries do you frequently use to enhance your workflow?",
    category: "Tools",
    difficulty: "Easy",
    hint: "Mention dev tools, libraries, and version control.",
    expectedKeywords: ["Laravel", "React", "Vue", "Bootstrap", "Git"],
  },
  {
    id: 11,
    question: "How do you stay updated with new technologies and best practices?",
    category: "Personal Growth",
    difficulty: "Easy",
    hint: "Mention learning habits and sources.",
    expectedKeywords: ["blogs", "courses", "side projects", "documentation"],
  },
  {
    id: 12,
    question: "Why should a company hire you for their development projects?",
    category: "General",
    difficulty: "Medium",
    hint: "Talk about your value, not just skills.",
    expectedKeywords: ["problem-solving", "scalable", "clean code", "user experience"],
  },
  {
    id: 13,
    question: "What is your edge over other Full Stack Developer candidates?",
    category: "General",
    difficulty: "Medium",
    hint: "Highlight your unique strengths in architecture, API development, and frontend skills.",
    expectedKeywords: [
      "Monolithic",
      "Headless",
      "Decoupled",
      "full lifecycle",
      "clean code",
      "React",
      "Vue",
      "RESTful API",
      "business value",
      "continuous learning"
    ],
  }
];

const PracticePage = () => {
  const [questions] = useLocalStorage("interview_questions", defaultQuestions);
  const [sessions, setSessions] = useLocalStorage("interview_sessions", []);
  const { addSession } = useSessionHistory();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
  const current = questions[currentIndex];
  const isCorrect = current.expectedKeywords.some((keyword) =>
    answer.toLowerCase().includes(keyword.toLowerCase())
  );

  const newAnswered = [
    ...answered,
    {
      id: current.id,
      answer,
      correct: isCorrect,
    },
  ];

  setAnswered(newAnswered);

  // ✅ Auto-save partial session as draft
  const draftSession = {
    sessionId: "draft",
    date: new Date().toISOString(),
    questions: newAnswered.map((a) => {
      const q = questions.find((q) => q.id === a.id);
      return {
        ...a,
        category: q.category,
        difficulty: q.difficulty,
      };
    }),
  };

  // Replace previous draft
  setSessions((prev) => {
  const withoutDraft = prev.filter((s) => s.sessionId !== "draft");
  return [...withoutDraft, draftSession];
});


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

  addSession(session);
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
