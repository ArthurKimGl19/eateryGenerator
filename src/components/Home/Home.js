import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
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
            <h1>Eatery Generator</h1>
            <Card className="dashboard-card">
                <Card.Body className="dashboard-card-body">
                    Generate a random eatery from data set to eat at! Generated eatery will show
                    name, type of food, rating, expensiveness, and address.
                </Card.Body>
                <Accordion className="dashboard-card-accordion">
                    <Accordion.Header className="dashboard-card-accordion-header">
                        How it works
                    </Accordion.Header>
                    <Accordion.Body className="dashboard-card-accordion-body">
                        Please click the &quot;Randomize&quot; button below to generate a random
                        eatery. Each randomly generated eatery will be stored and shown in the
                        History section below. You can press &quot;Clear History&quot; to remove all
                        previously generated eateries. You are also able to revisit this page in the
                        future and see your previously generated eateries list.
                    </Accordion.Body>
                </Accordion>
            </Card>
            <Randomizer randomizeEatery={eateryRandomizer} />
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
