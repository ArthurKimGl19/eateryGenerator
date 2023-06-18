import { loadState, saveState } from '../localStorageFunctions';

describe('Test localStorageFunctions', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('LoadState returns undefined when localStorage is empty', () => {
        const state = loadState();
        expect(state).toBe(undefined);
    });

    test('LoadState returns parsed state from localStorage', () => {
        const mockState = {
            eateries: []
        };
        localStorage.setItem('appState', JSON.stringify(mockState));
        const state = loadState();
        expect(state).toEqual(mockState);
    });

    test('SaveState saves state to localStorage', () => {
        const mockState = {
            eateries: []
        };
        saveState(mockState);
        const storedState = localStorage.getItem('appState');
        expect(JSON.parse(storedState)).toEqual(mockState);
    });

    test('SaveState logs an error if an exception occurs', () => {
        console.error = jest.fn();
        const mockState = { circularReference: {} };
        mockState.circularReference.self = mockState.circularReference;
        saveState(mockState);
        expect(console.error).toHaveBeenCalled();
    });
});
