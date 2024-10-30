import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export const Toast = ({ message, type }) => {
  const baseStyle = "py-1 px-4 rounded-lg text-center shadow-md transition-opacity duration-300 flex items-center absolute top-10 ";
  const typeStyle = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };
  const iconStyle = "mr-2 text-lg";
  const icons = {
    success: <FaCheck className={iconStyle} />,
    error: <FaTimes className={iconStyle} />,
    info: null, // No icon for info, or you can add one if you prefer
  };

  return (
    <div className={`${baseStyle} ${typeStyle[type]}`}>
      {icons[type]}
      {message}
    </div>
  );

};
