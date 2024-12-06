/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteBookingMutation, useGetSingleBookingsQuery } from "@/redux/api/bookingsApi/bookingsApi"
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { FcCancel } from "react-icons/fc";

import { toast } from "sonner";
import Swal from "sweetalert2";



const MyBookings = () => {

  const { user } = useAppSelector((state: RootState) => state.user);
  const [deleteItem] = useDeleteBookingMutation()
  
  const {data} = useGetSingleBookingsQuery(user)
  console.log(data,"user bookings*******")
  const myBooking= data?.data

  const handleDeleteItem = (item :any) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to booked this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteItem(item._id)
        if(res){
          toast.success(" Bookings Cancelled Successfully",{duration:2000})
        }
  
  
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Head */}
        <thead className="bg-gray-50">
          <tr className="text-lg text-gray-600">
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3  text-left">Start</th>
            <th className="px-4 py-3 text-left">End</th>
            <th className="px-4 py-3 text-left">Payable Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
            
            <th className="px-4 py-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-black text-white bg-gradient-to-b from-black to-[#30125e] divide-y divide-gray-200">
          {myBooking ?.filter((item: any) => item.isBooked === "confirmed").map((item:any,index:any) => (
            <tr key={item._id} className="text-sm text-white lg:text-xl">
            <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-4 py-4 whitespace-nowrap">
            {item.date}
            </td>
            
            <td className="px-4 py-4 whitespace-nowrap text-left ">{item.startTime}</td>
            <td className="px-4  py-4  text-left">{item.endTime}</td>
            <td className="px-4 py-4 whitespace-nowrap ">Tk.{item.payableAmount}/=</td>
            <td className="px-4 py-4 whitespace-nowrap">{item.isBooked}</td>
            
            <td className="px-4 py-4 whitespace-nowrap text-center">
              <button
                onClick={() => handleDeleteItem(item)}
                className="text-red-500"
              >
                <FcCancel size={30} />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyBookings