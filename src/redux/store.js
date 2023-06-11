/* eslint-disable prettier/prettier */

import { configureStore } from '@reduxjs/toolkit';
import eateriesReducer from './features/eateries/eateriesSlice';
import { loadState, saveState } from '../helpers/localStorageFunctions';

const store = configureStore({
    reducer: eateriesReducer,
    preloadedState: loadState()
});

// Can still subscribe to the store
store.subscribe(() => {
    console.log('redux store data', store.getState());
    saveState(store.getState());
});

export default store;
/* eslint-disable prettier/prettier */
