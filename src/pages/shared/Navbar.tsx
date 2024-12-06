import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logosaas.png";
import { CiMenuBurger } from "react-icons/ci";
import { GradualSpacingDemo } from "@/components/GradualSpacingDemo";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useState } from "react";
import { navItems } from "@/constants";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/userSlice";
import { toast } from "sonner";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  const dispatch = useAppDispatch()

  const handleLogout = () =>{
    dispatch(logout())
    toast.success("Log Out Successfully",{duration:2000})
  }

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div className="bg-black">
      <div className="px-4 ">
        <div className="py-4  flex items-center justify-between">
          {/* logo + name */}
          <div className="flex items-center justify-center gap-4 ">
            <div className="relative">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FBDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
              <Link to={"/"}>
                <img
                  src={logoImage}
                  alt="saas image"
                  className="h-12 w-12 relative"
                />
              </Link>
            </div>
            <div className="text-white text-sm lg:text-2xl font-bold">
              <Link to={"/"}>
                <GradualSpacingDemo />
              </Link>
            </div>
          </div>
          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-sm sm:hidden">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <X className="text-white" />
              ) : (
                <CiMenuBurger className="text-white" size={20} />
              )}
            </button>
          </div>

          {/* ****************************** For mobile menu *********************************** */}
          {mobileDrawerOpen && (
  <div className="fixed right-0 z-20 top-20 bg-black text-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
    <ul>
      {navItems.map((item, index) => (
        <li key={index} className="py-4">
          {/* Use Link from react-router-dom */}
          <Link to={item.href} className="text-white">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
    <div className="flex space-x-6 mt-4">
      <Link
        to="/dashboard/addItems"
        className="py-2 px-3 rounded-md bg-gradient-to-r from-green-500 to-green-800 text-white"
      >
        Dashboard
      </Link>
    </div>
  </div>
)}

          {/* ********************************Desktop menu navigation ************************************* */}

          <nav className=" gap-8 items-center hidden sm:flex">
            
            <Link
              to="/contact"
              className="text-opacity-60 text-white hover:text-opacity-100  transition"
            >
              Contacts
            </Link>
            <Link
              to="/facilities"
              className="text-opacity-60 text-white hover:text-opacity-100  transition"
            >
              Facilities
            </Link>
            <Link
              to="/faq"
              className="text-opacity-60 text-white hover:text-opacity-100  transition"
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden lg:flex gap-4 ">
            {user && user.email ? (
              <>
                <Link to={"/dashboard"}>
                  <button
                    type="button"
                    className="text-black bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Dashboard
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2"
                  >
                    Log Out
                    <span className="animate-ping duration-1">
                      <FaLongArrowAltRight />
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="text-black bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2"
                  >
                    Sign Up
                    <span className="animate-ping duration-1">
                      <FaLongArrowAltRight />
                    </span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
