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
    zipCode: 0,
    address: '',
    latitude: 0,
    longitude: 0,
    note: '',
    index: null
};

const initialGeolocation = {
    coordinates: {
        latitude: 0,
        longitude: 0
    },
    loading: true,
    error: null
}

const initialState = {
    initialData: data,
    eateries: cleanupData(data),
    randomEatery: initialRandomEatery,
    history: [],
    shuffledIndexes: null,
    noMoreEateries: false,
    geolocation: initialGeolocation
};

const shuffleEateries = (array) => {
    // Fisher-Yates shuffle algo
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const calculateDistanceInMiles = function (lat1, lon1, lat2, lon2) {
    const earthRadiusInMiles = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusInMiles * c;
};

const toRadians = function (degrees) {
    return degrees * (Math.PI / 180);
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
                const randomEatery = state.eateries[randomIndex];
                randomEatery.index = randomIndex;
                state.randomEatery = randomEatery;
                state.shuffledIndexes = [...shuffledIndexes];
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
        removeFromEateries: (state, action) => {
            const index = action.payload;
            delete state.eateries[index];
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
    clearGeolocation
} = eateriesSlice.actions;
export default eateriesSlice.reducer;
/* eslint-disable prettier/prettier */
