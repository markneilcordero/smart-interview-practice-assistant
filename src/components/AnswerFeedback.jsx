import React from "react";

const AnswerFeedback = ({ result, expectedKeywords = [] }) => {
  const { correct, userAnswer } = result;

  return (
    <div
      className={`alert ${
        correct ? "alert-success" : "alert-danger"
      } mt-3`}
      role="alert"
    >
      {correct ? (
        <>
          ✅ <strong>Good job!</strong> Your answer seems correct.
        </>
      ) : (
        <>
          ❌ <strong>Hmm...</strong> Your answer might be missing some key points.
          <br />
          <small className="d-block mt-2">
            Try including keywords like:
            <ul className="mb-0">
              {expectedKeywords.map((kw, idx) => (
                <li key={idx}>
                  <code>{kw}</code>
                </li>
              ))}
            </ul>
          </small>
        </>
      )}
    </div>
  );
};

export default AnswerFeedback;
