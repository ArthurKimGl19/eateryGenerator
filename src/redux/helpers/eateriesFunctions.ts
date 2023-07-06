import { EateryInterface } from '../../shared/interfaces/eatery.interface';
export const cleanupData = function (data: EateryInterface[]): {
    [index: number]: EateryInterface;
} {
    const output: { [index: number]: EateryInterface } = {};
    data.forEach((eatery, index) => {
        output[index] = eatery;
    });
    return output;
};

export const shuffleEateries = function (array: string[]): string[] {
    // Fisher-Yates shuffle algo
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const toRadians = function (degrees: number): number {
    return degrees * (Math.PI / 180);
};

export const calculateDistanceInMiles = function (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    // Radius of the Earth in miles
    const earthRadiusInMiles = 3958.8;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusInMiles * c;
};

export const calculateProximity = function (distance: number): string {
    if (distance <= 5) {
        return 'close';
    } else if (distance > 5 && distance <= 8) {
        return 'moderately close';
    } else if (distance > 8 && distance < 15) {
        return 'far';
    } else {
        return 'very far';
    }
};
