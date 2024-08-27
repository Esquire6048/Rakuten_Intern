import { useState } from "react";
import "./App.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  console.log(answers);

  const handleAnswer = (answer) => {
    console.log(answer);
    const newAnswer = {
      question: quizData[currentQuestion].question,
      answer: answer,
      correct: quizData[currentQuestion].correct === answer,
    };

    console.log(newAnswer);

    //解答が正解の場合
    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("●");
    } else {
      //不正解の場合
      setFeedback("×");
    }

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setNext(true);
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

    setNext(false);
    setFeedback(null);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h1>スコア</h1>
          <h2 className="final-score">
            {score}/{quizData.length}
          </h2>
          <table className="answer-table">
            <thead>
              <tr>
                <td>質問</td>
                <td>あなたの解答</td>
                <td>合否</td>
              </tr>
            </thead>

            <tbody>
              {answers.map((item, index) => (
                <tr className={item.correct ? "correct" : "wrong"} key={index}>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? "●" : "×"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="question-section">
          <h1>
            問題 {currentQuestion + 1}/{quizData.length}
          </h1>
          <h2>{quizData[currentQuestion].question}</h2>
          {next ? (
            <div className="feedback-section">
              <h2 className="large-feedback">{feedback}</h2>
              <p>解答</p>
              <p>{quizData[currentQuestion].correct}</p>
              <button onClick={goToNextQuestion}>次の問題へ</button>
            </div>
          ) : (
            <div className="answer-section">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  className={`quiz-option-button option-${index}`}
                  key={index}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

const quizData = [
  {
    question: "今のインターンの会社は？",
    options: ["楽天", "Dena", "Lineヤフー", "サイバーエージェント"],
    correct: "楽天",
  },
  {
    question: "次のうち、哺乳類ではない動物はどれですか？",
    options: ["カンガルー", "カンガルー", "ペンギン", "カバ"],
    correct: "ペンギン",
  }
];