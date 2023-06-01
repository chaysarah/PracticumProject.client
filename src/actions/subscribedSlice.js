import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    chosenPerson: { tz: "123456789", firstName: "", lastName: "" }
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        updateTz: (state) => {
            state.chosenPerson.tz = state;
        },
        updateLastName: (state,action) => {
            state.chosenPerson.lastName = action.payload;
        },
        updateFirstName: (state) => {
            state.chosenPerson.firstName = state;
        }
    }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

