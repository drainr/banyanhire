import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useAuth } from "../Hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";
import { fetchMyJobs, fetchApplicants } from "../utils/api.js";

const ScrollableRow = ({ title, icon, children }) => (
    <div className="mb-12">
        <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <h2 className="league-gothic-font text-[#583927] text-2xl leading-none translate-y-1.5">
                {title}
            </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto px-3 py-3 pb-5 scrollbar-thin">
            {children}
        </div>
    </div>
);

const RecruiterDashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingApps, setLoadingApps] = useState(true);

    useEffect(() => {
    const loadJobs = async () => {
        console.log("user object:", user);
        console.log("token:", token);

        if (!token) {
            setLoadingJobs(false);
            return;
        }

        try {
            const data = await fetchMyJobs(token);
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingJobs(false);
        }
    };

    loadJobs();
}, [token]);

    useEffect(() => {
    const loadApps = async () => {
        if (!token || !jobs.length) {
            return;
        }

        setLoadingApps(true);

        try {
            const allApps = await Promise.all(
                jobs.map((job) => fetchApplicants(job._id, token))
            );

            const flat = allApps.flat();

            const formatted = flat.map((app) => ({
                id: app._id,
                jobId: app.jobId?._id ?? app.jobId,
                jobTitle: app.jobId?.title,
                applicant: app.applicantId?.name,
                status: app.status,
                appliedAt: app.appliedAt
            }));

            setApplications(formatted);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingApps(false);
        }
    };

    loadApps();
}, [jobs, token]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-[250px] p-8">
                <h1 className="league-gothic-font text-[#583927] text-4xl mb-9">
                    WELCOME, {user?.name?.toUpperCase() || "RECRUITER"}
                </h1>

                {/* OWNED JOBS */}
                <ScrollableRow
                    title="YOUR JOB POSTINGS"
                    icon={<IoBriefcaseOutline size={24} className="text-[#91D8D4]" />}
                >
                    {loadingJobs ? (
                        <p className="text-sm text-[#583927]">Loading jobs...</p>
                    ) : jobs.length ? (
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className="w-[280px] h-[190px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="font-bold text-[#583927] text-sm line-clamp-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-xs text-[#91D8D4] font-semibold">
                                        {job.institution}
                                    </p>
                                </div>

                                <p className="text-xs text-[#B5CD88] font-semibold">
                                    {job.location}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm">No jobs posted yet.</p>
                    )}
                </ScrollableRow>

                {/* APPLICATIONS */}
                <ScrollableRow
                    title="NEW APPLICATIONS"
                    icon={<IoBriefcaseOutline size={24} className="text-[#B5CD88]" />}
                >
                    {loadingApps ? (
                        <p className="text-sm text-[#583927]">Loading applications...</p>
                    ) : applications.length ? (
                        applications.map((app) => (
                            <div
                                key={app.id}
                                onClick={() => navigate(`/jobs/${app.jobId}/applicants`)}
                                className="w-[280px] h-[190px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="font-bold text-[#583927] text-sm">
                                        {app.jobTitle}
                                    </h3>
                                    <p className="text-xs text-[#91D8D4] font-semibold">
                                        {app.applicant}
                                    </p>
                                </div>

                                <div className="text-xs text-[#583927]">
                                    Status: <strong>{app.status}</strong>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm">No applications yet.</p>
                    )}
                </ScrollableRow>
            </main>
        </div>
    );
};

export default RecruiterDashboard;