import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    val: 'X'
};

export const turnSlice = createSlice({
    name: 'turn',
    initialState,

    reducers: {
        setTurn: (state, action: PayloadAction<'X' | 'O' | 'none'>) => {
            state.val = action.payload;
        },
    },
})

export const { setTurn } = turnSlice.actions;

export default turnSlice.reducer;