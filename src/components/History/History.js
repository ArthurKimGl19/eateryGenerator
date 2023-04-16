import React from 'react';
import PropTypes from 'prop-types';

export default function History({ history, clearHistory }) {
    return (
        <>
            <h1>History title</h1>
            <div>History</div>
            <button onClick={clearHistory}>Clear History</button>
            <ul>
                {history.map((eatery, index) => {
                    const { name, type, rating, dollarSign, zipCode } = eatery;
                    return (
                        <li key={index}>
                            <div>Result Card title</div>
                            <div>Name: {name}</div>
                            <div>Type: {type}</div>
                            <div>Rating: {rating}</div>
                            <div>Dollar Sign: {dollarSign}</div>
                            <div>Zip Code: {zipCode}</div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

History.propTypes = {
    history: PropTypes.array.isRequired,
    clearHistory: PropTypes.func.isRequired
};
