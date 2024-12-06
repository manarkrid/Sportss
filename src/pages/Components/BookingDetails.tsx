import { useCreateBookingMutation } from '@/redux/api/bookingsApi/bookingsApi';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import { useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';

type Facility = {
  _id: string;
  description: string;
  image: string;
  isDeleted: boolean;
  location: string;
  name: string;
  pricePerHour: number;
  __v: number;
};

type LoaderData = {
  data: Facility;
};


  
const BookingDetails = () => {
  const { data } = useLoaderData() as LoaderData;
  console.log(data,"********************")
  const {user} = useAppSelector((state:RootState) => state.user)
  console.log(user?.email)
  const [createBooking] = useCreateBookingMutation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ startTime: string; endTime: string }[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('10:00 AM');
  const [endTime, setEndTime] = useState<string>('11:00 AM');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(0);

  const handleCheckAvailability = async () => {
    if (startDate) {
        const currentDate = new Date(); // Get the current date
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight to compare only date parts

        // Check if the selected date is in the past
        if (startDate < currentDate) {
            console.error('Selected date is in the past. Please select today or a future date.');
            toast.error("Selected date is in the past. Please select today or a future date.",{id: 'availability-error',duration:3000 ,style: {
              backgroundColor: '#f44336', // Red background color
              color: '#000' // White text color
          }})
            // Optionally, you can show a user-friendly message here
            return; // Exit the function
        }

        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, '0');
        const day = String(startDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        console.log('Selected Date:', formattedDate);

        setCheckingAvailability(true);

        try {
            const response = await fetch(`http://localhost:5000/api/check-availability?date=${formattedDate}&facility=${data._id}`);
            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data.success) {
                    setAvailableTimeSlots(result.data.data);
                } else {
                    console.error('Error:', result.message || 'No available slots found.');
                    setAvailableTimeSlots([]); // Clear the slots if no data or error
                }
            } else {
                console.error('Error fetching availability:', response.statusText);
                setAvailableTimeSlots([]); // Clear the slots if response is not ok
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setAvailableTimeSlots([]); // Clear the slots in case of error
        }

        setCheckingAvailability(false);
    } else {
        console.log('No date selected');
    }
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (startDate && startTime && endTime) {
      // Convert startTime and endTime to 24-hour format
      const convertTo24HourFormat = (time: string) => {
        const [timePart, period] = time.split(' ');
        const [hoursPart, minutesPart] = timePart.split(':'); // Declare const here
        let hours = Number(hoursPart); // Use let for hours since it can be reassigned
        const minutes = Number(minutesPart); // Use const for minutes since it's not reassigned
      
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
      
        return { hours, minutes };
      };
      
      
      

      const startTime24 = convertTo24HourFormat(startTime);
      const endTime24 = convertTo24HourFormat(endTime);

      const startDateTime = new Date(startDate);
      startDateTime.setHours(startTime24.hours, startTime24.minutes);

      const endDateTime = new Date(startDate);
      endDateTime.setHours(endTime24.hours, endTime24.minutes);

      // Format the date
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const formData = {
        facility: data._id,
        email:user?.email,
        firstName,
        lastName,
        guestCount,
        date: formatDate(startDateTime), // Use formatDate here
        startTime: startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        endTime: endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      };

      console.log('Form submitted with data:', formData);

      // Uncomment this when ready to integrate with API
      const res = await createBooking(formData);
      toast.loading("Creating Booking...", { id: 'booking-loading' });
      console.log(res);

      if(res.data.success){
        window.location.href = res.data.data.payment_url
      }
      

    } else {
      console.log('Complete all required fields');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_54%,#4F21A1_75%,#A46EDB_99%)]">
      <h2 className="text-center font-bold text-3xl md:text-5xl lg:text-5xl text-white/80 tracking-tighter pb-10 lg:pb-24 pt-6 lg:pt-10">
        Reserve Your Game Time at <span className="text-white">'GoalMaster Arena'</span> Today
      </h2>

      {/* Availability Checker Section */}
      <div className="w-full max-w-[550px] mb-10">
        <div className="mb-5">
          <label htmlFor="availabilityDate" className="mb-3 block text-base font-medium text-white">
            Select Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <button
          type="button"
          onClick={handleCheckAvailability}
          className="w-full rounded-md border border-[#6A64F1] bg-[#6A64F1] py-3 px-6 text-base font-medium text-white hover:bg-[#5a4cb6]"
        >
          Check Availability
        </button>
        {checkingAvailability && <p className="text-center mt-4">Checking availability...</p>}
        {availableTimeSlots.length > 0 && (
          <div className="mt-5">
            <label className="mb-3 block text-base font-medium text-white">
              Available Time Slots
            </label>
            <ul className="list-disc list-inside text-white">
              {availableTimeSlots.map((slot, index) => (
                <li key={index}>
                  {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ul>
          </div>
        )}
        {availableTimeSlots.length === 0 && !checkingAvailability && (
          <p className="text-center mt-4">All slots available for this day... </p>
        )}
      </div>

      {/* Booking Form Section */}
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3">
              <div className="mb-5">
                <label htmlFor="fName" className="mb-3 block text-base font-medium text-white">
                  Court Name
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder="Court Name"
                  value={data.name}
                  aria-disabled
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
                  disabled
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="firstName" className="mb-3 block text-base font-medium text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="lastName" className="mb-3 block text-base font-medium text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="guest" className="mb-3 block text-base font-medium text-white">
              How many guests are you bringing?
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              placeholder="5"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              min="0"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="startTime" className="mb-3 block text-base font-medium text-white">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="endTime" className="mb-3 block text-base font-medium text-white">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md border border-black bg-black py-3 px-6 text-base  text-white hover:black font-bold"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetails;