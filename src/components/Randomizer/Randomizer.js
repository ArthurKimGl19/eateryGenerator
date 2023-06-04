import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import './Randomizer.css';

export default function Randomizer({ randomizeEatery }) {
    const noMoreEateries = useSelector((state) => state.noMoreEateries);

    return (
        <Button onClick={randomizeEatery} disabled={noMoreEateries} className="randomizer-button">
            Randomize
        </Button>
    );
}

Randomizer.propTypes = {
    randomizeEatery: PropTypes.func.isRequired
};
