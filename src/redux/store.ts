/* eslint-disable prettier/prettier */
import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import eateriesReducer from './features/eateries/eateriesSlice';
import { loadState, saveState } from '../helpers/localStorageFunctions';

const rootReducer = combineReducers({
    eateries: eateriesReducer
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: loadState()
    });
    // Can still subscribe to the store
    store.subscribe(() => {
        console.log('redux store data', store.getState());
        saveState(store.getState());
    });
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
