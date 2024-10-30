// src/components/Login.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
import { useLoginMutation } from '../../utils/graphql';

interface LoginForm {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loginData, { data, loading, error }] = useLoginMutation();

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
        dispatch(setAuthData({ token: access_token, user }));

        // Redirect to the homepage
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      console.error(err, 'error');
      setMessage('Login failed');
    }
  };

  return (
    // <div className="relative flex flex-col justify-center align-middle m-auto min-h-screen w-96">
    //   <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl max-w-xl">
    //     <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
    //       Sign in
    //       {message && <p className='text-[#F70000]'>{message}</p>}
    //     </h1>
    //     <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
    //       <div className="mb-2">
    //         <label
    //           htmlFor="userName"
    //           className="block text-sm font-semibold text-gray-800"
    //         >
    //           Mobile
    //         </label>
    //         <input
    //           {...register("userName", { required: true })}
    //           className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //         />
    //         <p className='text-[#F70000]'>
    //           {errors.userName && <span>This field is required</span>}
    //         </p>
    //       </div>
    //       <div className="mb-2">
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-semibold text-gray-800"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           {...register("password", { required: true })}
    //           className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //         />
    //         <p className='text-[#F70000]'>
    //           {errors.password && <span>This field is required</span>}
    //         </p>
    //       </div>
    //       <div className="mt-6">
    //         <button
    //           type='submit'
    //           className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
    //         >
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>


    <>
    <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  mobile
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
                  {...register("password", { required: "Please Enter your password" })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter your password"
                />
                {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
    
    </>
  );
};

export default Login;
