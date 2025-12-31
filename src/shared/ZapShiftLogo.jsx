import React from 'react';
import logo from "./../assets/logo.png";

const ZapShiftLogo = () => {
    return (
        <div className='flex items-end gap-0'>
            <img className='h-9 mb-1' src={logo} alt="Zap Shift Logo" />
            <h1 className='text-2xl font-extrabold'>Zap Shift</h1>
        </div>
    );
};

export default ZapShiftLogo;