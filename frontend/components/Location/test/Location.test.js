import { screen } from '@testing-library/react';

import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';

const initialGeolocation = {
    coordinates: { latitude: 0, longitude: 0 },
    loading: true,
    error: null
};

describe('Successfully renders location component', () => {
    test('Renders the location component', async () => {
        renderWithProviders(<Location />, {
            preloadedState: {
                geolocation: initialGeolocation
            }
        });

        const initialText = screen.getByText(/finding location/i);
        expect(initialText).toBeInTheDocument();
    });
});
