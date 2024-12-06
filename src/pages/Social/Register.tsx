/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import registerGif from "@/Animation - 1724608571023.json";
import {  useAppSelector } from "@/redux/hooks";

import { RootState } from "@/redux/store";

import { toast } from "sonner";
import { useSignUpMutation } from "@/redux/api/auth/authApi";

// Define validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const { name, email, password, phone, address } = useAppSelector(
    (state: RootState) => state.register
  );
  const [signup] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name,
      email,
      password,
      phone,
      address,
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (!selectedFile) {
      setFileError("Please select an image file.");
    } else {
      setFileError(null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!file) {
      setFileError("Please select an image file.");
      return;
    }

    const loadingToastId = "uploading-toast";
    toast.loading("Uploading photo, please wait...", {
      id: loadingToastId,
    });

    const formData = new FormData();
    formData.append('file', file as File);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "djbpo9xg5");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromCloud = await response.json();
      const image = dataFromCloud.secure_url;

      await signup({ ...data, image });
      toast.success("Registration successful", {
        id: loadingToastId,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", { duration: 2000 });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-black p-36">
        <Lottie animationData={registerGif} />
      </div>
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-white">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="name"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    {...field}
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <input
                    type="email"
                    id="email"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    {...field}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                }}
                render={({ field }) => (
                  <input
                    type="password"
                    id="password"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    {...field}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 11,
                    message: "Invalid phone number. 11 digit must"
                  }
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="phone"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="address"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    {...field}
                  />
                )}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-white">Upload Your Photo</label>
              <input
                className={`mt-1 block w-full px-3 py-2 border ${fileError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2`}
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2 w-full"
            >
              Sign Up
            </button>
          </form>
          <Link to={"/login"}>
            <div className="mt-4 text-center">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link to="#" className="text-red-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
