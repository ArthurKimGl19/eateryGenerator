import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import { calculateDollarSign } from '../../helpers/priceFunctions';
import './Filters.css';

export default function Filters() {
    const [types, setTypes] = React.useState([]);
    const [prices, setPrices] = React.useState([]);
    const [proximity, setProximity] = React.useState([]);

    const eateries = useSelector((state) => state.eateries);

    const createOptions = function (name, updateState) {
        const options = new Set();

        Object.keys(eateries).forEach((id) => {
            const type = eateries[id][name];
            if (!options.has(type)) {
                options.add(type);
            }
        });
        updateState([...options]);
    };

    React.useEffect(() => {
        createOptions('type', setTypes);
        createOptions('dollarSign', setPrices);
        createOptions('proximity', setProximity);
    }, [eateries]);

    const typeOptions = types.map((type, index) => <Button key={index}>{type}</Button>);
    const priceOptions = prices.map((dollarSign, index) => {
        const formattedDollarSign = calculateDollarSign(dollarSign);
        return <Button key={index}>{formattedDollarSign}</Button>;
    });
    const proximityOptions = proximity.map((proximity, index) => (
        <Button key={index}>{proximity}</Button>
    ));

    return (
        <Container>
            <div>Filters</div>
            <div>Filters Options</div>
            <Container>
                <h6>Type:</h6>
                {typeOptions}
            </Container>
            <Container>
                <h6>Price:</h6>
                {priceOptions}
            </Container>
            <Container>
                <h6>Proximity:</h6>
                {proximityOptions}
            </Container>
        </Container>
    );
}
