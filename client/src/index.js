import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { AuthProvider } from './context/AuthProvider';
import { DataProvider } from './context/DataProvider';
import App from './App';
import './index.css';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <DataProvider>
                    <Routes>
                        <Route exact path="/*" element={<App />} />
                    </Routes>
                </DataProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);