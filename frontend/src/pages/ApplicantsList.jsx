import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { fetchApplicants, fetchJobById } from "../utils/api.js";
import { IoMailOutline, IoDocumentOutline, IoCalendarOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api";

const ApplicantsList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        if (token && id) {
            Promise.all([
                fetchApplicants(id, token),
                fetchJobById(id),
            ])
                .then(([apps, jobData]) => {
                    setApplicants(apps);
                    setJob(jobData);
                })
                .catch(err => setError(err.message || "Failed to load data"))
                .finally(() => setIsLoading(false));
        }
    }, [token, id]);

    const handleStatusUpdate = async (applicationId, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications/update-status/${applicationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) throw new Error("Failed to update status");

            setApplicants(prev =>
                prev.map(app =>
                    app._id === applicationId ? { ...app, status } : app
                )
            );
        } catch (err) {
            alert(err.message || "Failed to update status");
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Unknown";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const statusBadge = (status) => {
        switch (status) {
            case "reviewed":
                return "bg-[#91D8D4] text-white";
            case "rejected":
                return "bg-[#BB616D] text-white";
            default:
                return "bg-[#B5CD88] text-white";
        }
    };

    const statusLabel = (status) => {
        switch (status) {
            case "reviewed": return "Reviewed";
            case "rejected": return "Rejected";
            default: return "Pending";
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <main className="ml-62.5 p-8">
                <div className="mb-8">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                        Recruiter Tools
                    </p>
                    <h1 className="text-4xl font-bold text-[#583927] mb-2">
                        Applicants
                    </h1>
                    {job && (
                        <p className="text-[#583927]/80">
                            Viewing applicants for <span className="font-semibold">{job.title}</span> at {job.institution}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => navigate("/jobs/my")}
                    className="mb-6 text-[#91D8D4] font-semibold hover:underline"
                >
                    ← Back to My Job Postings
                </button>

                {isLoading && <p className="text-[#583927]">Loading applicants...</p>}
                {error && <p className="text-[#BB616D]">{error}</p>}

                {!isLoading && !error && applicants.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-[#583927] text-lg">No applications yet for this position.</p>
                    </div>
                )}

                {!isLoading && !error && applicants.length > 0 && (
                    <p className="text-sm text-[#583927] mb-4">
                        {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"}
                    </p>
                )}

                <div className="space-y-4">
                    {applicants.map((app) => (
                        <div
                            key={app._id}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-[#583927]">
                                            {app.applicantId?.name || "Unknown Applicant"}
                                        </h2>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge(app.status)}`}>
                                            {statusLabel(app.status)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm text-[#583927]/70 mb-2">
                                        <IoMailOutline size={16} className="text-[#91D8D4]" />
                                        {app.applicantId?.email || "No email"}
                                    </div>

                                    <div className="flex items-center gap-1 text-sm text-[#583927]/70 mb-3">
                                        <IoCalendarOutline size={16} className="text-[#91D8D4]" />
                                        Applied: {formatDate(app.appliedAt)}
                                    </div>

                                    {app.coverLetter && (
                                        <div className="mt-3 bg-[#FAF3E8] rounded-xl p-4">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#91D8D4] mb-2">Cover Letter</p>
                                            <p className="text-sm text-[#583927]/80 leading-relaxed">{app.coverLetter}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 ml-6">
                                    {/* Resume */}
                                    {app.resumeURL && (
                                        <a
                                            href={app.resumeURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#91D8D4] text-[#91D8D4] text-sm font-semibold hover:bg-[#91D8D4] hover:text-white transition"
                                        >
                                            <IoDocumentOutline size={16} />
                                            View Resume
                                        </a>
                                    )}

                                    {/* Status actions */}
                                    {app.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(app._id, "reviewed")}
                                                className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#B5CD88] text-[#B5CD88] text-sm font-semibold hover:bg-[#B5CD88] hover:text-white transition"
                                            >
                                                <IoCheckmarkCircleOutline size={16} />
                                                Mark Reviewed
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(app._id, "rejected")}
                                                className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#BB616D] text-[#BB616D] text-sm font-semibold hover:bg-[#BB616D] hover:text-white transition"
                                            >
                                                <IoCloseCircleOutline size={16} />
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {app.status === "reviewed" && (
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, "rejected")}
                                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#BB616D] text-[#BB616D] text-sm font-semibold hover:bg-[#BB616D] hover:text-white transition"
                                        >
                                            <IoCloseCircleOutline size={16} />
                                            Reject
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ApplicantsList;