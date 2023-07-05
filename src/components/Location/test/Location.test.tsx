import React from 'react';
import { screen } from '@testing-library/react';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import Location from '../Location';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Successfully renders location component', () => {
    test('Renders the location component', async () => {
        renderWithProviders(<Location />, {
            preloadedState: {
                eateries: {
                    ...initialState
                }
            }
        });

        const initialText = screen.getByText(/finding location/i);
        expect(initialText).toBeInTheDocument();
    });
});
