import React from 'react';
import { screen } from '@testing-library/react';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import Randomizer from '../Randomizer';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Successfully renders randomizer component', () => {
    test('Renders the randomizer component', async () => {
        renderWithProviders(<Randomizer />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    noMoreEateries: false
                }
            }
        });

        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        expect(button).toBeInTheDocument();
    });
});
