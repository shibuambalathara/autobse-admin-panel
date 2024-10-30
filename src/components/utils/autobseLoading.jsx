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
    },20); // Adjust interval time to control animation speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=' flex items-center h-lvh-60   justify-center'>
      <h1 className="animated-text text-center ">
        <span className="auto-text text-blue">{text.slice(0, 7)}</span>
        <span className="bse-text">{text.slice(7)}</span>
      </h1>
    </div>
  );
}

export default AutobseLoading;