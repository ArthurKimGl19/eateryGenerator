import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { useGeolocation } from '../useGeolocation';

import {
    updateGeolocationCoordinates,
    updateGeolocationLoading,
    updateGeolocationError
} from '../../redux/features/eateries/eateriesSlice';
import { renderHookWithProviders } from '../../utils/test-utils';

const mockStore = configureMockStore();
const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

beforeEach(() => {
    (global as any).navigator.geolocation = mockGeolocation;
});

describe('Test useGeolocation hook', () => {
    test('Handle when navigator geolocation is not present', () => {
        jest.useFakeTimers();
        const preloadedState = {
            eateries: {
                geolocation: {
                    coordinates: null,
                    loading: true,
                    error: null
                }
            }
        };
        const store = mockStore(preloadedState);

        (global as any).navigator.geolocation = null;
        renderHookWithProviders(() => useGeolocation(), {
            wrapper: ({ children }) =>
                React.createElement(Provider, { store: store, children: children })
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
            eateries: {
                geolocation: {
                    coordinates: null,
                    loading: true,
                    error: null
                }
            }
        };
        const store = mockStore(preloadedState);

        mockGeolocation.getCurrentPosition = jest.fn()
            .mockImplementationOnce((success) =>
                Promise.resolve(
                    success({
                        coords: {
                            latitude: 1,
                            longitude: -1
                        }
                    })
                )
            );
        renderHookWithProviders(() => useGeolocation(), {
            wrapper: ({ children }) =>
                React.createElement(Provider, { store: store, children: children })
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
            eateries: {
                geolocation: {
                    coordinates: null,
                    loading: true,
                    error: null
                }
            }
        };
        const store = mockStore(preloadedState);

        mockGeolocation.getCurrentPosition = jest.fn()
            .mockImplementationOnce((successCallback, errorCallback) => {
                    errorCallback();
                })

        renderHookWithProviders(() => useGeolocation(), {
            wrapper: ({ children }) =>
                React.createElement(Provider, { store: store, children: children })
        });

        jest.advanceTimersByTime(2000);
        const actions = store.getActions();
        expect(actions).toContainEqual(updateGeolocationError('Unable to retrieve your location'));
        jest.useRealTimers();
    });
});
