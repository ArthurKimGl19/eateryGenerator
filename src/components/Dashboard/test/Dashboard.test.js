import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dashboard from '../Dashboard';
import { renderWithProviders } from '../../../utils/test-utils';
import { cleanupData } from '../../../redux/helpers/eateriesFunctions';

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

describe('Successfully render homepage component', () => {
    test('Renders the header', () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation
            }
        });
        const header = screen.getByRole('heading', {
            name: /generate a random eatery to eat at!/i
        });
        expect(header).toBeInTheDocument();
    });

    test('Renders the randomize button', () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation
            }
        });
        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        expect(button).toBeInTheDocument();
    });

    test('Clicking randomize button generates a random eatery', async () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                randomEatery: initialRandomEatery,
                geolocation: initialGeolocation,
                geolocationFormatted: false,
                initialData: initialData,
                eateries: cleanupData(initialData),
                history: [],
                shuffledIndexes: null,
                noMoreEateries: false
            }
        });
        const button = screen.getByRole('button', {
            name: /randomize/i
        });
        await act(async () => {
            userEvent.click(button);
        });
        const newButton = await screen.findByRole('button', { name: /directions/i }); // assumes your button has "Click me" as text
        expect(newButton).toBeInTheDocument();

        const exampleName = await screen.findByText(/example eatery/i);
        expect(exampleName).toBeInTheDocument();
    });
});
