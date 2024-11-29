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


export  const ClearButton = ({funct}) => {
  
  const handleClearFilters = () => {
   funct()
  };

return<>
<button
className="bg-red-600 text-white h-10 place-self-end px-6 font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 p-2 border text-sm w-fit"
onClick={handleClearFilters}
>
Clear
</button>
</>

}