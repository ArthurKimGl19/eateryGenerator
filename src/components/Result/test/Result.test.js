import React from 'react';
import { act, screen } from '@testing-library/react';

import Result from '../../Result/Result';
import { renderWithProviders } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

// if (!(global as any).window) {
//     (global as any).window = Object.create(window);
// }
global.window ??= Object.create(window);
Object.defineProperty(window, 'open', { value: jest.fn() });

// interface InitialState {
//     name: string;
//     type: string;
//     rating: number;
//     price: number;
//     address: string;
//     zipCode: number;
//     note?: string;
//     proximity?: string;
//     latitude: number;
//     longitude: number;
// }
//
// interface InitialEmptyState {
//     name: string;
//     type: string;
//     rating: number;
//     price: number;
//     address: string;
//     zipCode: number;
//     note?: string;
//     proximity?: string;
//     coordinates: {
//         latitude: number;
//         longitude: number;
//     };
// }

const initialState = {
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
const initialEmptyState = {
    name: '',
    type: '',
    rating: 0,
    price: 0,
    address: '',
    zipCode: 0,
    note: '',
    proximity: '',
    coordinates: { latitude: 0, longitude: 0 }
};

describe('Successfully renders result component', () => {
    test('Renders a result if a result is given', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                eateries: {
                    randomEatery: initialState
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
                    randomEatery: initialState
                }            }
        });

        const button = screen.getByRole('button', { name: /directions/i });
        expect(button).toBeInTheDocument();

        await act(async () => {
            userEvent.click(button);
        });
        const { latitude, longitude } = initialState;
        expect(global.window.open).toHaveBeenCalledWith(
            `https://maps.google.com?q=${latitude},${longitude}`
        );
    });

    test('Renders no result if data is empty', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                eateries: {
                    randomEatery: initialEmptyState
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
