import { useNavigate } from "react-router-dom";
import exampleImage from './images/example_word.png';

const Home = () => {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("quiz");
  }

  return (
    <div className="home-wrp">
      <div className="home">
        <img src={exampleImage} alt="Example" className="example-image" width="500" height="500" />
        <div className="home-right">
          <h1>正解数だけ<span>楽天ポイント</span>獲得！</h1>
          <button onClick={navigateToQuiz} className="regular-route">クイズにチャレンジ</button>
          <a target="_blank" rel="noopener noreferrer" href="https://www.rakuten.co.jp" >
            <button>楽天市場に戻る</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home
