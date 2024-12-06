/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Lottie from 'lottie-react';
import loginGif from '@/Animation - 1724607496135.json';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
// import { RootState } from '@/redux/store';
// import { setEmail, setPassword } from '@/redux/features/loginSlice';
import { useLoginMutation } from '@/redux/api/auth/authApi';
import {jwtDecode} from 'jwt-decode';
import { setRole, setToken, setUser } from '@/redux/features/userSlice';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // Initialize useForm with default values and validation rules
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur', // or 'onChange'
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, password } = data;
      const { data: loginData } = await login({ email, password });
      const { token ,data:logindata} = loginData;

      const user = jwtDecode(token);
      console.log('Logged in user', user);
      toast.success('Logged in successfully', { duration: 2000 });
      dispatch(setToken(token));
      dispatch(setRole(logindata.role));
      
      dispatch(setUser(user));
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Login Form Section */}
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-white">Login to Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: 'Password is required' })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2 w-full"
            >
              Log In
            </button>
          </form>
          <Link to={"/signup"}>
            <div className="mt-4 text-center">
              <p className="text-sm text-white">
                Don't have an account?{' '}
                <Link to={"/signup"} className="text-red-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Animated GIF Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-black">
        <Lottie animationData={loginGif} />
      </div>
    </div>
  );
};

export default Login;