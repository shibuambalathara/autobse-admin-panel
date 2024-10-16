import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import Sidebar_items from './sideBarData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleLeft, faCircleRight, } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate=useNavigate()
  const loc=useLocation()
  const pathNm=loc?.pathname.replace(/\//g,"")
 

  const HandleClick=(path:string)=>{
  navigate(`${path}`)
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  return (
    <div>
    {sidebarVisible ? (
      <div className=' min-h-full bg-blue-900 space-y-5 pl-3 pt-3 pr-1 shadow-xl pr-4'>
        <div className='flex justify-end'>
          <button onClick={toggleSidebar} className='text-white'>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: 24 }} />
          </button>
        </div>
        {Sidebar_items.map((item) => (
          <div key={item.path}>
            <button
              onClick={() => HandleClick(item.path)}
              className={`text-lg text-start font-bold w-full whitespace-nowrap  ${
                item.path === pathNm ? "text-red-700" : "text-white"
              }`}
            >
              {item.iconType} {item.name}
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className='bg-blue-900 h-full shadow-xl px-1'>
        <div className='flex justify-end'>
          <button onClick={toggleSidebar} className='text-white md:block hidden'>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: 24 }} />
          </button>
        </div>
        {Sidebar_items.map((item) => (
          <div key={item.path} className='my-5'>
            <button
              onClick={() => HandleClick(item.path)}
              className={`text-start font-bold w-full ${
                item.path === pathNm ? "text-red-500" : "text-white"
              }`}
            >
              {item.iconType}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Sidebar;
