import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import Location from '../Location/Location';
import {
    createRandomEatery,
    updateHistory,
    checkIfEateriesAvailable,
    formatRandomEateryProximity,
    formatEateriesProximity,
    formatHistoryProximity,
    updateGeolocationFormatted
} from '../../redux/features/eateries/eateriesSlice';
import './Dashboard.css';

export default function Dashboard() {
    const randomEatery = useSelector((state) => state.randomEatery);
    const geolocationFormatted = useSelector((state) => state.geolocationFormatted);
    const dispatch = useDispatch();
    const eateryRandomizer = function () {
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

    const {
        name,
        type,
        rating,
        dollarSign,
        address,
        zipCode,
        note,
        proximity,
        latitude,
        longitude
    } = randomEatery;
    const coordinates = { latitude, longitude };
    return (
        <Container>
            <Container className="hero-component">
                <Container className="hero-text-container">
                    <Row className="hero-title">
                        <Col>
                            <h1>Generate a random eatery to eat at!</h1>
                        </Col>
                    </Row>
                    <Row className="hero-text">
                        <Col>
                            By clicking the &apos;Randomize&apos; button, you can generate a random
                            eatery, which will be stored and displayed in the History section
                        </Col>
                    </Row>
                    <Row className="hero-text">
                        <Col>
                            <Location />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Randomizer randomizeEatery={eateryRandomizer} />
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Result
                name={name}
                type={type}
                rating={rating}
                dollarSign={dollarSign}
                address={address}
                zipCode={zipCode}
                note={note}
                proximity={proximity}
                coordinates={coordinates}
            />
        </Container>
    );
}
