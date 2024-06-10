// export const gameover = false;

export const CELL_SIZE = 20;

export interface Position {
    x: number,
    y: number
}

export interface Score {
    id: number;
    name: string;
    score: number;
    created_at: string;
    ranking: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'STOP';

export const initialSnake: Position[] = [{x: Math.floor(CELL_SIZE/4), y: Math.floor(CELL_SIZE/2) }];

export const generateFoodPosition = (): Position => {
    
    // let _x: number = Math.floor(Math.random() * CELL_SIZE) + 2;
    // let _y: number = Math.floor(Math.random() * CELL_SIZE) + 2;
    return {
        x: Math.floor(Math.random() * CELL_SIZE),
        y: Math.floor(Math.random() * CELL_SIZE)
    };
};



export const moveSnake = async(
    direction:       Direction,
    snake:           Position[],
    food:            Position,
    intervalTime:    number,
    hitCount:        number, 
    setSnake:        React.Dispatch<React.SetStateAction<Position[]>>,
    setFood:         React.Dispatch<React.SetStateAction<Position>>,
    setGameOver:     React.Dispatch<React.SetStateAction<boolean>>,
    setIntervalTime: React.Dispatch<React.SetStateAction<number>>,
    setDirection:    React.Dispatch<React.SetStateAction<Direction>>,
    setHitCount:     React.Dispatch<React.SetStateAction<number>>,
    setUserScore:    React.Dispatch<React.SetStateAction<number>>,
        
  ) => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };
    
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      case 'STOP':
        // head.x = head.x;
        // head.y = head.y;
        break;

      default:
        break;
    }

    if (head.x < 0 || 
        head.y < 0 || 
        head.x >= CELL_SIZE || 
        head.y >= CELL_SIZE ||
        newSnake.slice(1).some((body) => body.x === head.x && body.y === head.y)  
    ) {
        setIntervalTime(200);
        setDirection('STOP');
        setSnake(initialSnake);
        // setHitCount(0);
        // setUserScore(0);
        setGameOver(true);
        return ;
    }
    else if ( direction !== 'STOP' ) {
        setIntervalTime(prevInterval => prevInterval - 0.3);
        setUserScore(prevScore => prevScore + 1);
    }

    if (head.x === food.x && head.y === food.y) {
        newSnake.unshift({ ...head });
        setFood(generateFoodPosition());
        setHitCount(prevCount => prevCount + 1);

        setUserScore(prevScore => prevScore + (newSnake.length * 10));

        if(intervalTime < 40 ) {
          setIntervalTime(40);
        }
    } 
    else {
        newSnake.pop();
    }

    newSnake.unshift(head);
    setSnake(newSnake);

};