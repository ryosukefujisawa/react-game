import { useState } from "react";
import Board from "./Board";
// import GameOver from "../GameOver";
import '../css/2048.css';


interface TwoZeroFourEightProps {
    setGame: React.Dispatch<React.SetStateAction<string>>;
}


const TwoZeroFourEight = (props: TwoZeroFourEightProps) => {
        const [gameover, setGameOver] = useState<boolean>(false);

        return (
            <>
                <a onClick={() => props.setGame("menu")}><h1>2048</h1></a>

                { !gameover ?
                    <Board /> :
                    // <GameOver setGameOver={setGameOver} setGame={props.setGame} />
                    <h1>GameOver</h1>
                }
            </>
        );
};

export default TwoZeroFourEight;