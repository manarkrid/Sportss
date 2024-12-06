
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/api/user/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { toast } from "sonner";

const ProfileSetting = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user?.email)
  
  // Use query hook to get user data
  const { data: userData, isLoading } = useGetUserQuery(user?.email || '');
  console.log(userData)
  const [updateUser] = useUpdateUserMutation()

  
  if (isLoading) return <div>Loading...</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      console.log(file, "Selected file");
      setFile(file);
      console.log("File type:", file?.type);
      console.log("File size:", file?.size);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image file.");
      return;
    }

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
    const imageUrl = data.secure_url;

    console.log("Uploaded image URL:", imageUrl);

    const profileData = {
      name,
      address,
      phone,
      image:imageUrl
    }

    console.log(profileData)

    const result = await updateUser({profileData,email:user?.email})

    console.log(result.data.message)
    if(result.data.success){
      toast.success(result.data.message,{duration:3000})

      setName("");
        setPhone("");
        setAddress("");
        setFile(null);
    } else{
      toast.error("Updated User Failed",{duration:3000})
    }

  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/95 shadow-md rounded-lg">
    <h1 className="text-2xl font-semibold mb-6 text-center">Update Your Profile </h1>
    <form onSubmit={handleSubmit}  className="space-y-6">
      <div className="flex flex-col items-center">
        <img
          src={userData.data.image || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
      <input
                className={`mt-1 block w-full px-3 py-2 border  'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2`}
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.data.email}
          // onChange={(e)=>setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          disabled
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
  );
};

export default ProfileSetting;
