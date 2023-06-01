import React from 'react';
import { Container } from 'react-bootstrap';

import './Location.css';
import Loading from '../Loading/Loading';

export default function Location() {
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

    const { latitude, longitude } = coordinates;

    if (loading) {
        return <Loading text={'Finding location'} speed={200} />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <Container>
            <div>
                Location: {latitude.toFixed(2)},{longitude.toFixed(2)}
            </div>
        </Container>
    );
}
