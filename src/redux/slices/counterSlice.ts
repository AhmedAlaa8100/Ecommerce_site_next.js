import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    count: 5
}



const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        }
    }
})

export const counterReducer = counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
