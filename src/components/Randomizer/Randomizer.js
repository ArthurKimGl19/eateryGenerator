import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './Randomizer.css';

export default function Randomizer({ randomizeEatery }) {
    return <Button onClick={randomizeEatery}>Randomize</Button>;
}

Randomizer.propTypes = {
    randomizeEatery: PropTypes.func.isRequired
};
