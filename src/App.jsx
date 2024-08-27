import React, { useState } from 'react';
import TitleScreen from './TitleScreen';
import QuizScreen from './QuizScreen';
import ResultScreen from './ResultScreen';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 2,
    explanation: 'Paris is the capital of France.',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
    correctAnswer: 1,
    explanation: 'Jupiter is the largest planet in our solar system.',
  },
  // Add more questions as needed
];

function App() {
  const [screen, setScreen] = useState('title');
  const [score, setScore] = useState(0);

  const startQuiz = () => setScreen('quiz');
  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setScreen('result');
  };
  const restartQuiz = () => setScreen('quiz');
  const returnToTitle = () => setScreen('title');

  return (
    <div>
      {screen === 'title' && <TitleScreen startQuiz={startQuiz} />}
      {screen === 'quiz' && <QuizScreen questions={questions} finishQuiz={finishQuiz} />}
      {screen === 'result' && (
        <ResultScreen 
          score={score} 
          totalQuestions={questions.length} 
          restartQuiz={restartQuiz} 
          returnToTitle={returnToTitle} 
        />
      )}
    </div>
  );
}

export default App;