import { baseApi } from "../baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getUser: builder.query({
            query:(email) =>({
                
                url:`/user/${email}`,
                method: "GET"
            }),
            providesTags:['Bookings']
            
           
        }),
        updateUser: builder.mutation({
            query:({profileData,email}) =>({
                
                url:`/user/${email}`,
                method: "PUT",
                body:profileData
            }),
            invalidatesTags:['Bookings']
            
           
        }),
    })
})

export const {useGetUserQuery,useUpdateUserMutation} = userApi