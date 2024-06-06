import axios from 'axios';
import { useEffect, useState } from 'react';
import Name from './Name';
import SnakeGame from './SnakeGame/SnakeGame';
import StartMenu from "./StartMenu";

import { Score } from './SnakeGame/utils/utils';

import './css/Game.css';


const Game = () => {
    const [game, setGame] = useState<string>("name");
    const [scores, setScores] = useState<Score[]>([]);
    const [userName, setUserName] = useState<string>('名無し');
    const [userScore, setUserScore] = useState<number>(Number);


  useEffect(() => {
    /* 非同期関数 */
    const fetchScores = async () => {
      try {
        /* サーバーにHTTP GETリクエストを送信してスコアのリストを取得 */
        const response = await axios.get<Score[]>('scores-game.mysql.database.azure.com/scores');
        setScores(response.data);
        console.log(scores);
      }
      catch (err) {
        console.error("Error fetching scores:", err);
      }
    };
    fetchScores();
  }, [scores]);

//   const handleDeleteScore = async () => {
//     try {
//       await axios.delete('http://localhost:3001/scores');
    
//       const response = await axios.get<Score[]>('http://localhost:3001/scores');
//       setScores(response.data);
//     }
//     catch (err) {
//       console.log("Error submitting score:", err);
//     }
//   };

  
    const selectGame = (game: string) => {

        switch(game) {
            case "snake":
                return  <SnakeGame 
                            setGame={setGame} 
                            setScores={setScores}
                            setUserScore={setUserScore} 
                            userScore={userScore}
                            userName={userName}
                        />;

            // case "2048":
            //     return  <TwoZeroFourEight setGame={setGame} />

            case "name":
                return  <Name 
                          userName={userName} 
                          setUserName={setUserName} 
                          setGame={setGame} 
                        />
            case "menu":
                return  <StartMenu setGame={setGame} />;

            default:
                return  <StartMenu setGame={setGame} />;


        }
    }

    return (
        <>  
            <header>
              <div className="title">
                  <h1><button id="menu" onClick={() => {setGame("menu"); setUserScore(0); }} >ゲーム集</button></h1>
              </div>
            </header>
            <main>

                {selectGame(game)}  
                
            </main>
            <footer>
                {/* <button onClick={() => {setGame("name"); setUserScore(0);}}>名前変更</button> */}
                <h2>High Scores</h2>
                <div id="rank">
                    <ul className='ranking'>
                        { scores.length > 0 ? scores.map((score, index) => (
                            <li key={score.id} className={index < 3 ? `top${index + 1}` : ''}>
                                <span className="name">{score.name === "" ? "名無し" : score.name}</span> :
                                <span className="score">{score.score}点</span>
                            </li>
                        )) :
                        <li className="empty">記録無し</li>}
                    </ul>
                    {/* <button onClick={handleDeleteScore}>ランキング削除</button> */}
                </div>
            </footer>
        </>
    );

};

export default Game;