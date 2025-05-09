import React from "react";
import SessionSummaryTable from "./SessionSummaryTable";
import useLocalStorage from "../hooks/useLocalStorage";

const HistoryPage = () => {
  const [sessions] = useLocalStorage("interview_sessions", []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">📜 Practice History</h2>
      <SessionSummaryTable sessions={sessions} />
    </div>
  );
};

export default HistoryPage;
