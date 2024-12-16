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
    if (message !== undefined) {
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
    <body className="flex font-poppins items-center justify-center">
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
    <div className="grid gap-8">
      <div
        id="back-div"
        className="bg-gradient-to-r from-blue-800 to-orange-500 rounded-[26px] m-4"
      >
        <div
          className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
      {/* Toaster for notifications */}
      {message !== undefined&&
         <Toaster />
         }

    

      {/* Right Pane with Tabs */}
      <div className="flex flex-col justify-center items-center flex-1 space-y-2 ">
      <h1 className="text-blue-800 text-5xl font-extrabold my-auto">
            Auto<span className="text-orange-500">bse</span>
          </h1>
        <div className="bg-white  shadow-xl border-2 rounded-lg p-6 w-fit">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 text-center py-2 w-56 px-4 rounded-t-lg ${
                activeTab === 'login' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 text-center py-2 px-4 rounded-t-lg ${
                activeTab === 'otp' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'
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
    </div>
    </div>
    </div>
    </body>
  );
};
