import React, { useState, useEffect } from "react";
import { IoLocationOutline, IoBriefcaseOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";
import { fetchSavedJobs, fetchMyApplications } from "../utils/api.js";

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

const SeekerDashboard = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(true);
    const [loadingApplied, setLoadingApplied] = useState(true);

    const mapStatus = (status) => {
        switch (status) {
            case "pending": return "Submitted";
            case "reviewed": return "Under Review";
            case "rejected": return "Rejected";
            default: return "Submitted";
        }
    };

    useEffect(() => {
        if (token) {
            fetchSavedJobs(token)
                .then((jobs) => setSavedJobs(jobs))
                .catch(() => setSavedJobs([]))
                .finally(() => setLoadingSaved(false));

            fetchMyApplications(token)
                .then((apps) => {
                    const formatted = apps.map(app => ({
                        _id: app.jobId?._id,
                        title: app.jobId?.title,
                        company: app.jobId?.institution,
                        location: app.jobId?.location,
                        salaryMin: app.jobId?.salaryMin,
                        salaryMax: app.jobId?.salaryMax,
                        dateApplied: app.appliedAt,
                        status: mapStatus(app.status)
                    }));
                    setAppliedJobs(formatted);
                })
                .catch(() => setAppliedJobs([]))
                .finally(() => setLoadingApplied(false));
        } else {
            setSavedJobs([]);
            setAppliedJobs([]);
            setLoadingSaved(false);
            setLoadingApplied(false);
        }
    }, [token]);

    const formatSalary = (min, max) => {
        if (!min && !max) return "Not listed";
        const format = (num) => `$${(num / 1000).toFixed(0)}k`;
        if (min && max) return `${format(min)} - ${format(max)}`;
        if (min) return `From ${format(min)}`;
        return `Up to ${format(max)}`;
    };

    const cardClass =
        "w-[280px] h-[190px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0 flex flex-col justify-between";

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-[250px] p-8">
                <h1 className="league-gothic-font text-[#583927] text-4xl mb-9">
                    WELCOME, {user?.name?.toUpperCase() || "SEEKER"}
                </h1>

                {/* Saved Jobs */}
                <ScrollableRow
                    title="SAVED JOBS"
                    icon={<CiBookmark size={24} className="text-[#B5CD88]" />}
                >
                    {loadingSaved ? (
                        <p className="text-[#583927] text-sm">Loading saved jobs...</p>
                    ) : savedJobs.length > 0 ? (
                        savedJobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className={cardClass}
                            >
                                <div>
                                    <h3 className="font-bold text-[#583927] text-sm mb-1 line-clamp-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-[#91D8D4] text-xs font-semibold mb-3">
                                        {job.company}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-[#583927]">
                                        <IoLocationOutline size={14} className="text-[#91D8D4]" />
                                        {job.location}
                                    </div>
                                </div>
                                <div className="text-xs text-[#B5CD88] font-semibold">
                                    {formatSalary(job.salaryMin, job.salaryMax)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#583927] text-sm">No saved jobs yet.</p>
                    )}
                </ScrollableRow>

                {/* Applications */}
                <ScrollableRow
                    title="MY APPLICATIONS"
                    icon={<IoBriefcaseOutline size={24} className="text-[#91D8D4]" />}
                >
                    {loadingApplied ? (
                        <p className="text-[#583927] text-sm">Loading applications...</p>
                    ) : appliedJobs.length > 0 ? (
                        appliedJobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className={cardClass}
                            >
                                <div>
                                    <h3 className="font-bold text-[#583927] text-sm mb-1 line-clamp-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-[#91D8D4] text-xs font-semibold mb-2">
                                        {job.company}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-[#583927]">
                                        <IoLocationOutline size={14} className="text-[#91D8D4]" />
                                        {job.location}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <span className="text-xs text-[#583927]">
                                        Applied:{" "}
                                        {job.dateApplied
                                            ? new Date(job.dateApplied).toLocaleDateString()
                                            : "N/A"}
                                    </span>
                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                                            job.status === "Rejected"
                                                ? "bg-[#BB616D] text-white"
                                                : job.status === "Under Review"
                                                    ? "bg-[#91D8D4] text-white"
                                                    : "bg-[#B5CD88] text-white"
                                        }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#583927] text-sm">No applications yet.</p>
                    )}
                </ScrollableRow>
            </main>
        </div>
    );
};

export default SeekerDashboard;