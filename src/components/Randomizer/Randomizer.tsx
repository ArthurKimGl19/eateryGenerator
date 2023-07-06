import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

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

export default function Randomizer(): ReactElement | null {
    const noMoreEateries = useAppSelector((state) => state.eateries.noMoreEateries);
    const geolocationFormatted = useAppSelector((state) => state.eateries.geolocationFormatted);
    const dispatch = useAppDispatch();
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
