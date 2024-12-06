



// import {  useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setAddress, setEmail, setName, setPassword, setPhone } from "@/redux/features/adminSlice"
import { RootState } from "@/redux/store"
import { useAdminSignUpMutation } from "@/redux/api/auth/authApi"
import { toast } from "sonner"



const AddAdmin = () => {
  // const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null);
    const dispatch=useAppDispatch()
    const {name,email,password,phone,address} = useAppSelector((state:RootState)=> state.admin)
    const [adminSignUp] = useAdminSignUpMutation()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        console.log(file, "Selected file");
        setFile(file);
        console.log("File type:", file?.type);
        console.log("File size:", file?.size);
      }
    };

    const handleSubmit =async (e:React.FormEvent) =>{
        e.preventDefault()

        if (!file) {
          toast.error("Please select an image file.");
          return;
        }

        toast.loading("Uploading image...", { id: 'image-upload' });
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "myCloud");
        formData.append("cloud_name", "djbpo9xg5");
    
         // Upload image to Cloudinary
         const response = await fetch(
          "https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
    
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        // Parse the JSON response
        const data = await response.json();
        const image = data.secure_url;
    
        console.log("Uploaded image URL:", image);
    

    

 



        console.log(
            name,email,password,phone,address,image
        )
        const user = await adminSignUp({name,email,password,phone,address,image})
        toast.dismiss('image-upload');
        toast.success("Admin added successfully", { id: 'admin-success', duration: 2000 });
        
        console.log(user)
        // navigate("/login")

    }

  return (
    <div className="flex  ">
    {/* Login Form Section */}
     
    
    <div className="w-full bg-black flex items-center justify-center p-8 ">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Add an ADMIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
                onChange={(e) => dispatch(setPhone(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
                onChange={(e) => dispatch(setAddress(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* file input - image */}
          <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Upload Photo
                </label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                    id="file_input"
                    type="file"
                    onChange={handleFileChange}
                />
            </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2 w-full"
          >
            Add Admin
          </button>
        </form>
       
      </div>
    </div>

   
  </div>

  )
}

export default AddAdmin