import React from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

import './Sort.css';

export default function Sort({ eateries, setEateries }) {
    const sortValues = ['name', 'type', 'rating', 'price', 'zip code'].flatMap((i) => [i, i]);

    const createSortOptions = () => {
        return sortValues.sort().map((item, index) => {
            //alternate up arrow and down arrow for each value
            if (index % 2 === 0) {
                const eventKey = item + '_' + 'desc';
                return (
                    <Dropdown.Item key={index} eventKey={eventKey} className="sort-asc-option">
                        {item}{' '}
                        <FaArrowUp
                            className="sort-asc-icon"
                            title={`${item} sort ascending icon`}
                        />
                    </Dropdown.Item>
                );
            } else {
                const eventKey = item + '_' + 'asc';
                return (
                    <Dropdown.Item key={index} eventKey={eventKey} className="sort-desc-option">
                        {item}{' '}
                        <FaArrowDown
                            className="sort-desc-icon"
                            title={`${item} sort descending icon`}
                        />
                    </Dropdown.Item>
                );
            }
        });
    };

    const sortOptions = createSortOptions();

    const sortOptionsFunc = (name, direction) => {
        const currentEateries = [...eateries];
        if (name === 'zip code') name = 'zipCode';
        if (name === 'price' || name === 'zipCode' || name === 'rating') {
            if (direction === 'asc') {
                currentEateries.sort((a, b) => b[name] - a[name]);
            } else {
                currentEateries.sort((a, b) => a[name] - b[name]);
            }
        } else {
            if (direction === 'asc') {
                currentEateries.sort((a, b) => b[name].localeCompare(a[name]));
            } else {
                currentEateries.sort((a, b) => a[name].localeCompare(b[name]));
            }
        }
        setEateries(currentEateries);
    };

    return (
        <Container className="sort-container">
            <DropdownButton
                id="dropdown-basic-button"
                title="Sort"
                onSelect={(value) => {
                    const valueArray = value.split('_');
                    if (valueArray.length === 2) {
                        sortOptionsFunc(valueArray[0], valueArray[1]);
                    }
                }}>
                {sortOptions}
            </DropdownButton>
        </Container>
    );
}

Sort.propTypes = {
    eateries: PropTypes.array.isRequired,
    setEateries: PropTypes.func.isRequired
};
