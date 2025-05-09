import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SettingsModal = ({ onClose }) => {
  const [darkMode, setDarkMode] = useLocalStorage("dark_mode", false);

  // Apply dark mode classes on mount and when toggled
  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-white", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const clearAllData = () => {
  if (window.confirm("Are you sure you want to clear all saved questions and sessions?")) {
    localStorage.removeItem("interview_questions");
    localStorage.removeItem("interview_sessions");

    // ✅ Dispatch event to tell React components to update
    window.dispatchEvent(new CustomEvent("localStorageCleared"));

    alert("All data cleared.");
    onClose();
  }
};



  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">⚙️ Settings</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeToggle">
                Enable Dark Mode
              </label>
            </div>

            <button className="btn btn-outline-danger w-100" onClick={clearAllData}>
              🗑️ Clear All Data
            </button>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
