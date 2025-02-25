// import axios from 'axios';
// import { useEffect } from 'react';
import { Score } from './SnakeGame/utils/utils';
import './css/GameOverStyle.css';

interface GameOverProps {
    setGameOver:  React.Dispatch<React.SetStateAction<boolean>>;
    setGame:      React.Dispatch<React.SetStateAction<string>>;
    setScores:    React.Dispatch<React.SetStateAction<Score[]>>;
    setUserScore: React.Dispatch<React.SetStateAction<number>>;
    userName:     string;
    userScore:    number;
}

const GameOver = (props: GameOverProps) => {
    // const {userName, userScore, setScores } = props;

    const Restart = () => {
        props.setGameOver(false);
    };

    const Home = () => {
        props.setGame("menu");
    };

    // const scrollRef = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     // moveSnakeというIDを持つ要素がマウントされた後、スクロール
    //     if (scrollRef.current) {
    //         // scrollRef.current.scrollTop = 140;
    //         setTimeout(() => {        
    //             scrollRef.current?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    //         }, 100);
    //     }
    // }, [scrollRef]);


    // useEffect(() => {
    //     const handleScoreSubmit = async () => {
    //         try {
    //           /* スコアをサーバーに送信 -> 新しいスコアをデータベースに追加 */
    //           await axios.post('https://score-database.azurewebsites.net/scores', { name: userName, score: userScore });
              
    //           /* フォームの入力をクリア */
    //           // setUserName('名無し');
              
    //           /* 最新のスコアリストを再取得して画面に反映 */
    //           const response = await axios.get<Score[]>('https://score-database.azurewebsites.net/scores');
    //           setScores(response.data);
    //         }
    //         catch (err) {
    //           console.log("Error submitting score:", err);
    //         }
    //     };

    //     handleScoreSubmit();
    // }, [userName, userScore, setScores]);


    return (
        <>
            <div id="gameover">
                <h1>Game Over!</h1>
                <button className="decided" onClick={() => {Restart(); props.setUserScore(0);}}>リスタート</button>
                <button className="decided" onClick={() => {Home();    props.setUserScore(0);}}>ホーム</button>
            </div>
        </>
    );
};

export default GameOver;