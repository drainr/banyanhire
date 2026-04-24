import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ApprovedRecruiterRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!user) return <Navigate to="/auth" />;
    if (user.role !== "recruiter") return <Navigate to="/" />;
    if (!user.isApproved) return <Navigate to="/pending-approval" />;

    return <Outlet />;
};

export default ApprovedRecruiterRoute;