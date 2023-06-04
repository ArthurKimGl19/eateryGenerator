import React from 'react';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { clearHistory, clearRandomEatery } from '../../redux/features/eateries/eateriesSlice';
import { useDispatch, useSelector } from 'react-redux';

import './History.css';

export default function History() {
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const clearHistoryFunctions = function () {
        dispatch(clearHistory());
        dispatch(clearRandomEatery());
    };
    const tableHeader = [
        'number',
        'name',
        'type',
        'rating',
        'dollar sign',
        'address',
        'zip code',
        'notes'
    ];

    const calculateDollarSign = (number) => {
        let result = '';
        for (let i = 0; i < number; i++) {
            result += '$';
        }
        return result;
    };
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
                    {history.map((eatery, index) => {
                        const { name, type, rating, dollarSign, address, zipCode, note } = eatery;
                        return (
                            <tr key={index} className="history-table-result">
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculateDollarSign(dollarSign)}</td>
                                <td>{address}</td>
                                <td>{zipCode}</td>
                                <td>{note}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
        </Container>
    );
}
