import React from 'react';
import PropTypes from 'prop-types';

export default function Randomizer({ randomizeEatery }) {
    return (
        <>
            <h1>Randomizer title</h1>
            <div>Randomizer</div>
            <button onClick={randomizeEatery}>Randomize</button>
        </>
    );
}

Randomizer.propTypes = {
    randomizeEatery: PropTypes.func.isRequired
};
