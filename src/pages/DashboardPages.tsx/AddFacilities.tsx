import { useAddFacilityMutation } from "@/redux/api/facility/facilityApi";
import {
  resetFacility,
  setDescription,
  setLocation,
  setName,
  setPricePerHour,
} from "@/redux/features/addFacilitySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { toast } from "sonner";

const AddFacilities = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { name, description, location, pricePerHour } = useAppSelector(
    (state: RootState) => state.facility
  );

  const [addFacility, { isLoading }] = useAddFacilityMutation();

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

    const loadingToastId = "uploading-toast";
    toast.loading("Uploading image, please wait...", {
      id: loadingToastId,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "djbpo9xg5");

    try {
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

      // Create facility data
      const facilityData = {
        name,
        description,
        location,
        pricePerHour,
        image: imageUrl,
      };

      // Add facility
      const result = await addFacility(facilityData);
      console.log("Facility data:", facilityData);

      // Update toast
      toast.success("Facility added successfully.", {
        id: loadingToastId,
      });
      console.log(result)


      if (result.data?.success) {
        toast.success("Facility added successfully.", {
          id: loadingToastId,
        });
        dispatch(resetFacility());
      } else {
        toast.error("Something went wrong! Try again.", {
          id: loadingToastId,
        });
      }

      // Reset facility state
      // if (result) {
      //   dispatch(resetFacility());
      // }
    } catch (error) {
      console.error("Error uploading image or adding facility:", error);
      toast.error("Failed to add facility. Please try again.");
    }

    if (isLoading) {
      toast.loading("Creating Facilities");
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4 text-white text-center ">
        Add New Facility
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-12">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Facility Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium text-gray-700">
                Facility Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder="Fortune Sports Arena ctg"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Price Per Hour */}
            <div className="flex flex-col">
              <label
                htmlFor="pricePerHour"
                className="mb-2 font-medium text-gray-700"
              >
                Price Per Hour ($)
              </label>
              <input
                type="number"
                id="pricePerHour"
                name="pricePerHour"
                placeholder="50"
                value={pricePerHour}
                onChange={(e) =>
                  dispatch(setPricePerHour(parseFloat(e.target.value)))
                }
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Location */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="location"
                className="mb-2 font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
                placeholder="Chandgaon, Chittagong"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Outdoor cricket & football pitch field in chandgaon"
              rows={4}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              required
            />
          </div>

          {/* file input - image */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2"
            >
              Add Facility
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFacilities;
