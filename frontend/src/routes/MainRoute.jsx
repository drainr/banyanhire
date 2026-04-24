import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import ApprovedRecruiterRoute from "./ApprovedRecruiterRoute.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import Homepage from "../pages/Homepage.jsx";
import NotFound from "../pages/NotFound.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import SeekerDashboard from "../pages/SeekerDashboard.jsx";
import PendingApproval from "../pages/PendingApproval.jsx";
import RecruiterDashboard from "../pages/RecruiterDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import RecruiterOnboard from "../pages/RecruiterOnboard.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import JobListing from "../pages/JobListings.jsx";
import CompanyProfile from "../pages/CompanyProfile.jsx";
import CreateJob from "../pages/CreateEditJob.jsx";
import RecruiterProfileAccordions from "../components/RecruiterDashboardComponents/RecruiterProfileAccordion.jsx";
import SavedJobs from "../pages/SavedJobs.jsx";
import ManageCompanies from "../pages/ManageCompanies.jsx";
import MyJobPostings from "../pages/MyJobPostings.jsx";
import ViewUsersAndPostings from "../pages/ViewUsersAndPostings.jsx";

const MainRoute = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Any logged-in user */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>

      {/* Seeker only */}
      <Route element={<PrivateRoute allowedRoles={["seeker"]} />}>
        <Route path="/seeker" element={<SeekerDashboard />} />
        <Route path="/jobs/saved" element={<SavedJobs />} />
      </Route>

      {/* Recruiter — unapproved (onboarding + pending) */}
      <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
        <Route path="/recruiter-onboard" element={<RecruiterOnboard />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
      </Route>

      {/* Recruiter — approved only */}
      <Route element={<ApprovedRecruiterRoute />}>
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiterprofile" element={<RecruiterProfileAccordions />} />
        <Route path="/recruiter-form" element={<CompanyProfile />} />
        <Route path="/jobs/my" element={<MyJobPostings />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/edit-job/:id" element={<CreateJob />} />
      </Route>

      {/* Admin only */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-companies" element={<ManageCompanies />} />
          <Route path="/view" element={<ViewUsersAndPostings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;