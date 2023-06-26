import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import './Randomizer.css';
import {
    checkIfEateriesAvailable,
    createRandomEatery,
    formatEateriesProximity,
    formatHistoryProximity,
    formatRandomEateryProximity,
    updateGeolocationFormatted,
    updateHistory
} from '../../redux/features/eateries/eateriesSlice';

export default function Randomizer() {
    const noMoreEateries = useSelector((state) => state.noMoreEateries);
    const geolocationFormatted = useSelector((state) => state.geolocationFormatted);

    const dispatch = useDispatch();
    const randomizeEatery = function () {
        dispatch(checkIfEateriesAvailable());
        dispatch(createRandomEatery());
        dispatch(updateHistory());

        if (!geolocationFormatted) {
            dispatch(formatRandomEateryProximity());
            dispatch(formatEateriesProximity());
            dispatch(formatHistoryProximity());
            dispatch(updateGeolocationFormatted());
        }
    };

    return (
        <Button onClick={randomizeEatery} disabled={noMoreEateries} className="randomizer-button">
            Randomize
        </Button>
    );
}
