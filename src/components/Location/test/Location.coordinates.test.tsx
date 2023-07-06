import React from 'react';
import { act, screen, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import { clearGeolocation } from '../../../redux/features/eateries/eateriesSlice';
import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';

jest.mock('../../../hooks/useGeolocation', () => ({
    useGeolocation: () => ({
        coordinates: {
            latitude: 1,
            longitude: -1
        },
        loading: false,
        error: null
    })
}));

const mockStore = configureMockStore();

describe('Successfully renders location data for location component', () => {
    test('Renders location for location component', async () => {
        renderWithProviders(<Location />, {
            preloadedState: {
                eateries: {
                    ...initialState
                }
            }
        });

        const location = await screen.findByRole('button', {
            name: /calculate location/i
        });
        expect(location).toBeInTheDocument();
    });

    test('Button click triggers handleClearGeolocation function', async () => {
        const preloadedState = {
            geolocation: {
                coordinates: null,
                loading: true,
                error: null
            }
        };
        const store = mockStore(preloadedState);

        render(
            <Provider store={store}>
                <Location />
            </Provider>
        );

        const button = await screen.findByText(/calculate location/i);
        await act(async () => {
            userEvent.click(button);
        });
        const actions = store.getActions();
        expect(actions).toContainEqual(clearGeolocation());
    });
});
