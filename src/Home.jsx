import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("quiz");
  }

  return (
    <div className="home">
      <h1>正解数だけ<span>楽天ポイント</span>獲得！楽天防災クイズ！</h1>
      <button onClick={navigateToQuiz}>クイズにチャレンジ</button>
      <a target="_blank" rel="noopener noreferrer" href="https://www.rakuten.co.jp">
        <button>楽天市場に戻る</button>
      </a>
    </div>
  );
}

export default Home
