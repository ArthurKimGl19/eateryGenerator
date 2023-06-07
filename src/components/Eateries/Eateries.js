import React from 'react';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';

import Filters from '../Filters/Filters';
import { calculatePrice } from '../../helpers/priceFunctions';
import './Eateries.css';
import { formatEateriesProximity } from '../../redux/features/eateries/eateriesSlice';

export default function Eateries() {
    const eateries = useSelector((state) => state.eateries);
    const geolocationFormatted = useSelector((state) => state.geolocationFormatted);
    const dispatch = useDispatch();

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

    React.useEffect(() => {
        dispatch(formatEateriesProximity());
    }, [geolocationFormatted]);

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
                        const { name, type, rating, price, address, zipCode, proximity, note } =
                            eateries[position];
                        return (
                            <tr key={index} className="eateries-table-result">
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculatePrice(price)}</td>
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
