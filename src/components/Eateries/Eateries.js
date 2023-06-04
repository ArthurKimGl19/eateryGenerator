import React from 'react';

import './Eateries.css';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

export default function Eateries() {
    const eateries = useSelector((state) => state.eateries);
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
        <Container className="eateries-container">
            <h4>Eateries</h4>
            <BTable striped bordered hover responsive size="sm" className="eateries-table">
                <thead>
                    <tr className="eateries-table-header">
                        {tableHeader.map((header, index) => {
                            return <td key={index}>{header}</td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(eateries).map((position, index) => {
                        const { name, type, rating, dollarSign, address, zipCode, note } =
                            eateries[position];
                        return (
                            <tr key={index} className="eateries-table-result">
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
