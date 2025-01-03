import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar_items from './sideBarData';

const Sidebar: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const loc = useLocation();
  const pathNm = loc?.pathname.replace(/\//g, "");

  const handleClick = (path: string) => {
    navigate(`${path}`);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className=''>
      {sidebarVisible ? (
        <div className='h-full min-h-lvh bg-blue-900 space-y-5 pl-3 pt-3  shadow-xl pr-4   '>
          <div className='flex justify-end'>
            <button onClick={toggleSidebar} className='text-white'>
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: 20 }} />
            </button>
          </div>
          {Sidebar_items.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => handleClick(item.path)}
                className={`text-lg flex items-center justify-start gap-2 font-bold w-full whitespace-nowrap ${
                  item.path === pathNm ? "text-red-700" : "text-white"
                }`}
              >
                <div className='w-7'> <FontAwesomeIcon icon={item.iconType} className="" style={{ fontSize: 20 }} /> </div>
                {item.name}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-blue-900 h-full min-h-lvh shadow-xl px-2 py-1 space-y-5 '>
          <div className='flex justify-end'>
            <button onClick={toggleSidebar} className='text-white md:block hidden mx-auto'>
              <FontAwesomeIcon icon={faBars} style={{ fontSize: 20 }} />
            </button>
          </div>
          {Sidebar_items.map((item) => (
            <div key={item.path} className='my-5 relative group'>
              <button
                onClick={() => handleClick(item.path)}
                className={`text-center font-bold w-full ${
                  item.path === pathNm ? "text-red-500" : "text-white"
                }`}
              >
                <FontAwesomeIcon icon={item.iconType} style={{ fontSize: 20 }} />
              </button>
              <div className="absolute left-full text-nowrap ml-2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-sm px-2 py-1 rounded">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
