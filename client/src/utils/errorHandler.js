import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";

export const handleError = (error) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    console.log("ERROR: " + error);
    if (error.response?.status === 400 && error.response?.data?.error === 'TokenExpired') {
        logout();
        navigate('/login');
    }
};