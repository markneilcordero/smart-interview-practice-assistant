import React from "react";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import useLocalStorage from "../hooks/useLocalStorage";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const DashboardPage = () => {
  const [sessions] = useLocalStorage("interview_sessions", []);

  // Prepare data for charts
  const categoryCount = {};
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  const progressData = [];

  sessions.forEach((session, index) => {
    session.questions.forEach((q) => {
      categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
      difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1;
    });

    const correct = session.questions.filter((q) => q.correct).length;
    progressData.push({ x: index + 1, y: correct });
  });

  const pieData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Questions per Category",
        data: Object.values(categoryCount),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(difficultyCount),
    datasets: [
      {
        label: "Answered by Difficulty",
        data: Object.values(difficultyCount),
        backgroundColor: ["#20c997", "#0d6efd", "#e83e8c"],
      },
    ],
  };

  const lineData = {
    labels: progressData.map((p) => `Session ${p.x}`),
    datasets: [
      {
        label: "Correct Answers",
        data: progressData.map((p) => p.y),
        fill: false,
        borderColor: "#17a2b8",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">📈 Interview Dashboard</h2>

      {sessions.length === 0 ? (
        <div className="alert alert-warning">No session data found.</div>
      ) : (
        <>
          <div className="mb-5">
            <h5>Category Distribution</h5>
            <Pie data={pieData} />
          </div>

          <div className="mb-5">
            <h5>Answered by Difficulty</h5>
            <Bar data={barData} />
          </div>

          <div className="mb-5">
            <h5>Progress Over Sessions</h5>
            <Line data={lineData} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
