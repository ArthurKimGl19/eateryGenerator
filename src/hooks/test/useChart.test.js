import { renderHook } from '@testing-library/react';
import { useChart } from '../useChart';

const initialData = [
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
        latitude: '2',
        longitude: '-2',
        name: 'example eatery 2',
        note: 'example note 2',
        price: 2,
        rating: 2,
        type: 'example type 2',
        zipCode: 90002
    },
    {
        address: 'example address 3',
        latitude: '3',
        longitude: '-3',
        name: 'example eatery 3',
        note: 'example note 3',
        price: 3,
        rating: 3,
        type: 'example type 3',
        zipCode: 90003
    },
    {
        address: 'example address 4',
        latitude: '4',
        longitude: '-4',
        name: 'example eatery 4',
        note: 'example note 4',
        price: 4,
        rating: 4,
        type: 'example type 4',
        zipCode: 90004
    }
];

describe('Test useChart hook', () => {
    test('Return correct labels and counts for type', () => {
        const { result } = renderHook(() => useChart('type', initialData));
        const { labels, counts } = result.current;
        expect(labels).toEqual([
            'Example type 1',
            'Example type 2',
            'Example type 3',
            'Example type 4'
        ]);
        expect(counts).toEqual([1, 1, 1, 1]);
    });

    test('Return correct labels and counts for price', () => {
        const { result } = renderHook(() => useChart('price', initialData));
        const { labels, counts } = result.current;
        expect(labels).toEqual(['$', '$$', '$$$', '$$$$']);
        expect(counts).toEqual([1, 1, 1, 1]);
    });
});
