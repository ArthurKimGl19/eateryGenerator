import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initialState } from '../../../shared/reduxState/reduxState.eateries';
import { cleanupData } from '../../../redux/helpers/eateriesFunctions';
import Eateries from '../Eateries';
import { renderWithProviders } from '../../../utils/test-utils';
import { showDirections } from '../../../helpers/directionFunctions';

jest.mock('../../../helpers/directionFunctions', () => ({
    showDirections: jest.fn()
}));

const initialData = [
    {
        address: 'example address 1',
        latitude: 1,
        longitude: -1,
        name: 'example eatery 1',
        note: 'example note 1',
        price: 1,
        rating: 1,
        type: 'example type 1',
        zipCode: 90001
    },
    {
        address: 'example address 2',
        latitude: 2,
        longitude: -2,
        name: 'example eatery 2',
        note: 'example note 2',
        price: 2,
        rating: 2,
        type: 'example type 2',
        zipCode: 90002
    },
    {
        address: 'example address 3',
        latitude: 3,
        longitude: -3,
        name: 'example eatery 3',
        note: 'example note 3',
        price: 3,
        rating: 3,
        type: 'example type 3',
        zipCode: 90003
    },
    {
        address: 'example address 4',
        latitude: 4,
        longitude: -4,
        name: 'example eatery 4',
        note: 'example note 4',
        price: 4,
        rating: 4,
        type: 'example type 4',
        zipCode: 90004
    },
    {
        address: 'example address 5',
        latitude: 5,
        longitude: -5,
        name: 'example eatery 5',
        note: 'example note 5',
        price: 4,
        rating: 5,
        type: 'example type 4',
        zipCode: 90005
    }
];
const initialOneEntry = [initialData[0]];

describe('Successfully renders eateries component', () => {
    test('Renders the header and checks eateries count', () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const header = screen.getByRole('heading', {
            name: /eateries/i
        });
        expect(header).toBeInTheDocument();

        const count = screen.getByRole('heading', {
            name: /(5)/i
        });
        expect(count).toBeInTheDocument();
    });

    test('Check to see that eateries data renders', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const eateryOne = await screen.findByText(/example eatery 1/i);
        expect(eateryOne).toBeInTheDocument();

        const eateryTwo = await screen.findByText(/example eatery 2/i);
        expect(eateryTwo).toBeInTheDocument();
    });

    test('Clicking the directions icon triggers showDirection', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialOneEntry)
                }
            }
        });

        const location = screen.getByTitle(/directions icon/i);
        expect(location).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(location);
        });
        expect(showDirections).toHaveBeenCalledWith(1, -1);
    });

    test('Test selecting type and price filter options and clear button', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const type = screen.getByRole('button', {
            name: /type/i
        });
        await act(async () => {
            await userEvent.click(type);
        });

        const typeOptionsOne = screen.getByRole('button', {
            name: /example type 1/i
        });
        await act(async () => {
            await userEvent.click(typeOptionsOne);
        });

        const typeOneElements = await screen.findAllByText(/example type 1/i);
        //elements are in drop down menu, selected drop down menu option, rendered eatery
        expect(typeOneElements).toHaveLength(3);

        const typeTwoElements = await screen.queryByText(/example type 2/i);
        expect(typeTwoElements).not.toBeInTheDocument();

        const clear = screen.getByRole('button', {
            name: /clear/i
        });
        await act(async () => {
            await userEvent.click(clear);
        });

        const price = screen.getByRole('button', {
            name: /price/i
        });
        await act(async () => {
            await userEvent.click(price);
        });

        const priceOptionTwo = screen.getByRole('button', {
            name: '$$'
        });
        await act(async () => {
            await userEvent.click(priceOptionTwo);
        });

        const priceTwoElements = await screen.findAllByText('$$');
        //elements are in drop down menu, selected drop down menu option, rendered eatery
        expect(priceTwoElements).toHaveLength(3);

        const priceOneElements = await screen.queryByText('$');
        expect(priceOneElements).not.toBeInTheDocument();
    });

    test('Price filters work properly after price options are selected', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        //click price options and press clear to check if they are working correctly
        const price = screen.getByRole('button', {
            name: /price/i
        });
        await act(async () => {
            await userEvent.click(price);
        });
        const priceOptionOne = screen.getByRole('button', {
            name: '$'
        });
        await act(async () => {
            await userEvent.click(priceOptionOne);
        });
        const priceOneElements = await screen.findAllByText('$');
        //elements are in drop down menu, selected drop down menu option, rendered eatery
        expect(priceOneElements).toHaveLength(3);

        const clear = screen.getByRole('button', {
            name: /clear/i
        });
        await act(async () => {
            await userEvent.click(clear);
        });

        await act(async () => {
            await userEvent.click(price);
        });
        const priceOptionThree = screen.getByRole('button', {
            name: '$$$'
        });
        await act(async () => {
            await userEvent.click(priceOptionThree);
        });
        const priceThreeElements = await screen.findAllByText('$$$');
        //elements are in drop down menu, selected drop down menu option, rendered eatery
        expect(priceThreeElements).toHaveLength(3);
        await act(async () => {
            await userEvent.click(clear);
        });
    });

    test('Renders sort component', () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        expect(sort).toBeInTheDocument();
    });

    test('Test sort component functionality for name ascending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const nameAscending = screen.getByRole('button', {
            name: /name sort ascending icon/i
        });
        await act(async () => {
            await userEvent.click(nameAscending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryOneIndex = tdElements.findIndex((text) => text === 'example eatery 1');
        const eateryTwoIndex = tdElements.findIndex((text) => text === 'example eatery 2');
        expect(eateryOneIndex).toBeLessThan(eateryTwoIndex);
    });

    test('Test sort component functionality for name descending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const nameDescending = screen.getByRole('button', {
            name: /name sort descending icon/i
        });
        await act(async () => {
            await userEvent.click(nameDescending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryTwoIndex = tdElements.findIndex((text) => text === 'example eatery 2');
        const eateryOneIndex = tdElements.findIndex((text) => text === 'example eatery 1');
        expect(eateryTwoIndex).toBeLessThan(eateryOneIndex);
    });

    test('Test sort component functionality for price ascending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const priceAscending = screen.getByRole('button', {
            name: /price sort ascending icon/i
        });
        await act(async () => {
            await userEvent.click(priceAscending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryOneIndex = tdElements.findIndex((text) => text === '1');
        const eateryTwoIndex = tdElements.findIndex((text) => text === '2');
        expect(eateryOneIndex).toBeLessThan(eateryTwoIndex);
    });

    test('Test sort component functionality for price descending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const priceDescending = screen.getByRole('button', {
            name: /price sort descending icon/i
        });
        await act(async () => {
            await userEvent.click(priceDescending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryTwoIndex = tdElements.findIndex((text) => text === '2');
        const eateryOneIndex = tdElements.findIndex((text) => text === '1');
        expect(eateryTwoIndex).toBeLessThan(eateryOneIndex);
    });

    test('Test sort component functionality for rating ascending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const ratingAscending = screen.getByRole('button', {
            name: /rating sort ascending icon/i
        });
        await act(async () => {
            await userEvent.click(ratingAscending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryOneIndex = tdElements.findIndex((text) => text === '1');
        const eateryTwoIndex = tdElements.findIndex((text) => text === '2');
        expect(eateryOneIndex).toBeLessThan(eateryTwoIndex);
    });

    test('Test sort component functionality for rating descending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const ratingDescending = screen.getByRole('button', {
            name: /rating sort descending icon/i
        });
        await act(async () => {
            await userEvent.click(ratingDescending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryTwoIndex = tdElements.findIndex((text) => text === '2');
        const eateryOneIndex = tdElements.findIndex((text) => text === '1');
        expect(eateryTwoIndex).toBeLessThan(eateryOneIndex);
    });

    test('Test sort component functionality for type ascending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const typeAscending = screen.getByRole('button', {
            name: /type sort ascending icon/i
        });
        await act(async () => {
            await userEvent.click(typeAscending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryOneIndex = tdElements.findIndex((text) => text === 'example type 1');
        const eateryTwoIndex = tdElements.findIndex((text) => text === 'example type 2');
        expect(eateryOneIndex).toBeLessThan(eateryTwoIndex);
    });

    test('Test sort component functionality for type descending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const typeDescending = screen.getByRole('button', {
            name: /type sort descending icon/i
        });
        await act(async () => {
            await userEvent.click(typeDescending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryTwoIndex = tdElements.findIndex((text) => text === 'example type 2');
        const eateryOneIndex = tdElements.findIndex((text) => text === 'example type 1');
        expect(eateryTwoIndex).toBeLessThan(eateryOneIndex);
    });

    test('Test sort component functionality for zip code ascending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const zipCodeAscending = screen.getByRole('button', {
            name: /zip code sort ascending icon/i
        });
        await act(async () => {
            await userEvent.click(zipCodeAscending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryOneIndex = tdElements.findIndex((text) => text === '90001');
        const eateryTwoIndex = tdElements.findIndex((text) => text === '90002');
        expect(eateryOneIndex).toBeLessThan(eateryTwoIndex);
    });

    test('Test sort component functionality for zip code descending', async () => {
        renderWithProviders(<Eateries />, {
            preloadedState: {
                eateries: {
                    ...initialState,
                    initialData: initialData,
                    eateries: cleanupData(initialData)
                }
            }
        });

        const sort = screen.getByRole('button', {
            name: /sort/i
        });
        await act(async () => {
            await userEvent.click(sort);
        });

        const zipCodeDescending = screen.getByRole('button', {
            name: /zip code sort descending icon/i
        });
        await act(async () => {
            await userEvent.click(zipCodeDescending);
        });

        const tdElements = screen.getAllByRole('cell').map((td) => td.textContent);
        const eateryTwoIndex = tdElements.findIndex((text) => text === '90002');
        const eateryOneIndex = tdElements.findIndex((text) => text === '90001');
        expect(eateryTwoIndex).toBeLessThan(eateryOneIndex);
    });
});
