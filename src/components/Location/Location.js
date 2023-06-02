import React from 'react';
import { Container } from 'react-bootstrap';

import './Location.css';
import Loading from '../Loading/Loading';
import { useGeolocation } from '../../hooks/useGeolocation';

export default function Location() {
    const { coordinates, loading, error } = useGeolocation();

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
