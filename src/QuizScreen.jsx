import React, { useState } from 'react';

function QuizScreen({ questions, finishQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      finishQuiz(score);
    }
  };

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <button 
          key={index} 
          onClick={() => handleOptionClick(index)}
          disabled={showExplanation}
        >
          {option}
        </button>
      ))}
      {showExplanation && (
        <div>
          <p>{selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
          <p>{currentQuestion.explanation}</p>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}

export default QuizScreen;