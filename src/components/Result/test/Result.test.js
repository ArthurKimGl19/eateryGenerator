import { act, screen } from '@testing-library/react';

import Result from '../../Result/Result';
import { renderWithProviders } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

global.window = Object.create(window);
Object.defineProperty(window, 'open', { value: jest.fn() });

const initialState = {
    name: 'example eatery 1',
    type: 'eatery type 1',
    rating: 1,
    price: 1,
    zipCode: 1,
    address: 'example address 1',
    note: 'example note 1',
    proximity: 'close',
    latitude: '1',
    longitude: '-1'
};
const initialEmptyState = {
    name: '',
    type: '',
    rating: 0,
    price: 0,
    zipCode: 0,
    address: '',
    note: '',
    index: null,
    proximity: '',
    coordinates: { latitude: 0, longitude: 0 }
};

describe('Successfully renders result component', () => {
    test('Renders a result if a result is given', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                randomEatery: initialState
            }
        });

        const eatery = await screen.findByText(/example eatery/i);
        expect(eatery).toBeInTheDocument();
    });

    test('If result is present, clicking the directions button triggers showDirection', async () => {
        renderWithProviders(<Result />, {
            preloadedState: {
                randomEatery: initialState
            }
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
                randomEatery: initialEmptyState
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
