import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import ZapShiftLogo from '../shared/ZapShiftLogo';
import { IoMdArrowBack } from 'react-icons/io';
import { FiUser, FiPackage, FiCreditCard, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { FaBan, FaUserShield } from 'react-icons/fa';

import Loading from '../shared/Loading';
import useUserRole from '../hooks/useUserRole';


const DashboardLayout = () => {

    const { role, loading, error } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">

                <div class="drawer-content">
                    {/* NavBar for Dashboard */}
                    <nav class="navbar w-full bg-base-300 flex justify-between">
                        <div>
                            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <Link to='/dashboard/my-parcels' class="px-4 font-bold text-xl">Dashboard</Link>
                        </div>
                        <button onClick={() => window.history.back()} className="btn btn-sm btn-primary text-black"><IoMdArrowBack spacing={0} />Back</button>
                    </nav>

                    {/* Page content here */}
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul id='dashboard-links' className="menu bg-base-200 min-h-full w-52 p-2.5">
                    <li className='mb-5'>
                        <ZapShiftLogo></ZapShiftLogo>
                    </li>

                    {/* Sidebar content here */}
                    <li>
                        <NavLink
                            to='/dashboard/profile'
                            className="flex items-center font-bold"
                        >
                            <FiUser className="mr-0.5 font-bold" size={16} /> Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/dashboard/my-parcels'
                            className="flex items-center font-bold"
                        >
                            <FiPackage className="mr-0.5 font-bold" size={16} /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/dashboard/payment-history'
                            className="flex items-center font-bold"
                        >
                            <FiCreditCard className="mr-0.5 font-bold" size={16} /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/dashboard/track-parcel'
                            className="flex items-center font-bold"
                        >
                            <FiMapPin className="mr-0.5 font-bold" size={16} /> Track Parcel
                        </NavLink>
                    </li>


                    {!loading && role==="admin" &&
                        <>
                            <li>
                                <NavLink
                                    to='/dashboard/active-riders'
                                    className="flex items-center font-bold"
                                >
                                    <FiUsers className="mr-0.5 font-bold" size={16} /> Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/deactive-riders'
                                    className="flex items-center font-bold"
                                >
                                    <FaBan className="mr-0.5 font-bold" size={16} /> Deactive Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/pending-riders'
                                    className="flex items-center font-bold"
                                >
                                    <FiClock className="mr-0.5 font-bold" size={16} /> Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/make-admin"
                                    className="flex items-center font-bold"
                                >
                                    <FaUserShield className="mr-0.5 font-bold" size={16} />
                                    All Users
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;