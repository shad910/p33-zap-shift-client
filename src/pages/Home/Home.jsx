import React from 'react';
import Banner from './components/Banner';
import HowItWorks from './components/HowItWorks';
import OurServices from './components/OurServices';
import TrustedBy from './components/TrustedBy';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <Benefits></Benefits>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;