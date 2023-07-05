import { saveState } from '../../helpers/localStorageFunctions';
import { setupStore } from '../store';
import { updateGeolocationError } from '../features/eateries/eateriesSlice';

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

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.mock('../../helpers/localStorageFunctions', () => ({
    saveState: jest.fn(),
    loadState: jest.fn()
}));

describe('Test redux store', () => {
    beforeEach(() => {
        // Clear any previous calls to console.log and saveState
        (console.log as jest.Mock).mockClear();
        (saveState as jest.Mock).mockClear();
    });
    test('Redux store is created with initial state', () => {
        const store = setupStore();
        expect(store).toBeDefined();

        const initialState = store.getState();
        expect(initialState.eateries.randomEatery).toEqual(initialRandomEatery);
        expect(initialState.eateries.geolocation).toEqual(initialGeolocation);
        expect(initialState.eateries.shuffledIndexes).toEqual(null);
        expect(initialState.eateries.noMoreEateries).toEqual(false);
        expect(initialState.eateries.geolocationFormatted).toEqual(false);
    });

    test('Updating state calls console.log and saveState', () => {
        const store = setupStore();
        store.dispatch(updateGeolocationError('Mock error'));
        expect(console.log).toHaveBeenCalledWith('redux store data', store.getState());
        expect(saveState).toHaveBeenCalledWith(store.getState());
    });
});
