import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EateryInterface } from '../../../shared/interfaces/eatery.interface';
import { renderWithProviders } from '../../../utils/test-utils';
import Sort from '../../Sort/Sort';

const eateries: EateryInterface[] = [];
const setEateries = () => {};

describe('Successfully renders sort component', () => {
    test('Renders sort component with correct options', async () => {
        renderWithProviders(<Sort eateries={eateries} setEateries={setEateries} />);

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        expect(sort).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(sort);
        });
        const names = screen.getAllByRole('button', {
            name: /name/i
        });
        expect(names).toHaveLength(2);

        const prices = screen.getAllByRole('button', {
            name: /price/i
        });
        expect(prices).toHaveLength(2);

        const ratings = screen.getAllByRole('button', {
            name: /rating/i
        });
        expect(ratings).toHaveLength(2);

        const types = screen.getAllByRole('button', {
            name: /type/i
        });
        expect(types).toHaveLength(2);

        const zipCodes = screen.getAllByRole('button', {
            name: /zip code/i
        });
        expect(zipCodes).toHaveLength(2);
    });
});
