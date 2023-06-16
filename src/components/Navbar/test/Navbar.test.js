import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../Navbar';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Successfully renders navbar component', () => {
    test('Renders navbar', () => {
        renderWithProviders(
            <MemoryRouter initialEateries={['/']} initialIndex={0}>
                <Navbar />
            </MemoryRouter>
        );
        const title = screen.queryByText(/eatery generator/i);
        expect(title).toBeInTheDocument();
        const home = screen.getByRole('link', { name: /home/i });
        expect(home).toBeInTheDocument();
        const history = screen.getByRole('link', { name: /history/i });
        expect(history).toBeInTheDocument();
        const eateries = screen.getByRole('link', { name: /eateries/i });
        expect(eateries).toBeInTheDocument();
        const data = screen.getByRole('link', { name: /data/i });
        expect(data).toBeInTheDocument();
        const favorites = screen.getByRole('link', { name: /favorites/i });
        expect(favorites).toBeInTheDocument();
    });
});
