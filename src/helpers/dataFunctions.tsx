import { EateryInterface, EateriesInterface } from '../shared/interfaces/eatery.interface'

export const cleanUpData = function (object: EateriesInterface): EateryInterface[] {
    return Object.keys(object).map((id) => object[id]);
};
