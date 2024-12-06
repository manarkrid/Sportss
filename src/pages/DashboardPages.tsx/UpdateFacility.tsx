import { useGetSingleFacilityQuery, useUpdateFacilityMutation } from '@/redux/api/facility/facilityApi';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const UpdateFacility = () => {
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [pricePerHour, setPricePerHour] = useState<number | ''>('');
    const [location, setLocation] = useState('');

    const { data, isLoading, error } = useGetSingleFacilityQuery(id);
    const [updateFacilities] =useUpdateFacilityMutation() 

    useEffect(() => {
        if (data) {
            setName(data.name || '');
            setDescription(data.description || '');
            setPricePerHour(data.pricePerHour || '');
            setLocation(data.location || '');
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) {
        toast.error("Failed to fetch facility data.");
        return <p>Error fetching data.</p>;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFile(file);
        }
        console.log(file)
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPricePerHour(value === '' ? '' : Number(value));
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

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/djbpo9xg5/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed.");
            }

            const data = await response.json();
            const imageUrl = data.secure_url;
            console.log(imageUrl)

            const updatedData = {
                name,
                description,
                pricePerHour,
                location,
                image: imageUrl
            };

            // Handle success (e.g., update facility data)
            console.log(updatedData);
            const result = await updateFacilities({updatedData,id:id})

            console.log(result)
            toast.success("Facility updated successfully.");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload image.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/95 shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Update Facility</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center">
                    <img
                        src={data.data.image || 'https://via.placeholder.com/150'}
                        alt="Facility"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
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
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price per Hour</label>
                    <input
                        type="number"
                        id="price"
                        name="pricePerHour"
                        value={pricePerHour === '' ? '' : pricePerHour}
                        onChange={handlePriceChange}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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

export default UpdateFacility;
