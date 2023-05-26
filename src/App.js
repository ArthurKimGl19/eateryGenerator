import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import History from './components/History/History';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
