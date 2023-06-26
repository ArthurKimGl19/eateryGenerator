import { screen } from '@testing-library/react';

import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';

const initialGeolocation = {
    coordinates: { latitude: 0, longitude: 0 },
    loading: true,
    error: null
};

jest.mock('../../../hooks/useGeolocation', () => ({
    useGeolocation: () => ({
        coordinates: {
            latitude: 0,
            longitude: 0
        },
        loading: false,
        error: 'Failed to get coordinates'
    })
}));

describe('Successfully renders location data for location component', () => {
    test('Renders error for location component', async () => {
        renderWithProviders(<Location />, {
            preloadedState: {
                geolocation: initialGeolocation
            }
        });

        const error = await screen.findByText(/failed to get coordinates/i);
        expect(error).toBeInTheDocument();
    });
});
