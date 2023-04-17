import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import History from '../History/History';
import './Dashboard.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    createRandomEatery,
    updateHistory,
    clearHistory,
    clearRandomEatery
} from '../../redux/features/eateries/eateriesSlice';

// const decodeLocalStorageKey = function (key) {
//     try {
//         return JSON.parse(localStorage.getItem(key));
//     } catch (e) {
//         return localStorage.getItem(key);
//     }
// };
// const useLocalStorage = function (key, value) {
//     const [state, setState] = React.useState(() =>
//         localStorage.getItem(key) ? decodeLocalStorageKey(key) : value
//     );
//     React.useEffect(() => {
//         if (typeof state === 'object') {
//             localStorage.setItem(key, JSON.stringify(state));
//         } else {
//             localStorage.setItem(key, state);
//         }
//     }, [state]);
//     return [state, setState];
// };
export default function Dashboard() {
    // const eateries = useSelector((state) => state.eateries);
    const randomEatery = useSelector((state) => state.randomEatery);
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const eateryRandomizer = function () {
        dispatch(createRandomEatery());
        dispatch(updateHistory());
    };

    const { name, type, rating, dollarSign, address, zipCode } = randomEatery;
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
            />
            <History
                history={history}
                clearHistory={() => {
                    dispatch(clearHistory());
                    dispatch(clearRandomEatery());
                }}
            />
        </Container>
    );
}
