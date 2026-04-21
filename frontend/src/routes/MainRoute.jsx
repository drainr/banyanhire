import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage.jsx";
import Homepage from "../pages/Homepage.jsx";
import NotFound from "../pages/NotFound.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import SeekerDashboard from "../pages/SeekerDashboard.jsx";
import PendingApproval from "../pages/PendingApproval.jsx";
import RecruiterDashboard from "../pages/RecruiterDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import RecruiterOnboard from "../pages/RecruiterOnboard.jsx";

const MainRoute = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/recruiter-onboard" element={<RecruiterOnboard />} />
        <Route path="/SeekerDashboard" element={<SeekerDashboard />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
       <Route path="/Recruiter" element={<RecruiterDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
{/* 
      <Route element={<PrivateRoute />}>3
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/seeker" element={<SeekerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route> 
      */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;