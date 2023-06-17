import { act, screen } from '@testing-library/react';

import Result from '../../Result/Result';
import { renderWithProviders } from '../../../utils/test-utils';
import { showDirections } from '../../../helpers/directionFunctions';
import History from '../../History/History';
import userEvent from '@testing-library/user-event';

jest.mock('../../../helpers/directionFunctions', () => ({
    showDirections: jest.fn()
}));

const latitude = '1';
const longitude = '-1';
const initialState = {
    address: 'example address',
    name: 'example eatery',
    note: 'example note',
    price: 1,
    rating: 1,
    type: 'example type',
    zipCode: 90001,
    coordinates: { latitude, longitude }
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
        renderWithProviders(<Result {...initialState} />);

        const eatery = await screen.findByText(/example eatery/i);
        expect(eatery).toBeInTheDocument();
    });

    test('If result is present, clicking the directions button triggers showDirection', async () => {
        renderWithProviders(<Result {...initialState} />);

        const button = screen.getByRole('button', { name: /directions/i });
        expect(button).toBeInTheDocument();

        await act(async () => {
            userEvent.click(button);
        });
        expect(showDirections).toHaveBeenCalledWith('1', '-1');
    });

    test('Renders no result if data is empty', async () => {
        renderWithProviders(<Result {...initialEmptyState} />);

        const type = await screen.queryByText(/type/i);
        expect(type).not.toBeInTheDocument();

        const rating = await screen.queryByText(/rating/i);
        expect(rating).not.toBeInTheDocument();

        const price = await screen.queryByText(/price/i);
        expect(price).not.toBeInTheDocument();
    });
});
