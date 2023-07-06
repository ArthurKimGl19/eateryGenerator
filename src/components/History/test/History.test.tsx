import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import History from '../History';
import { renderWithProviders } from '../../../utils/test-utils';
import { showDirections } from '../../../helpers/directionFunctions';

jest.mock('../../../helpers/directionFunctions', () => ({
    showDirections: jest.fn()
}));

const initialHistory = [
    {
        address: 'example address',
        latitude: 1,
        longitude: -1,
        name: 'example eatery',
        note: 'example note',
        price: 1,
        rating: 1,
        type: 'example type',
        zipCode: 90001
    }
];

describe('Successfully renders history component', () => {
    test('Renders the header', () => {
        renderWithProviders(<History />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    history: initialHistory
                }
            }
        });

        const header = screen.getByRole('heading', {
            name: /history/i
        });
        expect(header).toBeInTheDocument();
    });

    test('Renders the clear history button', () => {
        renderWithProviders(<History />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    history: initialHistory
                }
            }
        });

        const button = screen.getByRole('button', {
            name: /clear history/i
        });
        expect(button).toBeInTheDocument();
    });

    test('Clicking clear history button clears current history', async () => {
        renderWithProviders(<History />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    history: initialHistory
                }
            }
        });

        const button = screen.getByRole('button', {
            name: /clear history/i
        });
        const exampleName = await screen.findByText(/example eatery/i);
        expect(exampleName).toBeInTheDocument();

        await act(async () => {
            userEvent.click(button);
        });
        expect(exampleName).not.toBeInTheDocument();
    });

    test('Clicking the directions icon triggers showDirection', async () => {
        renderWithProviders(<History />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    history: initialHistory
                }
            }
        });

        const location = screen.getByTitle(/directions icon/i);
        expect(location).toBeInTheDocument();

        await act(async () => {
            userEvent.click(location);
        });
        expect(showDirections).toHaveBeenCalledWith(1, -1);
    });
});
