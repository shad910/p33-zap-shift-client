import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

            <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-error/10 p-4 rounded-full">
                        <FaLock className="text-error text-4xl" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-error mb-2">
                    403 Forbidden
                </h1>

                {/* Message */}
                <p className="text-gray-500 mb-6">
                    You do not have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    <Link
                        to="/"
                        className="btn btn-primary text-black w-full sm:w-auto"
                    >
                        Go Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="btn btn-outline w-full sm:w-auto"
                    >
                        Go Dashboard
                    </Link>

                </div>

            </div>

        </div>

    );
};

export default Forbidden;