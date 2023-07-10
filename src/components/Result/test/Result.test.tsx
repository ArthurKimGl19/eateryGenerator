import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import Result from '../../Result/Result';
import { renderWithProviders } from '../../../utils/test-utils';

global ??= Object.create(window);
Object.defineProperty(window, 'open', { value: jest.fn() });

const initialRandomEatery = {
    name: 'example eatery 1',
    type: 'eatery type 1',
    rating: 1,
    price: 1,
    address: 'example address 1',
    zipCode: 1,
    note: 'example note 1',
    proximity: 'close',
    latitude: 1,
    longitude: -1
};

describe('Successfully renders result component', () => {
    test('Renders a result if a result is given', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    randomEatery: initialRandomEatery
                }
            }
        });

        const eatery = await screen.findByText(/example eatery/i);
        expect(eatery).toBeInTheDocument();
    });

    test('If result is present, clicking the directions button triggers showDirection', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    randomEatery: initialRandomEatery
                }
            }
        });

        const button = screen.getByRole('button', { name: /directions/i });
        expect(button).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(button);
        });
        const { latitude, longitude } = initialRandomEatery;
        expect(global.window.open).toHaveBeenCalledWith(
            `https://maps.google.com?q=${latitude},${longitude}`
        );
    });

    test('Renders no result if data is empty', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                eateries: {
                    ...initialState
                }
            }
        });

        const type = await screen.queryByText(/type/i);
        expect(type).not.toBeInTheDocument();

        const rating = await screen.queryByText(/rating/i);
        expect(rating).not.toBeInTheDocument();

        const price = await screen.queryByText(/price/i);
        expect(price).not.toBeInTheDocument();
    });
});
