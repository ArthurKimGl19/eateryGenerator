import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

import { EateryInterface } from '../../shared/interfaces/eatery.interface';
import './Sort.css';

export default function Sort({
    eateries,
    setEateries
}: {
    eateries: EateryInterface[];
    setEateries: Function;
}): ReactElement | null {
    const sortValues = ['name', 'type', 'rating', 'price', 'zip code'].flatMap((i) => [i, i]);
    type SortKeys = 'name' | 'price' | 'rating' | 'type' | 'zipCode' | 'zip code';

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

    const sortOptionsFunc = (name: SortKeys, direction: string) => {
        const currentEateries = [...eateries];
        if (name === 'zip code') name = 'zipCode';
        const nameKey = name as keyof EateryInterface;
        if (nameKey === 'price' || nameKey === 'zipCode' || nameKey === 'rating') {
            if (direction === 'asc') {
                currentEateries.sort((a, b) => b[nameKey] - a[nameKey]);
            } else {
                currentEateries.sort((a, b) => a[nameKey] - b[nameKey]);
            }
        } else if (nameKey === 'name' || nameKey === 'type') {
            if (direction === 'asc') {
                currentEateries.sort((a, b) => b[nameKey].localeCompare(a[nameKey]));
            } else {
                currentEateries.sort((a, b) => a[nameKey].localeCompare(b[nameKey]));
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
                    if (typeof value === 'string') {
                        const valueArray = value.split('_');
                        console.log('value Array', valueArray);
                        if (valueArray.length === 2) {
                            sortOptionsFunc(valueArray[0] as SortKeys, valueArray[1]);
                        }
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
