export interface EateryInterface {
    name: string;
    type: string;
    rating: number;
    price: number;
    address: string;
    zipCode: number;
    note?: string;
    proximity?: string;
    latitude: number;
    longitude: number;
    index?: string | null;
}

export interface EateriesInterface {
    [key: string]: EateryInterface;
}
