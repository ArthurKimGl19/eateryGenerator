import React from 'react';
import Randomizer from '../Randomizer/Randomizer';
import Result from '../Result/Result';
import History from '../History/History';
import { useSelector, useDispatch } from 'react-redux';
import {
    createRandomEatery,
    updateHistory,
    clearHistory,
    clearRandomEatery
} from '../../redux/eateriesSlice';

// const decodeLocalStorageKey = function (key) {
//     try {
//         return JSON.parse(localStorage.getItem(key));
//     } catch (e) {
//         return localStorage.getItem(key);
//     }
// };
// const useLocalStorage = function (key, value) {
//     const [state, setState] = React.useState(() =>
//         localStorage.getItem(key) ? decodeLocalStorageKey(key) : value
//     );
//     React.useEffect(() => {
//         if (typeof state === 'object') {
//             localStorage.setItem(key, JSON.stringify(state));
//         } else {
//             localStorage.setItem(key, state);
//         }
//     }, [state]);
//     return [state, setState];
// };
export default function Dashboard() {
    const eateries = useSelector((state) => state.eateries);
    const randomEatery = useSelector((state) => state.randomEatery);
    const history = useSelector((state) => state.history);
    console.log('dashboard eateries', eateries);
    const dispatch = useDispatch();
    const eateryRandomizer = function () {
        dispatch(createRandomEatery());
        dispatch(updateHistory());
    };

    const { name, type, rating, dollarSign, address, zipCode } = randomEatery;
    return (
        <>
            <h1>Dashboard title</h1>
            <div>Dashboard</div>
            <Randomizer randomizeEatery={() => dispatch(eateryRandomizer())} />
            <Result
                name={name}
                type={type}
                rating={rating}
                dollarSign={dollarSign}
                address={address}
                zipCode={zipCode}
            />
            <History
                history={history}
                clearHistory={() => {
                    dispatch(clearHistory());
                    dispatch(clearRandomEatery());
                }}
            />
            {JSON.stringify(history, 2, null)}
        </>
    );
}
