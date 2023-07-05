import { shuffleEateries, calculateProximity } from '../helpers/eateriesFunctions';

describe('Test eateries helper functions: shuffledEateries', () => {
    test('Test shuffleEateries and see if it shuffles array correctly', () => {
        const array = ['1', '2', '3', '4', '5'];
        const shuffledArray = shuffleEateries(array);
        expect(shuffledArray.length).toBe(array.length);
        //Check if shuffledArray contains all the elements from array
        expect(shuffledArray).toEqual(expect.arrayContaining(array));
    });
});

describe('Test eateries helper functions: calculateProximity', () => {
    test('Returns "close" for distances <= 5', () => {
        const proximity = calculateProximity(5);
        expect(proximity).toBe('close');
    });

    test('Returns "moderately close" for distances between 5 and 8', () => {
        const proximity = calculateProximity(7);
        expect(proximity).toBe('moderately close');
    });

    test('Returns "far" for distances between 8 and 15', () => {
        const proximity = calculateProximity(10);
        expect(proximity).toBe('far');
    });

    test('Returns "very far" for distances greater than 15', () => {
        const proximity = calculateProximity(30);
        expect(proximity).toBe('very far');
    });
});
