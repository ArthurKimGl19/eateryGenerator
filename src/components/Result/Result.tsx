import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaCircleInfo } from 'react-icons/fa6';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { calculatePrice } from '../../helpers/priceFunctions';
import { showDirections } from '../../helpers/directionFunctions';
import { useAppSelector } from '../../redux/hooks';
import './Result.css';

export default function Result(): ReactElement | null {
    const randomEatery = useAppSelector((state) => state.eateries.randomEatery);
    const { name, type, rating, price, address, zipCode, note, proximity, latitude, longitude } =
        randomEatery;
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
                            <OverlayTrigger
                                trigger="click"
                                placement="right"
                                overlay={tooltip}
                                defaultShow={false}
                                delay={10}
                                flip={false}
                            >
                                <div>
                                    <Button variant="link" className="tooltip-button">
                                        <FaCircleInfo title="distance tooltip" />
                                    </Button>
                                </div>
                            </OverlayTrigger>
                        </ul>
                    )}
                    {note && <ul>Notes: {note}</ul>}
                    <Button
                        onClick={() => showDirections(latitude, longitude)}
                        className="directions-button"
                    >
                        Directions
                    </Button>
                </Card.Body>
            </Card>
        );
    }
    return null;
}
