import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({allowedRoles}) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!user) return <Navigate to="/auth" />;

    // Logged in but wrong role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;