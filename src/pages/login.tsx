import React, { useState, useEffect } from 'react';
import LoginCom from '../components/loginComponents/loginCom';
import OtpLogin from '../components/loginComponents/otpLogin';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [activeTab, setActiveTab] = useState<'login' | 'otp'>('login');

  // Show toast if message is available
  useEffect(() => {
    if (message) {
      toast.error(message, {
        icon: '⚠️',
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [message]);

  // Function to handle tab switch
  const handleTabChange = (tab: 'login' | 'otp') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Toaster for notifications */}
      <Toaster />

      {/* Left Pane */}
      <div className="hidden lg:flex items-center justify-center bg-blue-800 text-black w-5/12">
        <div className="max-w-md text-center flex items-center">
          <h1 className="text-white text-5xl font-extrabold my-auto">
            Auto<span className="text-orange-500">bse</span>
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="524.67004"
            height="531.39694"
            className="w-full"
            viewBox="0 0 524.67004 531.39694"
          >
            <polygon
              points="117.67523 88.74385 113.67523 109.74385 133.61763 115.36589 131.1398 92.94604 117.67523 88.74385"
              fill="#a0616a"
            />
            <path
              d="M0,523.44458c0,.66003,.53003,1.19,1.19006,1.19H523.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z"
              fill="#3f3d56"
            />
            {/* Additional SVG paths */}
          </svg>
        </div>
      </div>

      {/* Right Pane with Tabs */}
      <div className="flex flex-col justify-center items-center flex-1 w-2/3">
        <div className="bg-white shadow-lg rounded-lg p-6 w-fit">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 text-center py-2 w-56 px-4 rounded-t-lg ${
                activeTab === 'login' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 text-center py-2 px-4 rounded-t-lg ${
                activeTab === 'otp' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleTabChange('otp')}
            >
              Login with OTP
            </button>
          </div>

          {/* Content for Login */}
          {activeTab === 'login' && <LoginCom />}

          {/* Content for Login with OTP */}
          {activeTab === 'otp' && <OtpLogin />}
        </div>
      </div>
    </div>
  );
};
