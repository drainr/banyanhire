import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage.jsx";
import Homepage from "../pages/Homepage.jsx";
import NotFound from "../pages/NotFound.jsx";

const MainRoute = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/auth" element={<Homepage />} />
      <Route path="/" element={<AuthPage />} />
{/* 
      <Route element={<PrivateRoute />}>
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