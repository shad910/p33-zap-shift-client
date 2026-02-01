import React from 'react';
import Banner from './components/Banner';
import HowItWorks from './components/HowItWorks';
import OurServices from './components/OurServices';
import TrustedBy from './components/TrustedBy';
import Benefits from './components/Benefits';
import BeMerchant from './components/BeMerchant';
import Reviews from './components/reviews/Reviews';
import FAQ from './components/FAQ';




const Home = () => {
    return (
        <section className=''>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
            <Reviews></Reviews>
            <FAQ></FAQ>
        </section>
    );
};

export default Home;