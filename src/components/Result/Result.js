import React from 'react';
import PropTypes from 'prop-types';

export default function Result({ name, type, rating, dollarSign, zipCode }) {
    return (
        <>
            <h1>Result Card title</h1>
            <h2>Name: {name}</h2>
            <div>Type: {type}</div>
            <div>Rating: {rating}</div>
            <div>Dollar Sign: {dollarSign}</div>
            <div>Zip Code: {zipCode}</div>
            {/*<div>random eatery: {randomEatery}</div>*/}
        </>
    );
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    dollarSign: PropTypes.number.isRequired,
    zipCode: PropTypes.number.isRequired
};
