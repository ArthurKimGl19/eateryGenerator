import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { cleanupData } from '../../../redux/helpers/eateriesFunctions';
import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import Dashboard from '../Dashboard';
import { renderWithProviders } from '../../../utils/test-utils';

const initialData = [
    {
        address: 'example address',
        latitude: 1,
        longitude: -1,
        name: 'example eatery',
        note: 'example note',
        price: 1,
        rating: 1,
        type: 'example type',
        zipCode: 9000
    }
];

describe('Successfully renders dashboard component', () => {
    test('Renders the header', () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                eateries: {
                    ...initialState
                }
            }
        });

        const header = screen.getByRole('heading', {
            name: /generate a random eatery to eat at!/i
        });
        expect(header).toBeInTheDocument();
    });

    test('Renders the randomize button', () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                eateries: {
                    ...initialState
                }
            }
        });

        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        expect(button).toBeInTheDocument();
    });

    test('Clicking randomize button generates a random eatery', async () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        await act(async () => {
            userEvent.click(button);
        });

        const newButton = await screen.findByRole('button', { name: /directions/i }); // assumes your button has "Click me" as text
        expect(newButton).toBeInTheDocument();

        const exampleName = await screen.findByText(/example eatery/i);
        expect(exampleName).toBeInTheDocument();
    });
});
