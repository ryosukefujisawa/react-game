import { CELL_SIZE, Position, Direction } from './utils/utils';



interface GameBoardProps {
    snake: Position[];
    food: Position;
    direction: Direction;
}

const SnakeBoard: React.FC<GameBoardProps> = ({snake, food, direction}) => {
    const renderBoard = () => {
        let rows = [];
        for (let row = 0; row < CELL_SIZE; row++) {
            let cells = [];
            for (let col = 0; col < CELL_SIZE; col++) {
                let isSnake = snake.some((s) => s.x === col && s.y === row);
                let isFood = food.x === col && food.y === row;
                let isSnakeHead = snake[0].x === col && snake[0].y === row;
                let className = 'boardBlock ';

                if (isSnake) {
                    className += 'snake ';
                    if (isSnakeHead) {
                        className += 'snakeHead ';
                        className += direction;
                    }
                }
                else if (isFood) {
                    className += 'food ';
                }

                cells.push(<div key={`${col}-${row}`} className={className}></div>);
            }
            rows.push(<div key={row} className="rows" >{cells}</div>);
        }
        return rows;
    }

    return (
        <>
        <div id="snakeGameContents">
            <div id="board" style={{'--cell-size': `${CELL_SIZE*40}px`} as React.CSSProperties}>
                {renderBoard()}
            </div>
            
        </div>
        </>
    );
};

export default SnakeBoard;
