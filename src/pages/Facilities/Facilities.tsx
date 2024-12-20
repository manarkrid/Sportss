/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Facilities = () => {
  
  const featuredFacilities = [
    {
      id: 1,
      name: 'SandSpiker Beach Volleyball',
      description: 'A premium turf with top-notch grass quality for all your sports needs.',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1632300951015-42d7df909581?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb3RiYWxsJTIwZmllbGR8ZW58MHx8MHx8fDA%3D', // Update with your image paths
    },
    {
      id: 2,
      name: 'Premier Cricket Ground',
      description: 'Ideal for football and soccer games with excellent drainage and surface.',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1585822754398-04873d4e1f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNyaWNrZXQlMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 3,
      name: 'Ace Tennis Club',
      description: 'Perfect for casual games and training sessions with a well-maintained field.',
      rating: 4.3,
      image: 'https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFkbWludG9uJTIwZmllbGR8ZW58MHwwfDB8fHww',
    },
  ];

  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = featuredFacilities?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = currentProducts?.filter((facility: any) => {
    // Check if facility matches search query
    const matchesQuery =
      facility.name.toLowerCase().includes(query) ||
      facility.location.toLowerCase().includes(query);

    // Check if facility matches price filter
    const matchesPrice =
      (minPrice === undefined || facility.pricePerHour >= minPrice) &&
      (maxPrice === undefined || facility.pricePerHour <= maxPrice);

    return matchesQuery && matchesPrice && !facility.isDeleted;
  });

  
  
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] h-full pt-12 pb-12">
      <h1 className="text-center font-bold text-3xl md:text-5xl lg:text-5xl tracking-tighter pb-10 lg:pb-24 pt-6 lg:pt-10">
        "Discover & Book Top Sports Venues Near You"
      </h1>
      <div className="flex justify-between items-center border border-gray-400 rounded-full px-6 py-3 xl:px-10 md:w-2/3 mb-10 mx-auto">
        <div className="flex items-center w-2/3">
          <IoSearchOutline className="w-5 h-5 mr-2 text-neutral-300" />
          <input
            type="text"
            placeholder="Search Your Favourite Sports Ground"
            className="bg-transparent text-white outline-none w-full placeholder:text-white/70"
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <div className="flex flex-col ml-4">
          <label className="text-white">Min Price:</label>
          <input
            type="number"
            placeholder="Min"
            className="bg-transparent text-white border border-gray-400 rounded px-2 py-1 mt-1"
            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
        <div className="flex flex-col ml-4">
          <label className="text-white">Max Price:</label>
          <input
            type="number"
            placeholder="Max"
            className="bg-transparent text-white border border-gray-400 rounded px-2 py-1 mt-1"
            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts?.map((item: any, index: any) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={featuredFacilities?.length}
        paginate={paginate}
        activePage={currentPage}
      />
    </div>
  );
};

export default Facilities;
