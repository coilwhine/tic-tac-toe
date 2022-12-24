import { configureStore } from '@reduxjs/toolkit'
import boardReducer from "./boardSlice";
import turnReducer from "./turnSlice";
import winsAndLossesReducer from "./winsAndLossesSlice";


export default configureStore({
    reducer: {
        board: boardReducer,
        turn: turnReducer,
        winsAndLosses: winsAndLossesReducer
    }
})