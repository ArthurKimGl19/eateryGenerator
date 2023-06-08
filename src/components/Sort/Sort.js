import React from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import './Sort.css';

export default function Sort({ eateries, setEateries, initialEateries }) {
    const sortValues = ['name', 'type', 'price', 'zip code', 'notes'].flatMap((i) => [i, i]);

    const createSortOptions = () => {
        return sortValues.sort().map((item, index) => {
            //alternate up arrow and down arrow for each value
            if (index % 2 === 0) {
                const eventKey = item + '_' + 'desc;';
                return (
                    <Dropdown.Item key={index} eventKey={eventKey} className="sort-asc-option">
                        {item} <FontAwesomeIcon icon={faArrowUp} className="sort-asc-icon" />
                    </Dropdown.Item>
                );
            } else {
                const eventKey = item + '_' + 'asc;';
                return (
                    <Dropdown.Item key={index} eventKey={eventKey} className="sort-desc-option">
                        {item} <FontAwesomeIcon icon={faArrowDown} className="sort-desc-icon" />
                    </Dropdown.Item>
                );
            }
        });
    };

    const sortOptions = createSortOptions();

    return (
        <Container className="sort-container">
            <DropdownButton id="dropdown-basic-button" title="Sort">
                {sortOptions}
            </DropdownButton>
        </Container>
    );
}

Sort.propTypes = {
    eateries: PropTypes.array.isRequired,
    setEateries: PropTypes.func.isRequired,
    initialEateries: PropTypes.array.isRequired
};
