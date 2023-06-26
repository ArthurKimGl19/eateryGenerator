import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import Location from '../Location/Location';
import './Dashboard.css';

export default function Dashboard() {
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
                            <Randomizer />
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Result />
        </Container>
    );
}
