import React from 'react';
import { Container } from 'react-bootstrap';

import './Location.css';

export default function Location() {
    const [coordinates, setCoordinates] = React.useState({});
    const [status, setStatus] = React.useState('');

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        }
        setStatus('Locating..');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCoordinates({ latitude, longitude });
                setStatus('');
            },
            (error) => {
                setStatus('Unable to retrieve your location');
            }
        );
    };

    React.useEffect(() => {
        getUserLocation();
    }, [coordinates]);
    return (
        <Container>
            <div>Location</div>
            <div>{JSON.stringify(coordinates)}</div>
        </Container>
    );
}
