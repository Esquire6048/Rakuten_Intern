import React from 'react';

function ResultScreen({ score, totalQuestions, restartQuiz, returnToTitle }) {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>You answered {score} out of {totalQuestions} questions correctly!</p>
      <button onClick={restartQuiz}>Try Again</button>
      <button onClick={returnToTitle}>Return to Title</button>
    </div>
  );
}

export default ResultScreen;