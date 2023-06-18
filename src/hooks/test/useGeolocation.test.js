import { renderHook } from '@testing-library/react';
import { useGeolocation } from '../useGeolocation';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {
    updateGeolocationCoordinates,
    updateGeolocationLoading,
    updateGeolocationError
} from '../../redux/features/eateries/eateriesSlice';

const mockStore = configureMockStore();

describe('Test useGeolocation hook', () => {
    test('Handle when navigator geolocation is not present', () => {
        jest.useFakeTimers();
        const preloadedState = {
            geolocation: {
                coordinates: null,
                loading: true,
                error: null
            }
        };
        const store = mockStore(preloadedState);

        global.navigator.geolocation = null;
        renderHook(() => useGeolocation(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        jest.advanceTimersByTime(2000);
        const actions = store.getActions();
        expect(actions).toContainEqual(
            updateGeolocationError('Geolocation is not supported by your browser')
        );
        jest.useRealTimers();
    });

    test('Handle when coordinates are received', () => {
        jest.useFakeTimers();
        const preloadedState = {
            geolocation: {
                coordinates: null,
                loading: true,
                error: null
            }
        };
        const store = mockStore(preloadedState);

        global.navigator.geolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
                Promise.resolve(
                    success({
                        coords: {
                            latitude: 1,
                            longitude: -1
                        }
                    })
                )
            )
        };
        renderHook(() => useGeolocation(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        jest.advanceTimersByTime(2000);
        const actions = store.getActions();
        expect(actions).toContainEqual(
            updateGeolocationCoordinates({ latitude: 1, longitude: -1 })
        );
        expect(actions).toContainEqual(updateGeolocationLoading(false));
        jest.useRealTimers();
    });

    test('Handle when coordinates are not received', () => {
        jest.useFakeTimers();
        const preloadedState = {
            geolocation: {
                coordinates: null,
                loading: true,
                error: null
            }
        };
        const store = mockStore(preloadedState);

        global.navigator.geolocation = {
            getCurrentPosition: jest
                .fn()
                .mockImplementationOnce((successCallback, errorCallback) => {
                    errorCallback();
                })
        };
        renderHook(() => useGeolocation(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        jest.advanceTimersByTime(2000);
        const actions = store.getActions();
        expect(actions).toContainEqual(updateGeolocationError('Unable to retrieve your location'));
        jest.useRealTimers();
    });
});
