/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteFacilityMutation, useGetFacilityQuery } from '@/redux/api/facility/facilityApi'

import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { toast } from 'sonner'


const GetFacilities = () => {
  const {data} = useGetFacilityQuery(undefined)
  const [deleteItem] = useDeleteFacilityMutation()
  const facilities = data?.data
  console.log(facilities)

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const handleDeleteItem = (item :any) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteItem(item._id)
        if(res){
          toast.success("Facilities Deleted Successfully",{duration:2000})
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
            <th className="px-4 py-3 text-center">Image</th>
            <th className="px-4 py-3  text-center">Name</th>
            <th className="px-4 py-3 text-center">Description</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-black text-white bg-gradient-to-b from-black to-[#30125e] divide-y divide-gray-200">
          {facilities ?.filter((item: any) => !item.isDeleted).map((item:any,index:any) => (
            <tr key={item._id} className="text-sm text-white lg:text-xl">
            <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-left ">{item.name}</td>
            <td className="px-4 text-center py-4  text-left">{truncateDescription(item.description ,100)}</td>
            <td className="px-4 py-4 whitespace-nowrap">Tk.{item.pricePerHour}</td>
            <td className="px-4 py-4 whitespace-nowrap text-center">
              <Link to={`/dashboard/update-facility/${item._id}`}>
                <button className="text-red-500 ">
                  <FaEdit />
                </button>
              </Link>
            </td>
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
  )
}

export default GetFacilities