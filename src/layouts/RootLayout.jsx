import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import NavBar from '../shared/Navbar/NavBar';
import Footer from '../shared/Footer/Footer';
import Loading from '../shared/Loading';

const RootLayout = () => {

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Header Section */}
            <header className='flex-1'>
                <NavBar></NavBar>
            </header>

            {/* Main Section */}
            <main className='flex-1'>
                {isNavigating && <Loading />}
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