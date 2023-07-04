import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';

import { useAppDispatch } from '../../redux/hooks';
import { clearGeolocation } from '../../redux/features/eateries/eateriesSlice';
import { useGeolocation } from '../../hooks/useGeolocation';
import './Location.css';

export default function Location() {
    const { coordinates, loading, error } = useGeolocation();
    const dispatch = useAppDispatch();

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
            <Button onClick={handleClearGeolocation} className="location-button">
                Calculate Location
            </Button>
        </React.Fragment>
    );
}
