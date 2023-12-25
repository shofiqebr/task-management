import { useContext } from "react";
import { ContextProvider } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";





const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(ContextProvider);
    const location = useLocation()
    
 
    if (loading) {
       return <div className="flex h-[70vh] justify-center items-center"><CircularProgress /></div>
    }
 
    if (!user) {
       return <Navigate state={location.pathname} to='/login'></Navigate>
    }
 
 
    return children
 };
 
 export default PrivateRoute;
 