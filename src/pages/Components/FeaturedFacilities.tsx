import { SparklesTextDemo } from "@/components/SparklesTextDemo";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";


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

const FeaturedFacilities = () => {
  return (
    <section className="py-2 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl  font-semibold mb-8 text-center text-white mt-8 "><SparklesTextDemo/></h2>
        <p className="text-xl lg:text-2xl text-center text-white/70 pb-8 max-w-5xl mx-auto">Advanced sports venues offer the latest facilities, dynamic and unique environments for enhanced your performance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map((facility) => (
            <div key={facility.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={facility.image} alt={facility.name} className="w-full h-72 object-cover"/>
              <div className="px-6 py-3">
                <h3 className="text-xl font-semibold mb-2 text-black">{facility.name}</h3>
                <p className="text-gray-700 mb-4">{facility.description}</p>
                <div className="flex justify-between items-center  ">
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-2">
                    {'★'.repeat(Math.floor(facility.rating))}
                    {'☆'.repeat(5 - Math.floor(facility.rating))}
                  </span>
                  <span className="text-gray-600">({facility.rating})</span>
                </div>
               <Link to={"/facilities"}>
               <button className="text-white/90 bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2">
                 <div className="flex justify-center items-center gap-2">
                 Explore <span ><FaLongArrowAltRight size={25} className="animate-pulse"/></span>
                 </div>
                </button>
               </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
