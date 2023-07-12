import React, { ReactElement } from 'react';
import BTable from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { FaLocationDot } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { calculatePrice } from '../../helpers/priceFunctions';
import { cleanUpData } from '../../helpers/dataFunctions';
import { EateryInterface } from '../../shared/interfaces/eatery.interface';
import { formatEateriesProximity } from '../../redux/features/eateries/eateriesSlice';
import { showDirections } from '../../helpers/directionFunctions';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import './Eateries.css';

export default function Eateries(): ReactElement | null {
    const data = useAppSelector((state) => state.eateries.eateries);
    const [eateries, setEateries] = React.useState<EateryInterface[]>(cleanUpData(data));
    const [cleanedData] = React.useState<EateryInterface[]>(cleanUpData(data));
    const geolocationFormatted = useAppSelector((state) => state.eateries.geolocationFormatted);
    const dispatch = useAppDispatch();
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
        setEateries(cleanUpData(data));
    }, [data]);

    React.useEffect(() => {
        dispatch(formatEateriesProximity());
    }, [geolocationFormatted]);

    const eateriesCount = eateries.length;
    return (
        <Container className="eateries-container">
            <Container className="eateries-container-filters-sort">
                <Filters
                    eateries={eateries}
                    setEateries={setEateries}
                    initialEateries={cleanedData}
                />
                <Sort eateries={eateries} setEateries={setEateries} />
            </Container>
            <h4>Eateries ({eateriesCount})</h4>
            <BTable striped bordered hover responsive size="sm" className="eateries-table">
                <thead>
                    <tr className="eateries-table-header">
                        {tableHeader.map((header, index) => {
                            return <td key={index}>{header}</td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {eateries.map((eatery) => {
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
                            <tr key={uuidv4()} className="eateries-table-result">
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculatePrice(price)}</td>
                                <td>
                                    {address}
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
