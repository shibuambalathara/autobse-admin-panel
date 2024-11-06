import React, { useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface CustomToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number; // duration in milliseconds
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [duration, onClose]);

  const baseStyle = "py-1 px-4 rounded-lg text-center shadow-md transition-opacity duration-300 flex items-center absolute top-10 left-1/2 transform -translate-x-1/2 mt-10";
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

export default CustomToast;
