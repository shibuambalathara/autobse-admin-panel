import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomButton = ({ navigateTo, buttonText }) => {
  const navigate = useNavigate();

  return (
    <div className="text-end  ">
      <button
        onClick={() => navigate(navigateTo)}
        className=" mt-2 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CustomButton