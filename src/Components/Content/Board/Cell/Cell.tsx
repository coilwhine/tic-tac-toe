import { useDispatch, useSelector } from "react-redux";
import { PlayMove } from "../../../../App/boardSlice";
import { setTurn } from "../../../../App/turnSlice";
import { BoxModel } from "../../../../Models/boxModel";
import "./Cell.scss";

function Cell({ data, setDisableButtons, disableButtons }: { data: BoxModel, setDisableButtons: any, disableButtons: any }): JSX.Element {

    const dispatch = useDispatch();
    function playerTern() {

        if (data.val) {
            console.log('Illegal action');
        } else {
            dispatch(PlayMove({ location: data.location, val: "X" }))
            setDisableButtons(true)
            dispatch(setTurn('O'));
        }
    }

    return (
        <button className="Cell" disabled={disableButtons} onClick={() => playerTern()}>
            {data.val}
        </button>
    );
}

export default Cell;
