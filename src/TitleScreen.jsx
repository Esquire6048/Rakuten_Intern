import React from 'react';

function TitleScreen({ startQuiz }) {
  return (
    <div>
      <h1>Quiz App</h1>
      <button onClick={startQuiz}>Challenge the Quiz</button>
      <button onClick={() => window.location.href = 'https://www.rakuten.co.jp'}>Return to Rakuten Ichiba</button>
    </div>
  );
}

export default TitleScreen;