import "./NavBar.css";
import React from "react";
import ZapShiftLogo from "../ZapShiftLogo";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeController from "../ThemeController";


const NavBar = () => {

    const { user, logOut } = useAuth();

    const NavLinks = (
        <>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/pricing">Pricing</NavLink></li>
            <li><NavLink to="/track-order">Track Order</NavLink></li>
            <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
            <li><NavLink to="/be-a-rider">Be a Rider</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>

        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <nav id="nav" className="md:w-11/12 mx-auto navbar  rounded-2xl px-4">

            {/* Left */}
            <div className="navbar-start">
                <ZapShiftLogo />
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2">
                    {NavLinks}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end gap-2.5">

                <ThemeController></ThemeController>

                {/* Desktop Buttons */}
                {user
                    ? ""
                    : <div className="hidden lg:flex gap-3">
                        <Link to="/login" className="btn bg-[#CAEB66] text-black">
                            Sign in
                        </Link>

                        <div className="flex">
                            <button className="btn rounded-r-none">Be a Rider</button>
                            <button className="btn btn-circle rounded-full text-[#CAEB66]">
                                <FaArrowRight className="-rotate-45" />
                            </button>
                        </div>
                    </div>}

                {/* Avatar Dropdown */}
                {
                    user && <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow z-50 "
                        >
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <div className="lg:hidden">
                                {NavLinks}
                            </div>
                            <li><a>Be a Rider</a></li>
                            <li><a onClick={handleLogOut} className="hover:bg-red-400">Logout</a></li>
                        </ul>
                    </div>
                }

                {/* Mobile View without User */}
                {user ? "" : <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {NavLinks}
                        <li>
                            <Link to="/login" className="hover:bg-[#CAEB66] text-black">
                                Sign in
                            </Link>
                        </li>
                    </ul>
                </div>}

            </div>
        </nav>
    );
};

export default NavBar;
