import { baseApi } from "../baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        addFacility: builder.mutation({
            query:(facilityData) =>({
                url:"/facility/",
                method:"POST",
                body:facilityData
            }),
            invalidatesTags:["Bookings"]
        }),
       
        getFacility: builder.query({
            query:() =>({
                url:"/facility/",
                method:"GET",
                
            })
            ,providesTags:["Bookings"]
        }),
        getSingleFacility: builder.query({
            query:(id) =>({
                url:`/facility/${id}`,
                method:"GET",
                
            })
            ,providesTags:["Bookings"]
        }),
        updateFacility: builder.mutation({
            query:({updatedData,id}) =>({
                url:`/facility/${id}`,
                method:"PUT",
                body:updatedData
            }),
            invalidatesTags:["Bookings"]
        }),
        deleteFacility: builder.mutation({
            query:(id) =>({
                url:`/facility/${id}`,
                method:"DELETE"
               
            }),
            invalidatesTags:["Bookings"]
        }),
        
    })
})

export const {useAddFacilityMutation,useGetFacilityQuery,useDeleteFacilityMutation,useUpdateFacilityMutation,useGetSingleFacilityQuery} = authApi