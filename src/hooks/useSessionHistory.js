import useLocalStorage from "./useLocalStorage";

const SESSION_KEY = "interview_sessions";

const useSessionHistory = () => {
  const [sessions, setSessions] = useLocalStorage(SESSION_KEY, []);

  const addSession = (session) => {
    setSessions((prev) => [...prev, session]);
  };

  const clearSessions = () => {
    setSessions([]);
  };

  return {
    sessions,
    addSession,
    clearSessions,
  };
};

export default useSessionHistory;
