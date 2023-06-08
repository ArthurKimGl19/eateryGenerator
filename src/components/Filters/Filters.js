import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

import { calculatePrice } from '../../helpers/priceFunctions';
import './Filters.css';

export default function Filters({ eateries, setEateries, initialEateries }) {
    const [types, setTypes] = React.useState([]);
    const [prices, setPrices] = React.useState([]);
    const [proximity, setProximity] = React.useState([]);
    const [selectedTypes, setSelectedTypes] = React.useState([]);
    const [selectedPrices, setSelectedPrices] = React.useState([]);
    const [selectedProximity, setSelectedProximity] = React.useState([]);

    React.useEffect(() => {
        const createOptions = function (name, updateState) {
            const options = new Set();

            eateries.forEach((eatery) => {
                const type = eatery[name];
                if (!options.has(type)) {
                    options.add(type);
                }
            });
            updateState([...options]);
        };

        createOptions('type', setTypes);
        createOptions('price', setPrices);
        createOptions('proximity', setProximity);
    }, [eateries]);

    const createDropdownOptions = (items, className) => {
        return items.sort().map((item, index) => {
            if (className === 'price-options') {
                const formattedPrice = calculatePrice(item);
                return (
                    <Dropdown.Item key={index} eventKey={formattedPrice} className={className}>
                        {formattedPrice}
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

    const updateSelectedOptions = (value, updateState, currentState, type) => {
        if (type === 'price') {
            let currentPrice;
            if (value === '$') {
                currentPrice = 1;
            } else if (value === '$$') {
                currentPrice = 2;
            } else if (value === '$$$') {
                currentPrice = 3;
            }
            const isValuePresent = currentState.filter((item) => item === currentPrice).length > 0;
            if (!isValuePresent) {
                updateState([...currentState, currentPrice]);
            }
        } else {
            const isValuePresent = currentState.filter((item) => item === value).length > 0;
            if (!isValuePresent) {
                updateState([...currentState, value]);
            }
        }
    };

    const createSelectedOptions = (items, type) => {
        return items.map((item, index) => {
            if (type === 'price') {
                let currentPrice;
                if (item === 1) {
                    currentPrice = '$';
                } else if (item === 2) {
                    currentPrice = '$$';
                } else if (item === 3) {
                    currentPrice = '$$$';
                }
                return (
                    <Badge pill bg="success" key={index} className="selected-option">
                        {currentPrice}
                    </Badge>
                );
            } else {
                return (
                    <Badge pill bg="success" key={index} className="selected-option">
                        {item}
                    </Badge>
                );
            }
        });
    };

    const selectedTypeOptions = createSelectedOptions(selectedTypes);
    const selectedPriceOptions = createSelectedOptions(selectedPrices, 'price');
    const selectedProximityOptions = createSelectedOptions(selectedProximity);

    const clearSelectedOptions = () => {
        setSelectedTypes([]);
        setSelectedPrices([]);
        setSelectedProximity([]);
        setEateries([...initialEateries]);
    };

    const filterEateriesByType = (inputArray, filterValue, filterType) => {
        const filteredEateries = [];
        if (filterType === 'price') {
            let currentPrice;
            if (filterValue === '$') {
                currentPrice = 1;
            } else if (filterValue === '$$') {
                currentPrice = 2;
            } else if (filterValue === '$$$') {
                currentPrice = 3;
            }
            inputArray.forEach((eatery) => {
                if (eatery[filterType] === currentPrice) {
                    filteredEateries.push(eatery);
                }
            });
        } else {
            inputArray.forEach((eatery) => {
                if (eatery[filterType] === filterValue) {
                    filteredEateries.push(eatery);
                }
            });
        }
        setEateries(filteredEateries);
    };

    return (
        <Container className="filters-container">
            <Container className="filters-options-container">
                <h6>Filters</h6>
                {/* eslint-disable prettier/prettier */}
                <DropdownButton
                    title="Type"
                    className="dropdown-button"
                    onSelect={(value) => {
                        updateSelectedOptions(value, setSelectedTypes, selectedTypes);
                        filterEateriesByType(eateries, value, 'type');
                    }}
                >
                    {/* eslint-disable prettier/prettier */}
                    {typeOptions}
                </DropdownButton>
                {/* eslint-disable prettier/prettier */}
                <DropdownButton
                    title="Price"
                    className="dropdown-button"
                    onSelect={(value) => {
                        updateSelectedOptions(value, setSelectedPrices, selectedPrices, 'price');
                        filterEateriesByType(eateries, value, 'price');
                    }}
                >
                    {/* eslint-disable prettier/prettier */}
                    {priceOptions}
                </DropdownButton>
                {/* eslint-disable prettier/prettier */}
                <DropdownButton
                    title="Proximity"
                    className="dropdown-button"
                    onSelect={(value) => {
                        updateSelectedOptions(value, setSelectedProximity, selectedProximity);
                        filterEateriesByType(eateries, value, 'proximity');
                    }}
                >
                    {/* eslint-disable prettier/prettier */}
                    {proximityOptions}
                </DropdownButton>
                <Button onClick={clearSelectedOptions}>Clear</Button>
            </Container>
            <Container className="selected-options-container">
                <div className="selected-type-options">{selectedTypeOptions}</div>
                <div className="selected-price-options">{selectedPriceOptions}</div>
                <div className="selected-proximity-options">{selectedProximityOptions}</div>
            </Container>
            <div>{JSON.stringify(prices, 2, null)}</div>
        </Container>
    );
}

Filters.propTypes = {
    eateries: PropTypes.array.isRequired,
    setEateries: PropTypes.func.isRequired,
    initialEateries: PropTypes.array.isRequired
};
