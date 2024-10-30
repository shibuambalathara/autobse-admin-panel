import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
import { useSendOtpMutation } from '../../utils/graphql';
import VerifyLogin from './verifyOtp';

interface LoginForm {
  userName: string;
}

const OtpLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(true);
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loginData, { data, loading, error }] = useSendOtpMutation();

  const onSubmit: SubmitHandler<LoginForm> = async (dataOnSubmit) => {
    try {
      const result = await loginData({
        variables: {
          sendOtpDto: { mobile: dataOnSubmit.userName }
        },
      });
      console.log(result);
      
      setOtp(false);
      setMobile(dataOnSubmit.userName);
    } catch (err) {
      console.error(err, 'error');
      setMessage('Login failed');
    }
  };

  return (
    <>
      {otp ? 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("userName", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // 10 digit phone number pattern
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Enter your phone number"
            />
            {/* Display validation error */}
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black opacity-80 text-white py-2 px-4 rounded-lg hover:bg-black hover:opacity-100"
          >
            Send OTP
          </button>
        </form>
      :
        <VerifyLogin number={mobile} />}
    </>
  );
};

export default OtpLogin;
