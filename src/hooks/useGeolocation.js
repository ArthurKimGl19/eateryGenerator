import React from 'react';

export const calculateDistanceInMiles = function (lat1, lon1, lat2, lon2) {
    const earthRadiusInMiles = 3958.8; // Radius of the Earth in miles
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

const toRadians = function (degrees) {
    return degrees * (Math.PI / 180);
};

export const useGeolocation = function () {
    const [coordinates, setCoordinates] = React.useState({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCoordinates({ latitude, longitude });
                setLoading(false);
            },
            () => {
                setError('Unable to retrieve your location');
            }
        );
    };

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            getUserLocation();
        }, 2000);
        return () => window.clearInterval(timer);
    }, []);

    return { coordinates, loading, error };
};
