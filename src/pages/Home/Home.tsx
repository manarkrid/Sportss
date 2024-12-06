
import Banner from "../Components/Banner";
import FeaturedFacilities from "../Components/FeaturedFacilities";
import HowItWorks from "../Components/HowItWorks";
// import Pricing from "../Components/Pricing";
import ScrollUpButton from "../Components/ScrollUpButton";
// import FrequentlyQ from "../Components/FAQ";
import FAQ from "../Components/FAQ";
import CallToAction from "../Components/CallToAction";

const Home = () => {
  return (
    <>
      <Banner />
      <ScrollUpButton />
      <FeaturedFacilities />
      <HowItWorks />
  
      <FAQ/>
      <CallToAction/>
    </>
  );
};

export default Home;
