import React from 'react';
import { screen } from '@testing-library/react';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';

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
                eateries: {
                    ...initialState
                }
            }
        });

        const error = await screen.findByText(/failed to get coordinates/i);
        expect(error).toBeInTheDocument();
    });
});
