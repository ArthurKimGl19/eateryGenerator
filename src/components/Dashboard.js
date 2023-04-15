import React from 'react';
import Randomizer from './Randomizer';
import Result from './Result'
import data from '../data/data-eatery.json'
export default function Dashboard() {
    const [initialData, setInitialData] = React.useState(() => data);
    const [eateries, setEateries] = React.useState({});
    const [randomEatery, setRandomEatery] = React.useState({
        name: null,
        type: null,
        rating: null,
        dollar_sign: null,
        zip_code: null
    });

    React.useEffect(() => {
        cleanUpData(initialData);
    }, [initialData])
    function cleanUpData (data){
        //format data from array of objects into an object with keys as stringified indexes and values as objects
        const output = {};
        data.forEach((eatery, index) => {
            output[index] = eatery;
        });
        setEateries(output);
    }
    function eateryRandomizer(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNumber = Math.floor(Math.random() * (max - min) + min);
        setRandomEatery(eateries[randomNumber]);
    }

    const eateryCount = Object.keys(eateries).length;
    const { name, type, rating, dollar_sign, address, zip_code } = randomEatery;
    console.log('random', randomEatery);
    console.log('name, type, rating, dollar_sign, address, zip_code', name, type, rating, dollar_sign, address, zip_code)
    return (
        <div>
            <h1>Dashboard title</h1>
            <div>Dashboard</div>
            <Randomizer randomizeEatery={() => eateryRandomizer(0, eateryCount)}/>
            <Result name={name} type={type} rating={rating} dollar_sign={dollar_sign} address={address} zip_code={zip_code}/>
            {JSON.stringify(eateries, 2, null)}
        </div>
    );
}
