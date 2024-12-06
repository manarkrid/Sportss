
import { GiShieldBash } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import { ImCross } from "react-icons/im";

const pricingOptions = [
  {
    id: 1,
    title: "Standard Plan",
    description: "Features",
    included: ["Water", "Food"],
    excluded:[ "Rest Room","Equipment"],
    price: "2000",
  },
  {
    id: 2,
    title: "Premium Plan",
    description: "Features",
    included: ["Food", "Equipment", "Rest Room"],
    excluded:[ "25% Discount"],
    price: "3500",
  },
  {
    id: 3,
    title: "Pro Membership",
    description: "Features",
    included: ["Food", "Swimming Pool", "Rest Room", "25% Discount"],
    excluded:[],
    price: "5000",
  },
];

const Pricing = () => {
  return (
    <div className="bg-black">
        <section className="py-16 rounded-lg bg-gradient-to-b from-black to-[#4c1899] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
          Pricing Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white/90 text-black shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center mb-6">
                {option.title === "Standard Plan" && (
                  <GiShieldBash size={40} className="text-gray-700 mb-2" />
                )}
                {option.title === "Premium Plan" && (
                  <IoDiamondOutline size={40} className="text-gray-700 mb-2" />
                )}
                {option.title === "Pro Membership" && (
                  <FcApproval size={40} className="text-gray-700 mb-2" />
                )}
                <h3 className="text-xl font-semibold">{option.title}</h3>
              </div>
              <hr className="border-gray-300 mb-4" />
              <div className="flex flex-col flex-grow bg-black">
                <p className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                  <FaBangladeshiTakaSign size={20} className="mr-2" />
                  {option.price}
                </p>
                <div className="text-xl font-normal text-white mb-6 text-center">
                  Per Hour
                </div>
                <p className="text-white mb-4 text-center">{option.description}</p>
                <ul className="text-left mb-4">
                  {option.included.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1 mb-2 ">
                      <FcApproval className="text-green-500 ml-2 " size={20}/>
                      <span className="text-white">Included: {feature}</span>
                    </li>
                  ))}
                  {option.excluded.map((feature, index) => (
                    <li key={index} className="flex items-center ml-3 space-x-2 mb-2">
                      <ImCross className="text-red-500 " size={15}/>
                      <span className="text-white"> {feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-2/3 mx-auto mb-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Pricing;
