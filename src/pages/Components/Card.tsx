/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Card.jsx

import { Link } from "react-router-dom";

const Card = ({ item }: any) => {
  const {_id, name, image, description, pricePerHour,location } = item;
  
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg text-black bg-white mb-12 flex flex-col h-full">
      <img
        className="w-full h-56 object-cover"
        src={image}
        alt="Facility"
      />
      <div className="px-6 pt-4 flex-1 ">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{truncateDescription(description, 90)}</p>
        <p className="text-gray-700 text-base">
          Price Per Hour:{" "}
          <span className="inline-block text-black font-bold rounded-full px-3 py-1 text-lg mr-2 mb-2">
            Tk.{pricePerHour}/=
          </span>
        </p>
        <p className="text-gray-700 text-base">Location: {location}</p>
      </div>
      
      <Link to={`/facilities/${_id}`}>
      <div className="px-6 pb-4 mt-auto ">
        <button 
          type="button" 
          className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Check Details
        </button>
      </div>
      </Link>
    </div>
  );
};

export default Card;
