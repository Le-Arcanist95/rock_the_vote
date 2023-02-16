import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.js';

export default function Navbar() {
    const { logout, user } = useContext(AuthContext);

    // Conditionally render JSX based on whether user is logged in or not. If logged in, display Home, Profile, About, Contact, and Logout links. If not logged in, display Home, Login, and Register links.
    if (user) {
        return (
            <nav className="flex justify-between items-center h-16 text-black relative font-mono" role="navigation">
                <NavLink to="/home" className="mx-1 text-lg bg-zinc-800 text-neutral-200 p-4 rounded-lg w-1/3 shadow-lg">Home</NavLink>
                <NavLink to="/profile" className="mx-1 text-lg bg-zinc-800 text-neutral-200 p-4 rounded-lg w-1/3 shadow-lg">Profile</NavLink>
                <NavLink to="/auth/login" className="mx-1 text-lg bg-zinc-800 text-neutral-200 p-4 rounded-lg w-1/3 shadow-lg" onClick={logout}>Logout</NavLink>
            </nav>
        )
    } else {
        return (
            <nav className="flex justify-between items-center h-16 text-black relative font-mono" role="navigation">
                <NavLink to="/home" className="mx-1 text-lg bg-zinc-800 text-neutral-200 p-4 rounded-lg w-1/2 shadow-lg">Home</NavLink>
                <NavLink to="/auth/login" className="mx-1 text-lg bg-zinc-800 text-neutral-200 p-4 rounded-lg w-1/2 shadow-lg">Login</NavLink>
            </nav>
        )
    }
}