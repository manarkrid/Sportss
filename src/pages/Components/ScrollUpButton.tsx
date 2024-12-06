import ScrollToTop from "react-scroll-up"
import { BsFillRocketFill } from "react-icons/bs";

const ScrollUpButton = () => {
  return (
    <div className="relative z-[200]">
        <ScrollToTop showUnder={160}>
            <p className="font-bold text-white border border-purple-500  rounded-full p-3 text-3xl animate-bounce duration-5">
                <BsFillRocketFill />
            </p>

        </ScrollToTop>
        
    </div>
  )
}

export default ScrollUpButton