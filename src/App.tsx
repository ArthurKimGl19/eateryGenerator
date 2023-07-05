import React, { Suspense, lazy, ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';

const NavbarComponent = lazy(() => import('./components/Navbar/Navbar'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage/HistoryPage'));
const EateriesPage = lazy(() => import('./pages/EateriesPage/EateriesPage'));
const DataPage = lazy(() => import('./pages/DataPage/DataPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(): ReactElement | null {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="fallback-loading">
                        <Loading />
                    </div>
                }>
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
            </Suspense>
        </BrowserRouter>
    );
}
