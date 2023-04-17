import React from 'react';
import BTable from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './History.css';

export default function History({ history, clearHistory }) {
    const tableHeader = ['number', 'name', 'type', 'rating', 'dollar sign', 'zip code'];

    const calculateDollarSign = (number) => {
        let result = '';
        for (let i = 0; i < number; i++) {
            result += '$';
        }
        return result;
    };
    return (
        <>
            <h2>Randomizer History</h2>
            <Button onClick={clearHistory}>Clear History</Button>
            <BTable striped bordered hover size="sm" className="history-table">
                <thead>
                    <tr className="history-table-header">
                        {tableHeader.map((header, index) => {
                            return <td key={index}>{header}</td>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {history.map((eatery, index) => {
                        const { name, type, rating, dollarSign, zipCode } = eatery;
                        return (
                            <tr key={index} className="history-table-result">
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{rating}</td>
                                <td>{calculateDollarSign(dollarSign)}</td>
                                <td>{zipCode}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
        </>
    );
}

History.propTypes = {
    history: PropTypes.array.isRequired,
    clearHistory: PropTypes.func.isRequired
};
