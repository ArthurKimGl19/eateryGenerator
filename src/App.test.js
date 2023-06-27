import { act, screen } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;
import userEvent from '@testing-library/user-event';

import App from './App';
import { renderWithProviders } from './utils/test-utils';
import { cleanupData } from './redux/helpers/eateriesFunctions';

const initialRandomEatery = {
    name: '',
    type: '',
    rating: 0,
    price: 0,
    zipCode: 0,
    address: '',
    latitude: 0,
    longitude: 0,
    note: '',
    index: null,
    proximity: ''
};

const initialGeolocation = {
    coordinates: {
        latitude: 0,
        longitude: 0
    },
    loading: true,
    error: null
};

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

const initialHistory = [
    {
        address: 'example address',
        latitude: '1',
        longitude: '-1',
        name: 'example eatery',
        note: 'example note',
        price: 1,
        rating: 1,
        type: 'example type',
        zipCode: 90001
    }
];

describe('Successfully renders app component', () => {
    test('Renders the fallback loading component', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation
            }
        });
        const loading = await screen.findByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });

    test('Renders app', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation
            }
        });
        await act(async () => {
            const header = screen.getByRole('heading', {
                name: /generate a random eatery to eat at/i
            });
            expect(header).toBeInTheDocument();
        });
    });

    test('Clicking navbar history option renders history component', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation,
                history: initialHistory
            }
        });
        const history = screen.getByRole('link', { name: /history/i });
        expect(history).toBeInTheDocument();

        await act(async () => {
            userEvent.click(history);
        });
        const header = screen.getByRole('heading', {
            name: /history/i
        });
        expect(header).toBeInTheDocument();
    });

    test('Clicking navbar eateries option renders eateries component', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation,
                initialData: initialData,
                eateries: cleanupData(initialData),
                history: initialHistory
            }
        });
        const eateries = screen.getByRole('link', { name: /eateries/i });
        expect(eateries).toBeInTheDocument();

        await act(async () => {
            userEvent.click(eateries);
        });
        const header = screen.getByRole('heading', {
            name: /eateries/i
        });
        expect(header).toBeInTheDocument();
    });

    test('Clicking navbar data option renders data component', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation,
                initialData: initialData,
                eateries: cleanupData(initialData),
                history: initialHistory
            }
        });
        const data = screen.getByRole('link', { name: /data/i });
        expect(data).toBeInTheDocument();

        await act(async () => {
            userEvent.click(data);
        });
        const typeHeader = screen.getByRole('heading', {
            name: /eateries type data/i
        });
        expect(typeHeader).toBeInTheDocument();
        const priceHeader = screen.getByRole('heading', {
            name: /eateries price data/i
        });
        expect(priceHeader).toBeInTheDocument();
    });

    test('Clicking navbar favorites option renders favorites component', async () => {
        renderWithProviders(<App />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation,
                initialData: initialData,
                eateries: cleanupData(initialData),
                history: initialHistory,
                favorites: cleanupData(initialData)
            }
        });
        const favorites = screen.getByRole('link', { name: /favorites/i });
        expect(favorites).toBeInTheDocument();

        await act(async () => {
            userEvent.click(favorites);
        });
        const header = screen.getByRole('heading', {
            name: /favorites/i
        });
        expect(header).toBeInTheDocument();
    });
});
