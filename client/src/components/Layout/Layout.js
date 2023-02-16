import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div>
            <Header />
            <hr className='shadow-lg'/>
            <Outlet />
            <Footer />
        </div>
    );
};