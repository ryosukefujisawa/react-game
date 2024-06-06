import { useEffect, useState, useRef } from 'react';
import { useKey } from 'react-use';
import GameOver from '../GameOver';
import '../css/SnakeGame.css';
import SnakeBoard from './SnakeBoard';
import {
    Direction,
    Position,
    Score,
    generateFoodPosition,
    initialSnake,
    moveSnake
} from './utils/utils';




interface SnakeGameProps {
    setGame:      React.Dispatch<React.SetStateAction<string>>;
    setScores:    React.Dispatch<React.SetStateAction<Score[]>>
    setUserScore: React.Dispatch<React.SetStateAction<number>>;
    userScore:    number;
    userName:     string;
}

const SnakeGame = (props: SnakeGameProps) => {
    const [snake, setSnake] = useState<Position[]>(initialSnake);
    const [direction, setDirection] = useState<Direction>('STOP');
    const [food, setFood] = useState<Position>(generateFoodPosition);
    const [gameover, setGameOver] = useState<boolean>(false);
    const [intervalTime, setIntervalTime] = useState<number>(200);
    const [hitCount, setHitCount] = useState<number>(0);

    /*　ページのスクロール */
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // moveSnakeというIDを持つ要素がマウントされた後、スクロール
        if (scrollRef.current) {

            setTimeout(() => {
                scrollRef.current?.scrollIntoView({behavior: 'smooth'});
            }, 500);
        }
    })

    /* ゲームが動くたび */
    useEffect(() => {
        const interval = setInterval(() => moveSnake(
            direction, 
            snake,
            food,
            intervalTime,
            hitCount,
            setSnake, 
            setFood, 
            setGameOver,
            setIntervalTime,
            setDirection,
            setHitCount,
            props.setUserScore,
        ), intervalTime);
        return () => clearInterval(interval);
    }, [
        direction, snake, food, intervalTime, hitCount, 
        setSnake, setFood, setGameOver, setIntervalTime, 
        setDirection, setHitCount, props.setUserScore
        ]
    );


    const handleKeyPress = (newDirection: Direction, e: KeyboardEvent) => {
        e.preventDefault();
        setDirection((prevDirection )=> {
            if (
            (prevDirection === 'UP' && newDirection === 'DOWN') ||
            (prevDirection === 'DOWN' && newDirection === 'UP') ||
            (prevDirection === 'LEFT' && newDirection === 'RIGHT') ||
            (prevDirection === 'RIGHT' && newDirection === 'LEFT')
            ) {
            // Ignore the key press if it's the opposite direction
            // console.log(newDirection);
            return prevDirection;
            }
            return newDirection;
        });
        // setDirection(newDirection);
    };
    
    useKey('ArrowUp',    (e) => handleKeyPress('UP',    e as KeyboardEvent));
    useKey('ArrowDown',  (e) => handleKeyPress('DOWN',  e as KeyboardEvent));
    useKey('ArrowLeft',  (e) => handleKeyPress('LEFT',  e as KeyboardEvent));
    useKey('ArrowRight', (e) => handleKeyPress('RIGHT', e as KeyboardEvent));  

    return (
        <>
            <div
                id="moveSnake"
                ref={scrollRef}
                // tabIndex={0}
            >
                <h1 id="SnakeTitle">Snake Game</h1>
                <div>

                    { !gameover ?
                        <SnakeBoard snake={snake} food={food} direction={direction}/>  :
                        <GameOver 
                            setGameOver={setGameOver} 
                            setGame={props.setGame}
                            setScores={props.setScores}
                            setUserScore={props.setUserScore}
                            userName={props.userName}
                            userScore={props.userScore}
                        />
                    }
                    <p className="nowScore">Score : {props.userScore}</p>
                </div>

            </div>
        </>
    );
};


export default SnakeGame;