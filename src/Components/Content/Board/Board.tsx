import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurn } from "../../../App/turnSlice";
import { lossesCounter, winsCounter } from "../../../App/winsAndLossesSlice";
import { BoxModel } from "../../../Models/boxModel";
import boardServices from "../../../Services/BoardServices";
import "./Board.scss";
import Cell from "./Cell/Cell";
import { ToastContainer, toast } from 'react-toastify';
import { PlayMove } from "../../../App/boardSlice";
const _ = require('lodash');

function Board({ disableButtons, setDisableButtons, difficulty, colorMode }: any): JSX.Element {

    const turnState = useSelector((state: any) => state.turn.val);
    const boardState = useSelector((state: any) => state.board.val);
    const dispatch = useDispatch();

    useEffect(() => { // Win States
        if (boardServices.boardStatus(boardState) === 'X') {
            setDisableButtons(true);
            dispatch(winsCounter());
            dispatch(setTurn('none'))
            toast.success('You Won! 😁');

        } else if (boardServices.boardStatus(boardState) === 'O') {
            setDisableButtons(true);
            dispatch(lossesCounter());
            dispatch(setTurn('none'))
            toast.error('You Losst! 😞');
        } else if (boardServices.boardStatus(boardState) === 'DROW') {
            setDisableButtons(true);
            dispatch(setTurn('none'))
            toast.warning('Drow! 😐');
        }
    }, [boardState])

    useEffect(() => { // PC play
        if (turnState === 'O') {
            if (!boardServices.boardStatus(boardState)) {
                setTimeout(() => {
                    let PcPlayedItsTurn = false

                    const emptyBoxes: BoxModel[] = []
                    for (const box of boardState) {
                        if (!box.val) {
                            emptyBoxes.push(box)
                        }
                    }

                    let proxyArray = _.cloneDeep(boardState)

                    if ((difficulty === 'medium') || difficulty === 'hard') {

                        const difficultyChance = Math.floor(Math.random() * 2)

                        if ((difficulty === 'medium' && difficultyChance < 1) || difficulty === 'hard') {

                            for (const location of emptyBoxes) {
                                proxyArray[location.location - 1].val = 'O';
                                if (boardServices.boardStatus(proxyArray) === 'O') {
                                    proxyArray[location.location - 1].val = 'O';
                                    dispatch(PlayMove({ location: location.location, val: 'O' }));
                                    PcPlayedItsTurn = true;
                                    break
                                } else {
                                    proxyArray[location.location - 1].val = '';
                                }
                            }

                            if (PcPlayedItsTurn === false) {
                                for (const location of emptyBoxes) {
                                    proxyArray[location.location - 1].val = 'X';
                                    if (boardServices.boardStatus(proxyArray) === 'X') {
                                        proxyArray[location.location - 1].val = 'O';
                                        dispatch(PlayMove({ location: location.location, val: 'O' }))
                                        PcPlayedItsTurn = true;
                                        break
                                    } else {
                                        proxyArray[location.location - 1].val = '';
                                    }
                                }
                            }
                        }
                    }

                    if (PcPlayedItsTurn === false) {
                        const randomMove = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                        dispatch(PlayMove({ location: randomMove.location, val: "O" }))
                        PcPlayedItsTurn = true;
                    }

                    dispatch(setTurn('X'))
                    setDisableButtons(false)
                }, 1000)
            }
        }
    }, [turnState === 'O'])

    return (
        <div className="Board">
            {boardState.map((data: any) => {
                return <Cell key={data.location} data={data} setDisableButtons={setDisableButtons} disableButtons={disableButtons} />
            })}
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme={colorMode}
            />
        </div>
    );
}

export default Board;
