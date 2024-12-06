import Footer from "@/pages/shared/Footer";
import { Navbar } from "@/pages/shared/Navbar";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { NavLink, Outlet } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdAddToPhotos, MdSportsBasketball } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Dashboard = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user)

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="w-full pt-6  h-[150px] lg:h-[200px] bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#A46EDB_100%)] flex-col text-center  items-center justify-center">
        
        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold capitalize pb-5">
          {user?.role} Dashboard
        </h2>
        <h2 className="text-sm lg:text-xl font-semibold">
          <h3 className="text-2xl">👋 Welcome, {user?.name}</h3>
        </h2>
        
      </div>

      <div className="bg-black flex-1">
        <div className="w-full lg:w-[70%] lg:mx-auto px-4 py-6  ">
          <div className="flex justify-center items-center pl-0 md:pl-0 lg:pl-20 ">
          {user?.role === "admin" ? (
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 " >
              <NavLink
                to="/dashboard/statistics"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <MdAddToPhotos className="hidden lg:block text-2xl lg:text-4xl mb-2" />
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Statistics
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/add-facilities"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer  rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "text-black bg-white"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <MdAddToPhotos className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Add Facility
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/get-facilities"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <MdSportsBasketball className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Facilities
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/all-bookings"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer  rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "text-black bg-white"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <FaBookReader className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    All Bookings
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/add-admin"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer  rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "text-black bg-white"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <RiAdminLine className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Create Admin
                  </h2>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
              <NavLink
                to="/dashboard/statistics"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <MdAddToPhotos className="hidden lg:block text-2xl lg:text-4xl mb-2" />
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Statistics
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <SlCalender className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    My Bookings
                  </h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/invoices"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <LiaFileInvoiceDollarSolid className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">Invoices</h2>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/profile-setting"
                className={({ isActive }) =>
                  `flex items-center justify-center h-16 lg:h-32 w-full lg:w-48 m-2 lg:m-4 cursor-pointer rounded-lg shadow-lg transition-transform transform ${
                    isActive ? "bg-purple-700 text-white" : "bg-white text-black"
                  } hover:shadow-xl hover:scale-105`
                }
              >
                <div className="flex flex-col items-center justify-center text-center p-2 lg:p-4">
                  <CiSettings className="hidden lg:block text-2xl lg:text-4xl mb-2" />{" "}
                  {/* Hidden on large screens */}
                  <h2 className="text-xs lg:text-lg font-semibold">
                    Profile Setting
                  </h2>
                </div>
              </NavLink>
            </div>
          )}
          </div>
        </div>

        <div className="my-4 border-t border-gray-300 maxw"></div>

        <div className="flex-1 px-2 lg:px-32 py-16">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
