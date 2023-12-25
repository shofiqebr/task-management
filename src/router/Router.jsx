import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/home/login/Login";
import Register from './../pages/register/Register';
import PrivateRoute from "../privateRoute/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";




const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path:"/dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    },
  
  ]);

export default router;