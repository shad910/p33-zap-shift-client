import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-20 md:w-28 lg:w-36">
        <Lottie animationData={loadingAnimation} loop />
      </div>
    </div>
  );
};

export default Loading;