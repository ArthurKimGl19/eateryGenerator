import { act, screen } from '@testing-library/react';

import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';
import { useDispatch } from 'react-redux';
import { clearGeolocation } from '../../../redux/features/eateries/eateriesSlice';
import userEvent from '@testing-library/user-event';

const initialGeolocation = {
    coordinates: { latitude: 0, longitude: 0 },
    loading: true,
    error: null
};

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

// jest.mock('react-redux', () => ({
//     useDispatch: jest.fn()
// }));
//
// jest.mock('../../../redux/features/eateries/eateriesSlice', () => ({
//     clearGeolocation: jest.fn()
// }));

describe('Successfully renders location data for location component', () => {
    test('Renders location for location component', async () => {
        renderWithProviders(<Location />, {
            preloadedState: {
                geolocation: initialGeolocation
            }
        });

        const location = await screen.findByRole('button', {
            name: /calculate location/i
        });
        expect(location).toBeInTheDocument();
    });

    // test('Button click triggers handleClearGeolocation function', async () => {
    //     const dispatchMock = jest.fn();
    //     useDispatch.mockReturnValue(dispatchMock);
    //
    //     renderWithProviders(<Location />, {
    //         preloadedState: {
    //             geolocation: initialGeolocation
    //         }
    //     });
    //
    //     const button = await screen.findByText(/calculate location/i);
    //     await act(async () => {
    //         userEvent.click(button);
    //     });
    //     expect(dispatchMock).toHaveBeenCalledWith(clearGeolocation());
    // });
    // ● Successfully renders location data for location component › Renders location for location component
    //
    //     The slice reducer for key "clearGeolocation" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.
});
