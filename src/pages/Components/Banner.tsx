import { motion } from "framer-motion";

import cursorImage from "../../assets/images/cursor.png";
import messageImage from "../../assets/images/message.png";
import { ShimmerButtonDemo } from "@/components/ShimmerButtonDemo";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip ">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[100%-120px] "></div>

      <div className="container relative">
        <div className="flex items-center justify-center">
          <div
            className="inline-flex gap-3 border py-1 px-2 border-white/30 rounded-lg"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              🎉 | Fortune Sports Tennis 
            </span>
            <span className="inline-flex gap-1 items-center">
              <span> </span>
              
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div className="inline-flex relative">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter text-center mt-8 inline-flex ">
              Reserve Your Terrain, <br /> Ignite Your Passion
            </h1>
            <motion.div
              className="absolute right-[770px] top-[150px] animate-pulse  hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <img
                src={cursorImage}
                alt=""
                height={200}
                width={200}
                className="max-w-none "
                draggable="false"
              />
            </motion.div>

            <motion.div
              className="absolute left-[780px] -top-[86px] animate-pulse hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <img
                src={messageImage}
                alt=""
                height={200}
                width={200}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 text-center text-xl max-w-xl">
            Discover a new level of convenience with Fortune Sports.
            Effortlessly book top-notch sports facilities tailored to your needs
            and preferences. Whether you’re training hard or playing for fun, we
            ensure a seamless experience from start to finish. Elevate your game
            and make every booking terrain with Fortune Sports.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/facilities">
            <ShimmerButtonDemo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
