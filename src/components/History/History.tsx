import React, { ReactElement } from 'react';
import BTable from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { FaLocationDot } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { calculatePrice } from '../../helpers/priceFunctions';
import { clearHistory, clearRandomEatery } from '../../redux/features/eateries/eateriesSlice';
import { EateryInterface } from '../../shared/interfaces/eatery.interface';
import { showDirections } from '../../helpers/directionFunctions';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import './History.css';

export default function History(): ReactElement | null {
    const history = useAppSelector((state) => state.eateries.history);
    const dispatch = useAppDispatch();
    const clearHistoryFunctions = function () {
        dispatch(clearHistory());
        dispatch(clearRandomEatery());
    };
    const tableHeader = [
        'number',
        'name',
        'type',
        'rating',
        'price',
        'address',
        'zip code',
        'proximity',
        'notes'
    ];
    return (
        <Container className="history-container">
            <h4>History</h4>
            <Button className="history-button" onClick={clearHistoryFunctions}>
                Clear History
            </Button>
            <BTable striped bordered hover responsive size="sm" className="history-table">
                <thead>
                    <tr className="history-table-header">
                        {tableHeader.map((header, index) => {
                            return <td key={index}>{header}</td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {history.map((eatery: EateryInterface, index: number) => {
                        const {
                            name,
                            type,
                            rating,
                            price,
                            address,
                            zipCode,
                            proximity,
                            note,
                            latitude,
                            longitude
                        } = eatery;
                        return (
                            <tr key={uuidv4()} className="history-table-result">
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculatePrice(price)}</td>
                                <td>
                                    {address}{' '}
                                    <FaLocationDot
                                        onClick={() => showDirections(latitude, longitude)}
                                        className="map-icon"
                                        title="directions icon"
                                    />
                                </td>
                                <td>{zipCode}</td>
                                <td>{proximity}</td>
                                <td>{note}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
        </Container>
    );
}
