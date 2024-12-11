import AdminRoute from "@/components/Layout/AdminRoute";
import Dashboard from "@/components/Layout/Dashboard";
import MainLayout from "@/components/Layout/MainLayout";
import ProtectedRoute from "@/components/Layout/ProtectedRoute";
//import About from "@/pages/About/AboutUs";
import BookingDetails from "@/pages/Components/BookingDetails";
import FAQ from "@/pages/Components/FAQ";
import ProductDetails from "@/pages/Components/ProductDetails";
import Contact from "@/pages/Contact/Contact";
import AddAdmin from "@/pages/DashboardPages.tsx/AddAdmin";
import AddFacilities from "@/pages/DashboardPages.tsx/AddFacilities";
import AllBookings from "@/pages/DashboardPages.tsx/AllBookings";
import GetFacilities from "@/pages/DashboardPages.tsx/GetFacilities";
import Invoices from "@/pages/DashboardPages.tsx/Invoices";
import MyBookings from "@/pages/DashboardPages.tsx/MyBookings";
import ProfileSetting from "@/pages/DashboardPages.tsx/ProfileSetting";
import Statistics from "@/pages/DashboardPages.tsx/Statistics";

import UpdateFacility from "@/pages/DashboardPages.tsx/UpdateFacility";

import Facilities from "@/pages/Facilities/Facilities";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/shared/NotFound";
import Login from "@/pages/Social/Login"
import Register from "@/pages/Social/Register";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
    element: <MainLayout />,
    errorElement:<NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "facilities",
        element: <ProtectedRoute><Facilities /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "/facilities/:id",
        element: <ProductDetails />,
        loader: ({params}) => fetch(`http://localhost:5000/api/facility/${params.id}`)
      },
      {
        path: "/facilities/booking-details",
        element: <ProtectedRoute><BookingDetails /></ProtectedRoute>,
       // loader: ({params}) => fetch(`http://localhost:5000/api/facility/${params.id}`)

        
      },
    ]
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement:<NotFound></NotFound>,
      children: [
       {
        path:"/dashboard/my-bookings",
        element :<ProtectedRoute><MyBookings/></ProtectedRoute> 
       },
       
       {
        path:"/dashboard/update-facility/:id",
        element :<UpdateFacility/>
       },
       {
        path:"/dashboard/invoices",
        element : <ProtectedRoute><Invoices/></ProtectedRoute>
       },
       {
        path:"/dashboard/profile-setting",
        element :<ProtectedRoute> <ProfileSetting/></ProtectedRoute>
       },
       {
        path:"/dashboard/add-facilities",
        element : <AdminRoute><AddFacilities/></AdminRoute> 
       },
       {
        path:"/dashboard/get-facilities",
        element :<AdminRoute><GetFacilities/></AdminRoute> 
       },
       {
        path:"/dashboard/all-bookings",
        element :<AdminRoute><AllBookings/></AdminRoute> 
       },
       {
        path:"/dashboard/add-admin",
        element :<AdminRoute><AddAdmin/></AdminRoute> 
       },
       {
        path:"/dashboard/statistics",
        element : <Statistics/>
       },
       {
        index:true,
        
        element : <Statistics/>
       },
        
      ]
    }

])

export default router;