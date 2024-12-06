import { GlobeDemo } from "@/components/GlobeDemo";
import ScrollUpButton from "../Components/ScrollUpButton";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Ensure you have 'sonner' installed and imported correctly
import { useRef } from "react";

const Contact = () => {
  // Create a ref to the form
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    
    // Show toast notification
    toast.success("Message sent successfully!", { duration: 3000 ,style:{
        backgroundColor: '#32cd32', // Dark green background color
        color: '#000' // White text color
    }
    });

    // Reset the form
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="px-4 py-12 bg-black w-full">
      <ScrollUpButton />
      <GlobeDemo />
      <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-24 sm:py-[72px]">
        <div className="container mx-auto px-4 py-12">
          {/* Contact Form and Map */}
          <div className="lg:flex lg:space-x-12">
            {/* Contact Form */}
            <div className="lg:w-1/2 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Map Integration (optional) */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="h-full w-full">
                <iframe
                  src="https://www.google.tn/maps/@34.3461331,8.9521527,6.5z?hl=fr&entry=ttu&g_ep=EgoyMDI0MTIwMy4wIKXMDSoASAFQAw%3D%3D"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Map of Sousse, Tunisia"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-12 text-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
              Contact Details
            </h2>
            <p className="text-white">
              Phone:{" "}
              <Link to="tel:+1234567890" className="text-white hover:underline">
                +216 73111222
              </Link>
            </p>
            <p className="text-white">
              Email:{" "}
              <Link
                to="mailto:support@example.com"
                className="text-white hover:underline"
              >
                fortune.sports@gmail.com
              </Link>
            </p>
            <p className="text-white">
              Address: Sousse , Tunisia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
