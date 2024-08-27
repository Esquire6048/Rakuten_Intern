import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [quizData, setQuizData] = useState(null); // quizDataを状態として宣言

  // データを非同期で取得
  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuizData(data)); // 状態にセット
  }, []);

  const handleAnswer = (answer) => {
    const newAnswer = {
      question: quizData[currentQuestion].question,
      options: quizData[currentQuestion].options,
      answer: answer,
      correct: quizData[currentQuestion].correct === answer,
    };

    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("●");
    } else {
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

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToQuiz = () => {
    window.location.reload();
  };

  if (!quizData) {
    return <div>Loading...</div>; // データが読み込まれるまで「Loading...」を表示
  }

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
          <button onClick={navigateToQuiz}>もう一度やる</button>
          <button onClick={navigateToHome}>タイトルに戻る</button>
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
              <p>解説</p>
              <p>{quizData[currentQuestion].explanation}</p>
              <p>商品URL</p>
              <p><a href={quizData[currentQuestion].url}>{quizData[currentQuestion].url}</a></p>
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

export default Quiz;