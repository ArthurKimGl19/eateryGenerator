export interface GeolocationInterface {
    coordinates: {
        latitude: number;
        longitude: number;
    };
    loading: boolean;
    error: null | string;
}
