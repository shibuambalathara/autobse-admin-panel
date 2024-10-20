import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../store/authSlice';
import UserDetails from './userDetails';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOUtHandler = async () => {
    dispatch(clearAuthData());
    navigate('/login');
  };

  return (
    <div className="flex bg-blue-900 shadow-lg px-5 py-3">
      <div className="flex-1 flex items-center pl-5 font-bold">
        <Link to={''} className="text-blue-50 text-xl">
          AUTO<span className="text-orange-500">BSE</span>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <UserDetails /> {/* Using UserDetails component */}
        {/* <button className="text-white h-12 px-6 bg-orange-500 rounded border" onClick={logOUtHandler}>
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Header;
