import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './Result.css';
export default function Result({
    name,
    type,
    rating,
    dollarSign,
    address,
    zipCode,
    note,
    proximity,
    coordinates
}) {
    const calculateDollarSign = (number) => {
        let result = '';
        for (let i = 0; i < number; i++) {
            result += '$';
        }
        return result;
    };
    const showDirections = (lat, long) => {
        window.open(`https://maps.google.com?q=${lat},${long}`);
    };
    const { latitude, longitude } = coordinates;
    if (name) {
        return (
            <Card border="secondary" className="result-card">
                <Card.Header className="result-card-header">{name}</Card.Header>
                <Card.Body className="result-card-text">
                    <ul>Type: {type}</ul>
                    <ul>Rating: {rating}</ul>
                    <ul>Dollar Sign: {calculateDollarSign(dollarSign)}</ul>
                    <ul>Address: {address}</ul>
                    <ul>Zip Code: {zipCode}</ul>
                    {proximity && <ul>Proximity: {proximity}</ul>}
                    {note && <ul>Notes: {note}</ul>}
                    <Button onClick={() => showDirections(latitude, longitude)}>Directions</Button>
                </Card.Body>
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
    address: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired,
    proximity: PropTypes.string,
    coordinates: PropTypes.object.isRequired,
    note: PropTypes.any.isRequired
};
