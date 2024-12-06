import ShimmerButton from "@/components/magicui/shimmer-button";
import { FaLongArrowAltRight } from "react-icons/fa";

export function ShimmerButtonDemo() {
  return (
    <div className="z-10 flex items-center justify-center">
      <ShimmerButton className="shadow-2xl">
        <div className="flex justify-center items-center gap-2">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Book Now 
        </span>
        <span ><FaLongArrowAltRight size={25} className="animate-pulse"/></span>
        </div>
      </ShimmerButton>
    </div>
  );
}
