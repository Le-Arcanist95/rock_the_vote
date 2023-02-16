import React from 'react';
import Navbar from './Navbar';

export default function Header() {
    // Render a header element with the h1 "Rock the Vote!" and the Navbar component. Align the h1 to the left and the Navbar to the right with space between them. On smaller screens, align the h1 in the center above the Navbar and give it a margin of 1rem.

    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-stone-700">
            {/* Add h1 with large and bold text. Give letters boxshadow to have them coming off the page. Give element shadow as well. */}
            <h1 className="text-4xl font-bold bg-zinc-800 text-neutral-200 shadow-lg p-3 rounded-xl">Rock the Vote!</h1>
            <Navbar />
        </header>
    );
}
