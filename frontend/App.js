import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import EateriesPage from './pages/EateriesPage/EateriesPage';
import DataPage from './pages/DataPage/DataPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/eateries" element={<EateriesPage />} />
                    <Route path="/data" element={<DataPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
