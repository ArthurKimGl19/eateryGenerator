import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';

import Filters from '../../Filters/Filters';

const eateries = [
    {
        address: 'example address 1',
        latitude: '1',
        longitude: '-1',
        name: 'example eatery 1',
        note: 'example note 1',
        price: 1,
        rating: 1,
        type: 'example type 1',
        zipCode: 90001
    },
    {
        address: 'example address 2',
        latitude: '1',
        longitude: '-1',
        name: 'example eatery 2',
        note: 'example note 2',
        price: 2,
        rating: 3,
        type: 'example type 2',
        zipCode: 90002
    },
    {
        address: 'example address 3',
        latitude: '1',
        longitude: '-1',
        name: 'example eatery 3',
        note: 'example note 3',
        price: 3,
        rating: 3,
        type: 'example type 3',
        zipCode: 90003
    }
];

const setEateries = () => {};
const initialEateries = [];

describe('Successfully render filters component', () => {
    test('Renders filter component, correct button drop downs, and clear button', () => {
        renderWithProviders(
            <Filters
                eateries={eateries}
                setEateries={setEateries}
                initialEateries={initialEateries}
            />
        );
        const header = screen.getByRole('heading', {
            name: /filters/i
        });
        expect(header).toBeInTheDocument();
        const type = screen.getByRole('button', {
            name: /type/i
        });
        expect(type).toBeInTheDocument();
        const price = screen.getByRole('button', {
            name: /price/i
        });
        expect(price).toBeInTheDocument();
        const proximity = screen.getByRole('button', {
            name: /proximity/i
        });
        expect(proximity).toBeInTheDocument();
        const clear = screen.getByRole('button', {
            name: /clear/i
        });
        expect(clear).toBeInTheDocument();
    });
    test('Renders correct options for type drop down', async () => {
        renderWithProviders(
            <Filters
                eateries={eateries}
                setEateries={setEateries}
                initialEateries={initialEateries}
            />
        );
        const type = screen.getByRole('button', {
            name: /type/i
        });
        expect(type).toBeInTheDocument();
        await act(async () => {
            userEvent.click(type);
        });

        const optionOne = screen.getByRole('button', {
            name: /example type 1/i
        });
        expect(optionOne).toBeInTheDocument();
        const optionTwo = screen.getByRole('button', {
            name: /example type 2/i
        });
        expect(optionTwo).toBeInTheDocument();
        const optionThree = screen.getByRole('button', {
            name: /example type 3/i
        });
        expect(optionThree).toBeInTheDocument();
    });

    test('Renders correct options for price drop down', async () => {
        renderWithProviders(
            <Filters
                eateries={eateries}
                setEateries={setEateries}
                initialEateries={initialEateries}
            />
        );
        const price = screen.getByRole('button', {
            name: /price/i
        });
        expect(price).toBeInTheDocument();
        await act(async () => {
            userEvent.click(price);
        });

        const optionOne = screen.getByRole('button', {
            name: '$'
        });
        expect(optionOne).toBeInTheDocument();
        const optionTwo = screen.getByRole('button', {
            name: '$$'
        });
        expect(optionTwo).toBeInTheDocument();
        const optionThree = screen.getByRole('button', {
            name: '$$$'
        });
        expect(optionThree).toBeInTheDocument();
    });
});
