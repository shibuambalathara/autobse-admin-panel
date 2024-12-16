import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
import { useVerifyOtpMutation } from '../../utils/graphql';
import { Toaster, toast } from 'react-hot-toast';

interface LoginForm {
  otp: string;
}

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
};

interface VerifyLoginProps {
  number: string;
}

const VerifyLogin: React.FC<VerifyLoginProps> = ({ number }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState<ToastProps | null>(null);

  // Toast function to display notifications
  const showToast = ({ message, type }: ToastProps) => {
    switch (type) {
      case 'success':
        toast.success(message, { icon: '✅' });
        break;
      case 'error':
        toast.error(message, { icon: '❌' });
        break;
      default:
        toast(message, { icon: 'ℹ️' });
    }
  };

  // Trigger toast only when message changes
  useEffect(() => {
    if (message) {
      showToast(message);
      setMessage(null); // Reset message after showing toast
    }
  }, [message]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loginData] = useVerifyOtpMutation();

  const onSubmit: SubmitHandler<LoginForm> = async (dataOnSubmit) => {
    try {
      const result = await loginData({
        variables: {
          verfiyOtpDto: { mobile: number, otp: dataOnSubmit.otp }
        },
      });

      if (!result?.data?.verifyOtp?.access_token) {
        setMessage({ message: 'No token found', type: 'error' });
      } else {
        const { access_token, user } = result.data.verifyOtp;
        dispatch(setAuthData({ token: access_token, user }));

        setMessage({ message: 'Login successful', type: 'success' });
        navigate('/users');
      }
    } catch (err) {
      console.error(err, 'error');
      setMessage({ message: 'Login failed', type: 'error' });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
    <form onSubmit={handleSubmit(onSubmit)} className=''>
            
              <div className="mt-4">
                <label htmlFor="otp" className="block text-gray-700">
                  OTP
                </label>
                <input
                  type="number"
                  {...register("otp", { required: "Please enter otp",pattern: {
                    value: /^[0-9]{4}$/, // 10 digit phone number pattern
                    message: "Please enter a valid 4-digit  number"
                  } })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter the OTP"
                />
                {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
              </div>
              <button
                type="submit"
               className="w-full bg-blue-700 opacity-80 text-white py-2 px-4 rounded-lg hover:bg-blue-800 hover:opacity-100 mt-6" 
              >
                Verify OTP
              </button>
            </form>
            </>
  );
};

export default VerifyLogin;
