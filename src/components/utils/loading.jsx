import React, { useState, useEffect } from 'react';
import { FaTruck } from 'react-icons/fa';

function LoadingAnimation() {
  const [loadingBarWidth, setLoadingBarWidth] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingBarWidth((prevWidth) => {
        if (prevWidth >= 250) {
          clearInterval(intervalId);
          return 250;
        }
        return prevWidth + 5;
      });
    }, 20);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-40 h-6 bg-gray-300 rounded-full">
        <div
          className="absolute bg-blue-500 h-full rounded-full"
          style={{ width: `${loadingBarWidth}px` }}
        ></div>
        <FaTruck
          className="absolute text-white text-2xl"
          style={{ left: `${loadingBarWidth - 20}px` }}
        />
      </div>
      <p className="ml-3 text-lg font-semibold text-center">Loading...</p>
    </div>
  );
}

export default LoadingAnimation;