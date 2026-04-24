import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { fetchMyJobs, deleteJob } from "../utils/api.js";
import { IoLocationOutline, IoCalendarOutline, IoCashOutline, IoTrashOutline, IoCreateOutline, IoPeopleOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar.jsx";

const MyJobPostings = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            fetchMyJobs(token)
                .then(data => setJobs(data))
                .catch(err => setError(err.message || "Failed to load jobs"))
                .finally(() => setIsLoading(false));
        }
    }, [token]);

    const handleDelete = async (jobId) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;
        try {
            await deleteJob(jobId, token);
            setJobs(jobs.filter(j => j._id !== jobId));
        } catch (err) {
            alert(err.message || "Failed to delete job");
        }
    };

    const formatSalary = (min, max) => {
        if (!min && !max) return "Not listed";
        const fmt = (n) => "$" + (n / 1000).toFixed(0) + "k";
        if (min && max) return `${fmt(min)} – ${fmt(max)}`;
        return min ? `From ${fmt(min)}` : `Up to ${fmt(max)}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Not set";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <main className="ml-62.5 p-8">
                <div className="mb-8">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                        Recruiter Tools
                    </p>
                    <h1 className="text-4xl font-bold text-[#583927] mb-3">
                        My Job Postings
                    </h1>
                    <p className="text-[#583927]/80">
                        Manage all the jobs you've posted. Edit, delete, or create new postings.
                    </p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => navigate("/create-job")}
                        className="px-6 py-3 rounded-full bg-[#583927] text-[#FAF3E8] font-semibold hover:opacity-90 transition"
                    >
                        + Create New Job
                    </button>
                </div>

                {isLoading && <p className="text-[#583927]">Loading your jobs...</p>}
                {error && <p className="text-[#BB616D]">{error}</p>}

                {!isLoading && !error && jobs.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-[#583927] text-lg mb-4">You haven't posted any jobs yet.</p>
                        <button
                            onClick={() => navigate("/create-job")}
                            className="text-[#91D8D4] font-bold hover:underline"
                        >
                            Create your first job posting
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-start hover:shadow-lg transition"
                        >
                            <div
                                className="flex-1 cursor-pointer"
                                onClick={() => navigate(`/jobs/${job._id}`)}
                            >
                                <h2 className="text-xl font-bold text-[#583927] mb-1">{job.title}</h2>
                                <p className="text-[#91D8D4] text-sm font-semibold mb-3">{job.institution}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-[#583927]">
                                    <div className="flex items-center gap-1">
                                        <IoLocationOutline size={16} className="text-[#91D8D4]" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoCashOutline size={16} className="text-[#91D8D4]" />
                                        {formatSalary(job.salaryMin, job.salaryMax)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoCalendarOutline size={16} className="text-[#91D8D4]" />
                                        Deadline: {formatDate(job.deadline)}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-3">
                                    {job.employmentType && (
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#B5CD88] text-white">
                                            {job.employmentType}
                                        </span>
                                    )}
                                    {job.category && (
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#91D8D4] text-white">
                                            {job.category}
                                        </span>
                                    )}
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                        job.isActive ? "bg-[#B5CD88] text-white" : "bg-[#F6E58D] text-[#583927]"
                                    }`}>
                                        {job.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 ml-4">
                                <button
                                    onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#B5CD88] text-[#B5CD88] text-sm font-semibold hover:bg-[#B5CD88] hover:text-white transition"
                                >
                                    <IoPeopleOutline size={16} />
                                    Applicants
                                </button>
                                <button
                                    onClick={() => navigate(`/edit-job/${job._id}`)}
                                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#91D8D4] text-[#91D8D4] text-sm font-semibold hover:bg-[#91D8D4] hover:text-white transition"
                                >
                                    <IoCreateOutline size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#BB616D] text-[#BB616D] text-sm font-semibold hover:bg-[#BB616D] hover:text-white transition"
                                >
                                    <IoTrashOutline size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyJobPostings;