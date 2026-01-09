import React from 'react';
import { Outlet } from 'react-router';
import ZapShiftLogo from '../shared/ZapShiftLogo';
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <section className="bg-base-200 flex flex-col lg:flex-row">
            <div className='flex-1'>
                <div className='py-6 pl-5 md:pl-6 lg:pl-12'>
                    <ZapShiftLogo></ZapShiftLogo>
                </div>
                <br />
                <div className=''>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className='hidden flex-1 lg:flex justify-center bg-[#FAFDF0] py-40'>
                <img
                    src={authImage}
                    alt='Auth Image'
                    className="max-w-sm rounded-lg"
                />
            </div>
        </section>
    );
};

export default AuthLayout;