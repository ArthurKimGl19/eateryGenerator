import React from 'react';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import { calculatePrice } from '../../helpers/priceFunctions';
import { showDirections } from '../../helpers/directionFunctions';
import { formatEateriesProximity } from '../../redux/features/eateries/eateriesSlice';
import './Eateries.css';

export default function Eateries() {
    const data = useSelector((state) => state.eateries);
    const [eateries, setEateries] = React.useState({ ...data });
    const geolocationFormatted = useSelector((state) => state.geolocationFormatted);
    const dispatch = useDispatch();

    const tableHeader = [
        'name',
        'type',
        'rating',
        'price',
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
            <Container className="eateries-container-filters-sort">
                <Filters eateries={eateries} setEateries={setEateries} initialEateries={data} />
                <Sort eateries={eateries} setEateries={setEateries} initialEateries={data} />
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
                            price,
                            address,
                            zipCode,
                            proximity,
                            note,
                            latitude,
                            longitude
                        } = eateries[position];
                        return (
                            <tr key={index} className="eateries-table-result">
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculatePrice(price)}</td>
                                <td>
                                    {address}
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        onClick={() => showDirections(latitude, longitude)}
                                        className="map-icon"
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
