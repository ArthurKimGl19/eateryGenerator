import React from 'react';
import Button from 'react-bootstrap/Button';

import './Location.css';
import Loading from '../Loading/Loading';
import { useGeolocation } from '../../hooks/useGeolocation';

import { useDispatch } from 'react-redux';
import { clearGeolocation } from '../../redux/features/eateries/eateriesSlice';

export default function Location() {
    const { coordinates, loading, error } = useGeolocation();
    const dispatch = useDispatch();

    const { latitude, longitude } = coordinates;
    const handleClearGeolocation = () => {
        dispatch(clearGeolocation());
    };

    if (loading) {
        return <Loading text={'Finding location'} speed={200} />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <React.Fragment>
            <div>
                Location: {latitude.toFixed(2)},{longitude.toFixed(2)}
            </div>
            <Button onClick={handleClearGeolocation}>Calculate Location</Button>
        </React.Fragment>
    );
}
