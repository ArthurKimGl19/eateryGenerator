import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './Result.css';
export default function Result({ name, type, rating, dollarSign, zipCode }) {
    const calculateDollarSign = (number) => {
        let result = '';
        for (let i = 0; i < number; i++) {
            result += '$';
        }
        return result;
    };
    if (name) {
        return (
            <Card border="secondary" className="result-card">
                <Card.Header className="result-card-header">{name}</Card.Header>
                <Card.Text className="result-card-text">
                    <ul>Type: {type}</ul>
                    <ul>Rating: {rating}</ul>
                    <ul>Dollar Sign: {calculateDollarSign(dollarSign)}</ul>
                    <ul>Zip Code: {zipCode}</ul>
                </Card.Text>
            </Card>
        );
    }
    return null;
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    dollarSign: PropTypes.number.isRequired,
    zipCode: PropTypes.number.isRequired
};
