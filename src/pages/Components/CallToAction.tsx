

const CallToAction = () => {
  return (
    <div className="bg-black text-white text-center py-[72px] sm:py-24">
      <div className="container lg:max-w-7xl relative">
        
        <h2 className="text-5xl  font-bold ">Get Notify From Us</h2>
        <p className="mt-12 text-white/70 text-xl w-full">
        Discover a new level of convenience with Fortune Sports.
            Effortlessly book top-notch sports facilities tailored to your needs
            and preferences. Whether you’re training hard or playing for fun, we
            ensure a seamless experience from start to finish. Elevate your game
            and make every booking count with Fortune Sports.
        </p>

        <form action="" className="flex flex-col gap-2.5 mt-10 sm:flex-row max-w-sm mx-auto">
          <input type="email" placeholder="Enter Your Email" name="email" className="h-12 bg-white/20 rounded-lg font-medium px-4 placeholder:text-[#9CA3AF] md:flex-1" />
          <button className="text-white bg-gradient-to-br from-purple-900 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-2">Get Access</button>
        </form>

      </div>

    </div>
  )
}

export default CallToAction