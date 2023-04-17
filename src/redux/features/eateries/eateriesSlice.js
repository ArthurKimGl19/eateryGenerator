import { createSlice } from '@reduxjs/toolkit';
import data from '../../../data/data-eatery.json';

/* eslint-disable prettier/prettier */

const cleanupData = function (data) {
    const output = {};
    data.forEach((eatery, index) => {
        output[index] = eatery;
    });
    return output;
};

const initialRandomEatery = {
    name: '',
    type: '',
    rating: 0,
    dollarSign: 0,
    zipCode: 0
};

const initialState = {
    initialData: data,
    eateries: cleanupData(data),
    randomEatery: initialRandomEatery,
    history: []
};

const eateriesSlice = createSlice({
    name: 'eateries',
    initialState,
    reducers: {
        createRandomEatery: (state) => {
            const min = 0;
            const max = Object.keys(state.eateries).length;
            const randomNumber = Math.floor(Math.random() * (max - min) + min);
            const randomEatery = state.eateries[randomNumber];
            state.randomEatery = randomEatery;
        },
        updateHistory: (state) => {
            const randomEatery = state.randomEatery;
            state.history.push(randomEatery);
        },
        clearHistory: (state) => {
            state.history = [];
        },
        clearRandomEatery: (state) => {
            state.randomEatery = initialRandomEatery;
        }
    }
});

export const { createRandomEatery, updateHistory, clearHistory, clearRandomEatery } =
    eateriesSlice.actions;
export default eateriesSlice.reducer;
/* eslint-disable prettier/prettier */
