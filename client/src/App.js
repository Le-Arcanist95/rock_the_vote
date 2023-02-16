import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout.js';
import Auth from './components/pages/Auth.js';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import ProtectedRoute from './components/ProtectedRoute.js';
import AuthContext from './context/AuthProvider.js';

export default function App() {
    const { accessToken } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={ accessToken ? <Navigate to="/home" /> : <Navigate to="/auth/login" />} />
                <Route path="/auth/login" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Route>
        </Routes>
    )
}