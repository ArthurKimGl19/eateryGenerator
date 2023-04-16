import React from 'react';

export default function Result({ name, type, rating, dollar_sign, zip_code }) {
    return (
        <div>
            <h1>Result Card title</h1>
            <h2>Name: {name}</h2>
            <div>Type: {type}</div>
            <div>Rating: {rating}</div>
            <div>Dollar Sign: {dollar_sign}</div>
            <div>Zip Code: {zip_code}</div>
            {/*<div>random eatery: {randomEatery}</div>*/}
        </div>
    );
}