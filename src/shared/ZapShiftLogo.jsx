import React from 'react';
import logo from "./../assets/logo.png";
import { Link } from 'react-router';

const ZapShiftLogo = () => {
    return (
        <Link to="/" className='flex items-end gap-0'>
            <img
                src={logo}
                alt="Zap Shift Logo"
                className='h-9 mb-1'
            />
            <h1 className='text-2xl font-extrabold'>Zap Shift</h1>
        </Link>
    );
};

export default ZapShiftLogo;