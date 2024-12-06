import { GradualSpacingDemo } from "@/components/GradualSpacingDemo";
import logoImage from "../../assets/images/logosaas.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white dark:bg-gray-900 pt-12">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="flex items-center justify-center gap-4 mb-10">
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
            <div className="text-white text-2xl font-bold">
              <Link to={"/"}>
                <GradualSpacingDemo />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Facilities
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  
                    Courts
                  
                </li>
                <li>
                 
                    Trainers
                  
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  
                    Facebook
                  
                </li>
                <li>
                  
                    Instragram
                  
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  
                    Privacy Policy
                  
                </li>
                <li>
                  
                    Terms &amp; Conditions
                 
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <footer className="bg-black dark:bg-gray-900">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="px-4 py-6 bg-black dark:bg-gray-700 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
                © 2024 Manoura
              </span>
             
              </div>
            </div>
         
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
