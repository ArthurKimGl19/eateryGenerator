import { screen } from '@testing-library/react';

import Randomizer from '../Randomizer';
import { renderWithProviders } from '../../../utils/test-utils';

const randomizeEatery = () => {};

describe('Successfully renders randomizer component', () => {
    test('Renders the randomizer component', async () => {
        renderWithProviders(<Randomizer randomizeEatery={randomizeEatery} />, {
            preloadedState: {
                noMoreEateries: false
            }
        });
        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        expect(button).toBeInTheDocument();
    });
});
