import { baseApi } from "../baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        signUp: builder.mutation({
            query:(userInfo) => ({
                url:"/auth/signup",
                method:'POST',
                body:userInfo
            })
        }),
        adminSignUp: builder.mutation({
            query:(adminInfo) => ({
                url:"/auth/adminSignup",
                method:'POST',
                body:adminInfo
            })
        }),
        login: builder.mutation({
            query:(userInfo) =>({
                url:'/auth/login',
                method:"POST",
                body:userInfo
            })
        }),
        getUserData: builder.query({
            query: (email) => ({
                
                url: `/auth/${(email)}`, // Append the email to the URL
                method: "GET",
            })
        })
    })
})

export const {useSignUpMutation,useLoginMutation,useGetUserDataQuery,useAdminSignUpMutation} = authApi