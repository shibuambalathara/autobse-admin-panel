import React, { useEffect, useState } from 'react';

function AutobseLoading() {
  const [text, setText] = useState('');

  useEffect(() => {
    const textToAnimate = 'LOADING...';
    let i = 0;
    const intervalId = setInterval(() => {
      setText(textToAnimate.substring(0, i + 1));
      i++;
      if (i === textToAnimate.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust interval time to control animation speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    // <div className="flex items-center h-screen justify-center bg-gray-100">
    //   <div className="flex flex-col items-center">
    //     <div className="loader mb-4"></div>
    //     <h1 className="animated-text text-center text-4xl font-bold text-blue-500">
    //       <span className="auto-text">{text.slice(0, 7)}</span>
    //       <span className="bse-text text-orange-500">{text.slice(7)}</span>
    //     </h1>
    //   </div>
    // </div>
    <div className="relative flex items-center h-screen justify-center bg-gray-100 w-full">
        <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
        <div
            className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent">
        </div>
    </div>
  );
}

export default AutobseLoading;
