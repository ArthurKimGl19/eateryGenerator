import React from 'react';
import { screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import ChartGraph from '../ChartGraph';
import { cleanupData } from '../../../redux/helpers/eateriesFunctions';
import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import { renderWithProviders } from '../../../utils/test-utils';

const initialData = [
    {
        address: 'example address',
        latitude: 1,
        longitude: -1,
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
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const header = screen.getByRole('heading', {
            name: /eateries price data/i
        });
        expect(header).toBeInTheDocument();
    });
});
