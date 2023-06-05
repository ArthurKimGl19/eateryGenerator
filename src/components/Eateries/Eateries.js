import React from 'react';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

import Filters from '../Filters/Filters';
import { calculateDollarSign } from '../../helpers/priceFunctions';
import './Eateries.css';

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
        'proximity',
        'notes'
    ];

    return (
        <Container className="eateries-container">
            <Container>
                <Filters />
            </Container>
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
                        const {
                            name,
                            type,
                            rating,
                            dollarSign,
                            address,
                            zipCode,
                            proximity,
                            note
                        } = eateries[position];
                        return (
                            <tr key={index} className="eateries-table-result">
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculateDollarSign(dollarSign)}</td>
                                <td>{address}</td>
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
