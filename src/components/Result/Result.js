import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { calculatePrice } from '../../helpers/priceFunctions';
import { showDirections } from '../../helpers/directionFunctions';
import './Result.css';

export default function Result({
    name,
    type,
    rating,
    price,
    address,
    zipCode,
    note,
    proximity,
    coordinates
}) {
    const { latitude, longitude } = coordinates;
    const tooltip = (
        <Tooltip id="tooltip-right">
            <div>
                <strong>Close</strong> is less than 5 miles
            </div>
            <div>
                <strong>Moderately Close</strong> is between 5-8 miles
            </div>
            <div>
                <strong>Far</strong> is between 8-15 miles
            </div>
            <div>
                <strong>Very Far</strong> is 15+ miles
            </div>
        </Tooltip>
    );
    if (name) {
        return (
            <Card border="secondary" className="result-card">
                <Card.Header className="result-card-header">{name}</Card.Header>
                <Card.Body className="result-card-text">
                    <ul>Type: {type}</ul>
                    <ul>Rating: {rating}</ul>
                    <ul>Price: {calculatePrice(price)}</ul>
                    <ul>Address: {address}</ul>
                    <ul>Zip Code: {zipCode}</ul>
                    {proximity && (
                        <ul>
                            Proximity: {proximity}
                            {/* eslint-disable prettier/prettier */}
                            <OverlayTrigger
                                trigger="click"
                                placement="right"
                                overlay={tooltip}
                                defaultShow
                            >
                                {/* eslint-disable prettier/prettier */}
                                <Button variant="link" className="tooltip-button">
                                    <FontAwesomeIcon icon={faCircleInfo} title="distance tooltip"/>
                                </Button>
                            </OverlayTrigger>
                        </ul>
                    )}
                    {note && <ul>Notes: {note}</ul>}
                    {/* eslint-disable prettier/prettier */}
                    <Button
                        onClick={() => showDirections(latitude, longitude)}
                        className="directions-button"
                    >
                        Directions
                    </Button>
                    {/* eslint-disable prettier/prettier */}
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
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired,
    proximity: PropTypes.string,
    coordinates: PropTypes.object.isRequired,
    note: PropTypes.any.isRequired
};
