import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { loggedIn } = useAuth();

    if(!loggedIn) {
        return <Navigate to="/login" state={{ from: location }}/>
    }

    return children;
}

export default ProtectedRoute;