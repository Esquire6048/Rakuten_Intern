import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList.jsx";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [quizData, setQuizData] = useState(null); // quizDataを状態として宣言
  const [currentAnswer, setCurrentAnswer] = useState(null);

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
      correctAnswer: quizData[currentQuestion].correct,
      correct: quizData[currentQuestion].correct === answer,
    };

    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("●");
    } else {
      setFeedback("×");
    }

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setCurrentAnswer(newAnswer);
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
    setCurrentAnswer(null);
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
                      <td>{item.correct ? "○" : "×"}</td>
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
                    {currentAnswer && !currentAnswer.correct && (
                        <p>間違った答え: {currentAnswer.answer}</p>
                    )}
                    <p>解答</p>
                    <p>{quizData[currentQuestion].correct}</p>
                    <p>解説</p>
                    <p>{quizData[currentQuestion].explanation}</p>
                    <div>
                      <h2>{quizData[currentQuestion].keyword}に関連する商品</h2>
                      <ProductList keyword={quizData[currentQuestion].keyword}/>
                    </div>
                    <button
                        onClick={goToNextQuestion}>{currentQuestion + 1 === quizData.length ? "スコアを見る" : "次の問題へ"}</button>
                    <button onClick={navigateToHome}>タイトルに戻る</button>
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
                    <button onClick={navigateToHome} className="answer-section-gohome">タイトルに戻る</button>
                  </div>
              )}
            </div>
        )}
      </div>
  );
};

export default Quiz;