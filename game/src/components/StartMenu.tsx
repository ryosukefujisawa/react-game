import './css/StartMenu.css';
import SnakeGameImage from '../img/snakeGame.png'

interface StartProps {
    setGame: React.Dispatch<React.SetStateAction<string>>;
}

const StartMenu = (props : StartProps) => {

    const gameStart = (value: string) => {
        props.setGame(value);
        // props.selectGame(game);
        // props.setStart({start: true});
    };

    return (
        <>
            <div id="startMenu">
                <h1>GameMenu</h1>
                <div className="game-label">
                    <img src={SnakeGameImage} alt="Snake Game Icon" />
                    <span>スネークゲーム</span>
                    <button value="snake" onClick={() => gameStart("snake")} >Start</button>
                    <div className='tooltip'>
                        矢印キーで蛇を操作することができます。<br />
                        <strong>進行方向の反対方向には進めません。</strong><br/>
                        食べ物を取るとスコアが増え、蛇の体が長くなります。<br/>
                        壁や自分の体にぶつかると<strong className='gameoverStrong'>ゲームオーバー</strong>です。<br/>
                        時間が経つとスコアは増えますが、<strong>蛇の動きが速く</strong>なります。<br/>
                        どれだけ長く生き延びられるか挑戦してみてください！
                    </div>
                </div>

                {/* <div className="game-label">
                    <p>no Image</p>
                    <span>2048</span>
                    <button value="2048" onClick={() => gameStart("2048")}>Start</button>
                    <div className='tooltip'>2048の説明</div>
                </div> */}
            </div>
        </>
    );
};

export default StartMenu;