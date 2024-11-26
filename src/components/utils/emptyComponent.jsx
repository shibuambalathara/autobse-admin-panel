import React, { useState, useEffect } from 'react';

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 5 seconds
    }, 300);

    return () => clearTimeout(timer); // Cleanup timer when the component unmounts
  }, []);

  if (isLoading) {
    return <></>
  }
  return (
    <div className=" w-1/2 flex items-center mx-auto h-fit mt-20">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 mx-8">
          <h1 className="text-7xl text-red-600 font-extrabold mb-8">oops...</h1>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry, we couldn't find any data you're looking for.
          </p>
          
        </div>

        {/* Image Section */}
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            alt="Page not found"
            width="500"
            height="500"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
