import { useEffect } from 'react';
import axios from 'axios';
import { Score } from './SnakeGame/utils/utils';
import './css/GameOverStyle.css'

interface GameOverProps {
    setGameOver:  React.Dispatch<React.SetStateAction<boolean>>;
    setGame:      React.Dispatch<React.SetStateAction<string>>;
    setScores:    React.Dispatch<React.SetStateAction<Score[]>>;
    setUserScore: React.Dispatch<React.SetStateAction<number>>;
    userName:     string;
    userScore:    number;
}

const GameOver = (props: GameOverProps) => {

    const handleScoreSubmit = async () => {
        try {
          /* スコアをサーバーに送信 -> 新しいスコアをデータベースに追加 */
          await axios.post('http://localhost:3001/scores', { name: props.userName, score: props.userScore });
          
          /* フォームの入力をクリア */
          // setUserName('名無し');
          
          /* 最新のスコアリストを再取得して画面に反映 */
          const response = await axios.get<Score[]>('http://localhost:3001/scores');
          props.setScores(response.data);
        }
        catch (err) {
          console.log("Error submitting score:", err);
        }
    };

    const Restart = () => {
        props.setGameOver(false);
    };

    const Home = () => {
        props.setGame("menu");
    };

    useEffect(() => {
        handleScoreSubmit();
    }, []);


    return (
        <>
            <div id="gameover">
                <h1>Game Over!</h1>
                <button onClick={() => {Restart(); props.setUserScore(0);}}>リスタート</button>
                <button onClick={() => {Home();    props.setUserScore(0);}}>ホーム</button>
            </div>
        </>
    );
};

export default GameOver;