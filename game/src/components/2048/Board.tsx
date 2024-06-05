import GameOver from "../GameOver";
import { BoardSize } from "./utils/utils";

const Board = () => {
    const renderBoard = () => {        

        const rows = [];
        for (let row = 0; row < BoardSize; row++) {
            const cells = [];
            for (let col = 0; col < BoardSize; col++) {
                cells.push(<div key={`${col}-${row}`}></div>);

            }
            rows.push(<div>{cells}</div>);
        }
        return rows;
    }

    return (
        <>
            <div id="Board2048">
                {renderBoard()}
            </div>
        </>

    );

};


export default Board;
