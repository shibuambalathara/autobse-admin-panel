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
        <div className="w-full  mx-8">
         
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8 text-center">
            Sorry, we couldn't find any data you're looking for.
          </p>
          
        </div>

        {/* Image Section */}
      
      </div>
    </div>
  );
};

export default NotFoundPage;
