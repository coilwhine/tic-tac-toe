import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wins: 0,
    losses: 0
};

export const winsAndLosses = createSlice({
    name: 'winsAndLosses',
    initialState,

    reducers: {
        winsCounter: (state) => {
            state.wins = state.wins + 1
        },
        lossesCounter: (state) => {
            state.losses = state.losses + 1
        },
    },
})

export const { winsCounter, lossesCounter } = winsAndLosses.actions;

export default winsAndLosses.reducer;