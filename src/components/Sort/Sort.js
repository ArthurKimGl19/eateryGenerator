import React from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
                        {item} <FontAwesomeIcon icon={faArrowUp} className="sort-asc-icon" />
                    </Dropdown.Item>
                );
            } else {
                const eventKey = item + '_' + 'asc';
                return (
                    <Dropdown.Item key={index} eventKey={eventKey} className="sort-desc-option">
                        {item} <FontAwesomeIcon icon={faArrowDown} className="sort-desc-icon" />
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
