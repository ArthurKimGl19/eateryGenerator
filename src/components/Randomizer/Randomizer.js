import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './Randomizer.css';

import { useSelector } from 'react-redux';
export default function Randomizer({ randomizeEatery }) {
    const noMoreEateries = useSelector((state) => state.noMoreEateries);

    return (
        <Button onClick={randomizeEatery} disabled={noMoreEateries}>
            Randomize
        </Button>
    );
}

Randomizer.propTypes = {
    randomizeEatery: PropTypes.func.isRequired
};
