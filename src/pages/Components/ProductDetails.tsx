/* eslint-disable @typescript-eslint/no-empty-object-type */
// import { useGetSingleFacilityQuery } from "@/redux/api/facility/facilityApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

interface TData {
  data:{}
}

interface ProductData {
  _id: string;
  name: string;
  image: string;
  pricePerHour: number;
  
  location: string;
  description: string;
  
}

const ProductDetails = () => {
  const item = useLoaderData() as TData ;
  // const {} = item.data 
  const {image,pricePerHour,name,location,_id,description} = item.data as ProductData
  console.log(item.data)
  const userRole = useAppSelector((state: RootState) => state.user.role);
  const showButton = userRole !== 'admin';
  // const { id } = useParams(); // Extract ID from URL
  // console.log('ID from URL:', id);
  // const id = "66cdec0df0587d060e88f293"

  // Fetch facility data based on the ID
  // const { data} = useGetSingleFacilityQuery(id);
  // console.log(data)

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased ">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-lg lg:max-w-lg mx-auto">
            <img className="w-full dark:hidden" src={image} alt="" />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {name}
            </h1>
            <div className="mt-4 sm:items-left sm:gap-4 flex flex-col">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                Price: {pricePerHour} TK / Hour
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  (5.0)
                </p>
                <Link
                  to="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  345 Reviews
                </Link>
              </div>
            </div>
            <p className="text-sm lg:text-xl font-bold mt-6">
              Location: {location}
            </p>

         <Link to={`/facilities/booking-details/${_id}`}>
         {/* Conditionally render the button based on the user role */}
      {showButton && (
        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
          <button
            type="button"
            className="text-white flex items-center justify-center gap-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm lg:text-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Book Now{" "}
            <span className="animate-ping duration-1">
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      )}
         </Link>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
