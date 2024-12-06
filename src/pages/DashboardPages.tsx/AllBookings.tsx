/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteBookingMutation, useGetBookingsQuery } from '@/redux/api/bookingsApi/bookingsApi';
import {  FaTrashAlt } from 'react-icons/fa';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

const AllBookings = () => {
  const { data, error, isLoading } = useGetBookingsQuery(undefined);

  const [deleteItem] = useDeleteBookingMutation();

  const handleDeleteItem = async (item: { _id: string }) => {
    console.log(item._id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteItem(item._id);
          console.log(res)
          if (res) {
            toast.success('Booking Deleted Successfully', { duration: 2000 });
          }
        } catch (err:any) {
          toast.error('Failed to delete booking',err);
        }
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  const bookings = data?.data;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Head */}
        <thead className="bg-gray-50">
          <tr className="text-lg text-gray-600">
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Start</th>
            <th className="px-4 py-3 text-left">End</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Field Name</th>
            
            <th className="px-4 py-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-black text-white bg-gradient-to-b from-black to-[#30125e] divide-y divide-gray-200">
          {bookings?.filter((item:any) => item.isBooked === 'confirmed').map((item :any, index:number) => (
            <tr key={item._id} className="text-sm text-white lg:text-xl">
              <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-4 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-4 py-4 whitespace-nowrap text-left">{item.startTime}</td>
              <td className="px-4 py-4 whitespace-nowrap text-left">{item.endTime}</td>
              <td className="px-4 py-4 whitespace-nowrap">{item.user?.name}</td>
              <td className="px-4 py-4 whitespace-nowrap">{item.facility?.name}</td>
              
              <td className="px-4 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="text-red-500"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
