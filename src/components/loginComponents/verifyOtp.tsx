// src/components/Login.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
import { useVerifyOtpMutation } from '../../utils/graphql';

interface LoginForm {
 
  otp: string;
}

interface VerifyLoginProps {
  number: string;
}

const VerifyLogin: React.FC<VerifyLoginProps> = ({ number }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loginData, { data, loading, error }] =useVerifyOtpMutation();

  const onSubmit: SubmitHandler<LoginForm> = async (dataOnSubmit) => {
    try {
      const result = await loginData({
        variables: {
            verfiyOtpDto: { mobile:number, otp:dataOnSubmit.otp }
        },
      });
      console.log(result ,'result');
      
      if (!result?.data?.verifyOtp?.access_token) {
        setMessage('No token found');
      } else {
        const { access_token, user } = result.data.verifyOtp;
        dispatch(setAuthData({ token: access_token, user }));

        // Redirect to the homepage
        navigate('/');
        // window.location.reload();
      }
    } catch (err) {
      console.error(err, 'error');
      setMessage('Login failed');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
            
              <div className="mt-4">
                <label htmlFor="otp" className="block text-gray-700">
                  OTP
                </label>
                <input
                  type="number"
                  {...register("otp", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter the OTP"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
              >
                Verify OTP
              </button>
            </form>
            </>
  );
};

export default VerifyLogin;
