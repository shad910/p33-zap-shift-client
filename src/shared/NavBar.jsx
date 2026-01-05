import React from 'react';
import ZapShiftLogo from './ZapShiftLogo';
import { FaArrowRight } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const NavBar = () => {

    const NavLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/services'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/about-us'>About Us</NavLink></li>
        <li><NavLink to='/Pricing'>Pricing</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
    </>

    return (
        <nav className="w-11/12 mx-auto h-20 navbar bg-[#FFFFFF] rounded-2xl">
            <section className="navbar-start">
                <Link>
                    <ZapShiftLogo />
                </Link>
            </section>

            {/* Desktop menu */}
            <section className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavLinks}
                </ul>
            </section>

            <section className="navbar-end">

                {/* Desktop buttons (hidden on mobile) */}
                <section className="hidden lg:flex space-x-3.5">
                    <Link to="/login" className='btn bg-[#CAEB66] text-black'>Sign in</Link>

                    <Link className='space-x-0'>
                        <button className='btn'>Be a Rider</button>
                        <button className='btn btn-circle text-[#CAEB66]'>
                            <FaArrowRight style={{ transform: 'rotate(-45deg)' }} />
                        </button>
                    </Link>
                </section>

                {/* Mobile dropdown */}
                <section className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-1"
                    >
                        {NavLinks}

                        {/* Mobile-only actions */}
                        <li className="mt-2">
                            <Link to="/login"  className="btn bg-[#CAEB66] text-black w-full">Sign in</Link>
                        </li>
                        <li>
                            <Link className="btn w-full">Be a Rider</Link>
                        </li>
                    </ul>
                </section>

            </section>
        </nav>
    );
};

export default NavBar;
