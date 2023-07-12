import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

import {
    updateGeolocationCoordinates,
    updateGeolocationLoading,
    updateGeolocationError,
    updateGeolocationFormatted
} from '../redux/features/eateries/eateriesSlice';
export const useGeolocation = function () {
    const dispatch = useAppDispatch();
    const { coordinates, loading, error } = useAppSelector((state) => state.eateries.geolocation);
    const getUserLocation = () => {
        if (!navigator.geolocation) {
            dispatch(updateGeolocationError('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    dispatch(updateGeolocationCoordinates({ latitude, longitude }));
                    dispatch(updateGeolocationFormatted(true));
                    dispatch(updateGeolocationLoading(false));
                },
                () => {
                    dispatch(updateGeolocationError('Unable to retrieve your location'));
                }
            );
        }
    };

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            getUserLocation();
        }, 2000);
        return () => window.clearInterval(timer);
    }, [loading]);

    return { coordinates, loading, error };
};
