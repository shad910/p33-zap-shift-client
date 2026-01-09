import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/animations/error.json";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      {/* Lottie Animation */}
      <div className="w-64 md:w-80">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* Error Text */}
      <h1 className="text-4xl font-bold mt-4 mb-2">Error 404</h1>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Go Home Button */}
      <Link to="/">
        <button className="btn btn-primary text-black mb-4">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
