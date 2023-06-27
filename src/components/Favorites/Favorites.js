import React from 'react';
import { Container } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import { calculatePrice } from '../../helpers/priceFunctions';
import { showDirections } from '../../helpers/directionFunctions';
import { cleanUpData } from '../../helpers/dataFunctions';
import { formatFavoriteProximity } from '../../redux/features/eateries/eateriesSlice';
import './Favorites.css';

export default function Favorites() {
    const data = useSelector((state) => state.favorites);
    const [favorites, setFavorites] = React.useState(cleanUpData(data));
    const [cleanedData] = React.useState(cleanUpData(data));
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
        dispatch(formatFavoriteProximity());
    }, [geolocationFormatted]);

    const favoritesCount = favorites.length;
    return (
        <Container className="eateries-container">
            <Container className="eateries-container-filters-sort">
                <Filters
                    eateries={favorites}
                    setEateries={setFavorites}
                    initialEateries={cleanedData}
                />
                <Sort eateries={favorites} setEateries={setFavorites} />
            </Container>
            <h4>Favorites ({favoritesCount})</h4>
            <BTable striped bordered hover responsive size="sm" className="eateries-table">
                <thead>
                    <tr className="eateries-table-header">
                        {tableHeader.map((header, index) => {
                            return <td key={index}>{header}</td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {favorites.map((eatery) => {
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
