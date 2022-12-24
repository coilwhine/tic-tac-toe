import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewGame } from "../../App/boardSlice";
import { setTurn } from "../../App/turnSlice";
import Board from "./Board/Board";
import "./Content.scss";
import 'react-toastify/dist/ReactToastify.css';

function Content(): JSX.Element {

    const wins = useSelector((state: any) => state.winsAndLosses.wins);
    const losses = useSelector((state: any) => state.winsAndLosses.losses);
    const [disableButtons, setDisableButtons] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [colorMode, setColorMode] = useState<string>('light');
    const turnState = useSelector((state: any) => state.turn.val);
    const dispatch = useDispatch();

    function createNewGame() {
        setDisableButtons(false)
        dispatch(setTurn('X'))
        dispatch(setNewGame());
    }

    function switchColorTheme(e: any) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            setColorMode('dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            setColorMode('light')
        }
    }

    function adjustDifficulty(e: any) {
        setDifficulty(e.target.value)
    }

    return (
        <div className="Content">
            <div className="score-board-wraper">
                <div className="score-bord">
                    <div className="score-wraper x-score-wraper">
                        <span className="score-heading">X</span>
                        <span className="score" id="user-score">{wins}</span>
                    </div>
                    <div className="score-wraper o-score-wraper">
                        <span className="score-heading">O</span>
                        <span className="score" id="computer-score">{losses}</span>
                    </div>
                </div>
            </div>
            <Board disableButtons={disableButtons} setDisableButtons={setDisableButtons} difficulty={difficulty} colorMode={colorMode} />
            <div className="options-bar">
                <div className="select-wraper">
                    <select id="difficulty" name="difficulty" onChange={(e) => adjustDifficulty(e)}>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                </div>
                <div className="btn-wraper">
                    <button className="play-again-btn" onClick={() => createNewGame()} disabled={turnState === "O"}>Play Again
                    </button>
                </div>
                <div className="togle-wraper-wraper">
                    <span>{colorMode === 'dark' ? 'Light' : 'Dark'} Mode</span>
                    <div className="toggle-wraper">
                        <input id="theme-mode" className="toggle" type="checkbox" onChange={(e) => switchColorTheme(e)} />
                        <label htmlFor="theme-mode"></label>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Content;
