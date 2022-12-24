import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoxModel } from '../Models/boxModel';

const emptyBoard: BoxModel[] = [
    { location: 1, val: '' },
    { location: 2, val: '' },
    { location: 3, val: '' },
    { location: 4, val: '' },
    { location: 5, val: '' },
    { location: 6, val: '' },
    { location: 7, val: '' },
    { location: 8, val: '' },
    { location: 9, val: '' }
]

const initialState = {
    val: emptyBoard,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,

    reducers: {
        setNewGame: (state) => {
            state.val = emptyBoard;
        },

        PlayMove: (state, action: PayloadAction<any>) => {
            state.val[action.payload.location - 1] = action.payload
        },
    },
})

export const { setNewGame, PlayMove } = boardSlice.actions;

export default boardSlice.reducer;