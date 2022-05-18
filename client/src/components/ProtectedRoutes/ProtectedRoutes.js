import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '../../contexts/authContext';

const ProtectedRoutes = () => {
    const location = useLocation();
    const { loggedIn } = useAuth();

    useEffect(() => {
        console.log("loggedIn changed to: ",loggedIn);
    }, [loggedIn]);
    
    return (
        loggedIn ? <Outlet/> :
        <Navigate to="/login" replace state={{ from: location }}/>
    );
}

export default ProtectedRoutes;