import React, { useState } from 'react';
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearAuthData } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown open/close
  };

  const handleLogout = async () => {
    // Dispatch the action to clear auth data
    dispatch(clearAuthData());

    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="relative flex items-center space-x-2 border-2 rounded-lg p-2 w-48 text-white">
      <FaUserCircle size="2em" />
      <div className="">
        {/* Dropdown button */}
        <button
          onClick={toggleDropdown} // Toggle dropdown on button click
          className="flex items-center gap-7 pl-4 font-bold focus:outline-none"
          id="user-menu"
          aria-haspopup="true"
        >
          {user?.firstName || 'Guest'}
          <span className="pl-2 pt-1">
            <FaChevronDown />
          </span>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && ( // Conditionally render dropdown menu based on `isDropdownOpen`
          <div className="absolute right-0  mt-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-1 text-sm text-gray-700">
              <li className="px-4 py-2">
                {user?.firstName || 'Guest'}
              </li>
              <li className="px-4 py-2">
                Role: {user?.role || 'Role'}
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout <FiLogOut className="inline ml-2" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
