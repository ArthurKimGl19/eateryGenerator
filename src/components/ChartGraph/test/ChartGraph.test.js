import { act, screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;
import userEvent from '@testing-library/user-event';

import ChartGraph from '../ChartGraph';
import { renderWithProviders } from '../../../utils/test-utils';
import { cleanupData } from '../../../redux/helpers/eateriesFunctions';

const initialData = [
    {
        address: 'example address',
        latitude: '1',
        longitude: '-1',
        name: 'example eatery',
        note: 'example note',
        price: 1,
        rating: 1,
        type: 'example type',
        zipCode: 9000
    }
];

describe('Successfully renders chart graph component', () => {
    test('Renders chart graph', () => {
        renderWithProviders(<ChartGraph label={'Eateries Price'} category={'price'} />, {
            preloadedState: {
                initialData: initialData,
                eateries: cleanupData(initialData)
            }
        });
        const header = screen.getByRole('heading', {
            name: /eateries price data/i
        });
        expect(header).toBeInTheDocument();
    });
});
