import React from 'react';
import { Container } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
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

    const typeOptions = types.map((type, index) => (
        <Dropdown.Item key={index} eventKey={type} className="type-options">
            {type}
        </Dropdown.Item>
    ));
    const priceOptions = prices.map((dollarSign, index) => {
        const formattedDollarSign = calculateDollarSign(dollarSign);
        return (
            <Dropdown.Item key={index} eventKey={formattedDollarSign} className="price-options">
                {formattedDollarSign}
            </Dropdown.Item>
        );
    });
    const proximityOptions = proximity.map((proximity, index) => (
        <Dropdown.Item key={index} eventKey={proximity} className="proximity-options">
            {proximity}
        </Dropdown.Item>
    ));

    return (
        <Container className="filters-container">
            <h6>Filters</h6>
            <DropdownButton title="Type" className="dropdown-button">
                {typeOptions}
            </DropdownButton>
            <DropdownButton title="Price" className="dropdown-button">
                {priceOptions}
            </DropdownButton>
            <DropdownButton title="Proximity" className="dropdown-button">
                {proximityOptions}
            </DropdownButton>
        </Container>
    );
}
