import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import Location from '../Location/Location';
import './Home.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    createRandomEatery,
    updateHistory,
    checkIfEateriesAvailable
} from '../../redux/features/eateries/eateriesSlice';

export default function Home() {
    const randomEatery = useSelector((state) => state.randomEatery);
    const dispatch = useDispatch();
    const eateryRandomizer = function () {
        dispatch(checkIfEateriesAvailable());
        dispatch(createRandomEatery());
        dispatch(updateHistory());
    };

    const { name, type, rating, dollarSign, address, zipCode, note } = randomEatery;
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
            />
        </Container>
    );
}
