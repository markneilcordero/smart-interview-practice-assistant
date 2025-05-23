import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PracticePage from "./components/PracticePage";
import DashboardPage from "./components/DashboardPage";
import HistoryPage from "./components/HistoryPage";
import QuestionManagerPage from "./components/QuestionManagerPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="page-wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <div className="page-content flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/practice" replace />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/questions" element={<QuestionManagerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

// Optional 404 Component
const NotFound = () => (
  <div className="container my-5">
    <h3 className="text-danger">404 - Page Not Found</h3>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

export default App;
