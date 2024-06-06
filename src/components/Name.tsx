import React from 'react';
import './css/Name.css';

interface NameProps {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setGame: React.Dispatch<React.SetStateAction<string>>;
}

const Name = (props: NameProps) => {

    return (
        <>
            <div id="name-div">
                <h2>名前入力</h2>
                <div>
                    <input
                        type="text"
                        value={props.userName}
                        onChange={(e) => props.setUserName(e.target.value)}
                        placeholder='名前を入力'
                        id="name"
                        autoComplete='off'
                    />
                    <button className="decided" onClick={() => props.setGame("menu")}>決定</button>
                    <p className="note">一度決めると画面をリロードするまで変更できません</p>
                </div>
            </div>
        </>
    );
};

export default Name;