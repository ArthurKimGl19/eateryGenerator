/* eslint-disable prettier/prettier */

import { configureStore } from '@reduxjs/toolkit';
import eateriesReducer from './eateriesSlice';

const store = configureStore({
    reducer: eateriesReducer
});

// Can still subscribe to the store
store.subscribe(() => console.log('redux store data', store.getState()));

export default store;
/* eslint-disable prettier/prettier */
