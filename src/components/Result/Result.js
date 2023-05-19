import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import './Result.css';
export default function Result({ name, type, rating, dollarSign, address, zipCode, note }) {
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
                <Card.Body className="result-card-text">
                    <ul>Type: {type}</ul>
                    <ul>Rating: {rating}</ul>
                    <ul>Dollar Sign: {calculateDollarSign(dollarSign)}</ul>
                    <ul>Address: {address}</ul>
                    <ul>Zip Code: {zipCode}</ul>
                </Card.Body>
                {note && (
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Notes</Accordion.Header>
                            <Accordion.Body>{note}</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )}
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
    note: PropTypes.oneOfType([PropTypes.string, undefined])
};
