import { cleanupData } from '../../redux/helpers/eateriesFunctions';

const initialData = [
    {
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
    }
];
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
export const initialState = {
    initialData,
    eateries: cleanupData(initialData),
    initialFavoriteData: initialData,
    favorites: cleanupData(initialData),
    randomEatery: initialRandomEatery,
    history: [],
    shuffledIndexes: null,
    noMoreEateries: false,
    geolocation: initialGeolocation,
    geolocationFormatted: false
};
