import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* Header Section */}
            <header className='flex-1'>
                <NavBar></NavBar>
            </header>

            {/* Main Section */}
            <main className='flex-1'>
                <Outlet></Outlet>
            </main>

            {/* Footer Section */}
            <footer className='flex-1'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;