import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import History from './components/History/History';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearHistory, clearRandomEatery } from './redux/features/eateries/eateriesSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function App() {
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();

    return (
        <BrowserRouter>
            <div className="App">
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/history"
                        element={
                            <History
                                history={history}
                                clearHistory={() => {
                                    dispatch(clearHistory());
                                    dispatch(clearRandomEatery());
                                }}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
