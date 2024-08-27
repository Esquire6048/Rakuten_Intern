import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("quiz");
  }

  return (
    <div className="home">
      <h1>楽天ポイント2倍！防災クイズ</h1>
      <button onClick={navigateToQuiz}>クイズにチャレンジ</button>
      <button onClick={() => window.location.href = 'https://www.rakuten.co.jp'}>Return to Rakuten Ichiba</button>
    </div>
  );
}

export default Home