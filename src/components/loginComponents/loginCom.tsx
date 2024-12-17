// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
import { useLoginMutation } from '../../utils/graphql';
import { Toaster, toast } from 'react-hot-toast';

interface LoginForm {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, { data, loading, error }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error) {
      toast.error('Login failed. Please try again.', {
        icon: '⚠️',
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginForm> = async (dataOnSubmit) => {
    try {
      const result = await loginData({
        variables: {
          loginInput: { mobile: dataOnSubmit.userName, password: dataOnSubmit.password }
        },
      });
  
      if (!result?.data?.login?.access_token) {
        setMessage('No token found');
      } else {
        const { access_token, user } = result.data.login;
        dispatch(setAuthData({ token: access_token, user: user ?? null })); // Set user to null if undefined
  
        // Redirect to the homepage
        navigate('/users');
        window.location.reload();
      }
    } catch (err) {
      console.error(err, 'error');
      setMessage(String(err));
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 h-58'>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700">
            Mobile
          </label>
          <input
            {...register("userName", { required: "Please enter mobile number" })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            placeholder="Enter mobile number"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Please enter your password" })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <a
              className="group text-blue-400 transition-all duration-100 ease-in-out mb-4"
              href="/"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password?
              </span>
            </a>

        <button
          type="submit"
          className="w-full bg-blue-800 opacity-80 text-white py-2 px-4 rounded-lg hover:bg-blue-800 hover:opacity-100 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Login;
