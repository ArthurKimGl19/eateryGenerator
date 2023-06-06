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

    const [selectedTypes, setSelectedTypes] = React.useState([]);
    const [selectedPrices, setSelectedPrices] = React.useState([]);
    const [selectedProximity, setSelectedProximity] = React.useState([]);

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

    const createDropdownOptions = (items, className) => {
        return items.map((item, index) => {
            if (className === 'price-options') {
                const formattedDollarSign = calculateDollarSign(item);
                return (
                    <Dropdown.Item key={index} eventKey={formattedDollarSign} className={className}>
                        {formattedDollarSign}
                    </Dropdown.Item>
                );
            } else {
                return (
                    <Dropdown.Item key={index} eventKey={item} className={className}>
                        {item}
                    </Dropdown.Item>
                );
            }
        });
    };

    const typeOptions = createDropdownOptions(types, 'type-options');
    const priceOptions = createDropdownOptions(prices, 'price-options');
    const proximityOptions = createDropdownOptions(proximity, 'proximity-options');

    return (
        <Container className="filters-container">
            <h6>Filters</h6>
            <DropdownButton
                title="Type"
                className="dropdown-button"
                onSelect={(evt) => console.log('types ', evt)}>
                {typeOptions}
            </DropdownButton>
            <DropdownButton
                title="Price"
                className="dropdown-button"
                onSelect={(evt) => console.log('prices ', evt)}>
                {priceOptions}
            </DropdownButton>
            <DropdownButton
                title="Proximity"
                className="dropdown-button"
                onSelect={(evt) => console.log('proximity ', evt)}>
                {proximityOptions}
            </DropdownButton>
        </Container>
    );
}
