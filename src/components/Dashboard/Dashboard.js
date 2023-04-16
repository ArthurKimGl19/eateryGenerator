import React from 'react';
import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import History from '../History/History';

import data from '../../data/data-eatery.json';

const decodeLocalStorageKey = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return localStorage.getItem(key);
    }
};
const useLocalStorage = function (key, value) {
    const [state, setState] = React.useState(() =>
        localStorage.getItem(key) ? decodeLocalStorageKey(key) : value
    );
    React.useEffect(() => {
        if (typeof state === 'object') {
            localStorage.setItem(key, JSON.stringify(state));
        } else {
            localStorage.setItem(key, state);
        }
    }, [state]);
    return [state, setState];
};
export default function Dashboard() {
    const [initialData, setInitialData] = useLocalStorage('initialData', data); // eslint-disable-line
    const [eateries, setEateries] = useLocalStorage('eateries', {});
    const [randomEatery, setRandomEatery] = React.useState({
        name: '',
        type: '',
        rating: 0,
        dollarSign: 0,
        zipCode: 0
    });
    const [history, setHistory] = useLocalStorage('history', []);

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

    const clearHistory = function () {
        setHistory([]);
    };

    React.useEffect(() => {
        cleanUpData(initialData);
    }, []);

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
            <History history={history} clearHistory={clearHistory} />
            {JSON.stringify(history, 2, null)}
        </>
    );
}
