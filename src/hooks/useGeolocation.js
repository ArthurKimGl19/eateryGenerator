import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateGeolocationCoordinates,
    updateGeolocationLoading,
    updateGeolocationError
} from '../redux/features/eateries/eateriesSlice';
export const useGeolocation = function () {
    const dispatch = useDispatch();
    const { coordinates, loading, error } = useSelector((state) => state.geolocation);
    const getUserLocation = () => {
        if (!navigator.geolocation) {
            dispatch(updateGeolocationError('Geolocation is not supported by your browser'));
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                dispatch(updateGeolocationCoordinates({ latitude, longitude }));
                dispatch(updateGeolocationLoading(false));
            },
            () => {
                dispatch(updateGeolocationError('Unable to retrieve your location'));
            }
        );
    };

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            getUserLocation();
        }, 2000);
        return () => window.clearInterval(timer);
    }, [loading]);

    return { coordinates, loading, error };
};
