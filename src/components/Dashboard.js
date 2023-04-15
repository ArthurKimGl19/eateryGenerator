import React from 'react';
import Randomizer from './Randomizer';
import Result from './Result'
import data from '../data/data-eatery.json'
export default function Dashboard() {
    const [initialData, setInitialData] = React.useState(() => data);
    const [eateries, setEateries] = React.useState({});
    const [randomEatery, setRandomEatery] = React.useState(null);

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
        setRandomEatery(JSON.stringify(eateries[randomNumber]));
    }

    console.log("eateries", eateries)
    const eateryCount = Object.keys(eateries).length;
    return (
        <div>
            <h1>Dashboard title</h1>
            <div>Dashboard</div>
            <Randomizer randomizeEatery={() => eateryRandomizer(0, eateryCount)}/>
            <Result randomEatery={randomEatery}/>
            {JSON.stringify(eateries, 2, null)}
        </div>
    );
}
