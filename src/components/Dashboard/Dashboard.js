import React from 'react';
import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import History from '../History/History';

import data from '../../data/data-eatery.json';
export default function Dashboard() {
    const [initialData, setInitialData] = React.useState(() => data); // eslint-disable-line
    const [eateries, setEateries] = React.useState({});
    const [randomEatery, setRandomEatery] = React.useState({
        name: '',
        type: '',
        rating: 0,
        dollarSign: 0,
        zipCode: 0
    });
    const [history, setHistory] = React.useState(() =>
        localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []
    );

    //format data from array of objects into an object with keys as stringified indexes and values as objects
    const cleanUpData = function (data) {
        const output = {};
        data.forEach((eatery, index) => {
            output[index] = eatery;
        });
        setEateries(output);
    };
    //randomize eatery selection from eateries
    const eateryRandomizer = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNumber = Math.floor(Math.random() * (max - min) + min);
        setRandomEatery(eateries[randomNumber]);
        setHistory([...history, eateries[randomNumber]]);
    };

    React.useEffect(() => {
        cleanUpData(initialData);
    }, [initialData]);

    React.useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history]);

    const eateryCount = Object.keys(eateries).length;
    const { name, type, rating, dollarSign, address, zipCode } = randomEatery;
    return (
        <>
            <h1>Dashboard title</h1>
            <div>Dashboard</div>
            <Randomizer randomizeEatery={() => eateryRandomizer(0, eateryCount)} />
            <Result
                name={name}
                type={type}
                rating={rating}
                dollarSign={dollarSign}
                address={address}
                zipCode={zipCode}
            />
            <History history={history} />
            {JSON.stringify(history, 2, null)}
        </>
    );
}
