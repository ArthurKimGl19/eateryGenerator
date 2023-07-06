import { createSlice } from '@reduxjs/toolkit';

import {
    cleanupData,
    shuffleEateries,
    calculateDistanceInMiles,
    calculateProximity
} from '../../helpers/eateriesFunctions';
import data from '../../../data/data-eatery.json';
import { EateryInterface, EateriesInterface } from '../../../shared/interfaces/eatery.interface';
import favoriteData from '../../../data/favorite-eatery.json';
import { GeolocationInterface } from '../../../shared/interfaces/geolocation.interface';

const initialRandomEatery = {
    name: '',
    type: '',
    rating: 0,
    price: 0,
    zipCode: 0,
    address: '',
    latitude: 0,
    longitude: 0,
    note: '',
    index: null,
    proximity: ''
};
const initialGeolocation = {
    coordinates: {
        latitude: 0,
        longitude: 0
    },
    loading: true,
    error: null
};
export interface EateriesState {
    initialData: EateryInterface[];
    eateries: { [index: number]: EateryInterface };
    initialFavoriteData: EateryInterface[];
    favorites: { [index: number]: EateryInterface };
    randomEatery: EateryInterface;
    history: EateryInterface[];
    shuffledIndexes: null | string[];
    noMoreEateries: boolean;
    geolocation: GeolocationInterface;
    geolocationFormatted: boolean;
}
const initialState: EateriesState = {
    initialData: data,
    eateries: cleanupData(data),
    initialFavoriteData: favoriteData,
    favorites: cleanupData(favoriteData),
    randomEatery: initialRandomEatery,
    history: [],
    shuffledIndexes: null,
    noMoreEateries: false,
    geolocation: initialGeolocation,
    geolocationFormatted: false
};

const eateriesSlice = createSlice({
    name: 'eateries',
    initialState,
    reducers: {
        createRandomEatery: (state) => {
            let shuffledIndexes = state.shuffledIndexes;
            if (!shuffledIndexes) {
                shuffledIndexes = shuffleEateries(Object.keys(state.eateries));
            }
            if (shuffledIndexes.length > 0) {
                const randomIndex = shuffledIndexes.pop();
                const eateries: EateriesInterface = { ...state.eateries };
                if (typeof randomIndex === 'string') {
                    const randomEatery = eateries[randomIndex];
                    randomEatery.index = randomIndex;
                    state.randomEatery = randomEatery;
                    state.shuffledIndexes = [...shuffledIndexes];
                }
            } else {
                state.randomEatery = initialRandomEatery;
            }
        },
        updateHistory: (state) => {
            if (state.randomEatery.name.length > 0) {
                const randomEatery = state.randomEatery;
                state.history.push(randomEatery);
            }
        },
        clearHistory: (state) => {
            state.history = [];
            state.shuffledIndexes = null;
            state.noMoreEateries = false;
        },
        checkIfEateriesAvailable: (state) => {
            const shuffledIndexes = state.shuffledIndexes;
            if (shuffledIndexes && shuffledIndexes.length === 0) {
                state.noMoreEateries = true;
                state.randomEatery = initialRandomEatery;
            }
        },
        clearRandomEatery: (state) => {
            state.randomEatery = initialRandomEatery;
        },
        updateGeolocationCoordinates: (state, action) => {
            state.geolocation.coordinates = action.payload;
        },
        updateGeolocationLoading: (state, action) => {
            state.geolocation.loading = action.payload;
        },
        updateGeolocationError: (state, action) => {
            state.geolocation.error = action.payload;
        },
        clearGeolocation: (state) => {
            state.geolocation = initialGeolocation;
        },
        formatRandomEateryProximity: (state) => {
            const { latitude, longitude } = state.geolocation.coordinates;
            const randomEatery = { ...state.randomEatery };
            const distance = calculateDistanceInMiles(
                randomEatery.latitude,
                randomEatery.longitude,
                latitude,
                longitude
            );
            randomEatery['proximity'] = calculateProximity(distance);
            state.randomEatery = randomEatery;
        },
        formatEateriesProximity: (state) => {
            const { latitude, longitude } = state.geolocation.coordinates;
            interface EateriesInterface {
                [key: string]: EateryInterface;
            }
            const eateries: EateriesInterface = { ...state.eateries };
            Object.keys(eateries).forEach((index) => {
                const eatery = eateries[index];
                const distance = calculateDistanceInMiles(
                    eatery.latitude,
                    eatery.longitude,
                    latitude,
                    longitude
                );
                eatery['proximity'] = calculateProximity(distance);
            });
            state.eateries = eateries;
        },
        formatHistoryProximity: (state) => {
            const { latitude, longitude } = state.geolocation.coordinates;
            const history = [...state.history];
            history.forEach((eatery) => {
                const distance = calculateDistanceInMiles(
                    eatery.latitude,
                    eatery.longitude,
                    latitude,
                    longitude
                );
                eatery['proximity'] = calculateProximity(distance);
            });
            state.history = history;
        },
        formatFavoriteProximity: (state) => {
            const { latitude, longitude } = state.geolocation.coordinates;
            interface FavoritesInterface {
                [key: string]: EateryInterface;
            }
            const favorites: FavoritesInterface = { ...state.favorites };
            Object.keys(favorites).forEach((index) => {
                const eatery = favorites[index];
                const distance = calculateDistanceInMiles(
                    eatery.latitude,
                    eatery.longitude,
                    latitude,
                    longitude
                );
                eatery['proximity'] = calculateProximity(distance);
            });
            state.favorites = favorites;
        },
        updateGeolocationFormatted: (state) => {
            if (!state.geolocationFormatted) state.geolocationFormatted = true;
        }
    }
});

export const {
    createRandomEatery,
    updateHistory,
    clearHistory,
    checkIfEateriesAvailable,
    clearRandomEatery,
    updateGeolocationCoordinates,
    updateGeolocationLoading,
    updateGeolocationError,
    clearGeolocation,
    formatRandomEateryProximity,
    formatEateriesProximity,
    formatHistoryProximity,
    formatFavoriteProximity,
    updateGeolocationFormatted
} = eateriesSlice.actions;
export default eateriesSlice.reducer;
