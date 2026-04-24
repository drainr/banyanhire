import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar.jsx";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth.js";
import { fetchRecruiters, disableUser, fetchRecruiterJobs, approveRecruiter, rejectRecruiter } from "../utils/api.js";

export default function ManageRecruiters() {
    const { token } = useAuth();
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedId, setExpandedId] = useState(null);
    const [recruiterJobs, setRecruiterJobs] = useState({});

    const recruitersPerPage = 10;

    useEffect(() => {
        const loadRecruiters = async () => {
            try {
                setLoading(true);
                const data = await fetchRecruiters(token);
                setRecruiters(data);
                setError("");
            } catch (err) {
                setError(err.message || "Failed to load recruiters");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            loadRecruiters();
        }
    }, [token]);

    const loadRecruiterJobs = async (recruiterId) => {
        if (recruiterJobs[recruiterId]) return; // Already loaded

        try {
            const jobs = await fetchRecruiterJobs(recruiterId, token);
            setRecruiterJobs(prev => ({
                ...prev,
                [recruiterId]: jobs
            }));
        } catch (err) {
            console.error("Failed to load recruiter jobs:", err);
        }
    };

    const handleDisableRecruiter = async (recruiterId, recruiterName) => {
        const confirmed = window.confirm(
            `Are you sure you want to disable ${recruiterName}'s account? They will no longer be able to log in or post jobs.`
        );

        if (!confirmed) return;

        try {
            const reason = window.prompt("Enter reason for disabling account (optional):");
            await disableUser(recruiterId, reason || "Account disabled by administrator", token);

            // Remove from list
            setRecruiters(recruiters.filter(r => r._id !== recruiterId));
            alert(`${recruiterName}'s account has been disabled and they have been notified via email.`);
        } catch (err) {
            alert("Failed to disable account: " + err.message);
        }
    };

    const handleApproveRecruiter = async (recruiterId, recruiterName) => {
        if (!window.confirm(`Approve ${recruiterName}'s recruiter account?`)) return;
        try {
            await approveRecruiter(recruiterId, token);
            setRecruiters(prev =>
                prev.map(r => r._id === recruiterId ? { ...r, isApproved: true } : r)
            );
        } catch (err) {
            alert("Failed to approve recruiter: " + err.message);
        }
    };

    const handleRejectRecruiter = async (recruiterId, recruiterName) => {
        if (!window.confirm(`Reject and disable ${recruiterName}'s account? They will be notified by email.`)) return;
        try {
            await rejectRecruiter(recruiterId, token);
            setRecruiters(prev => prev.filter(r => r._id !== recruiterId));
        } catch (err) {
            alert("Failed to reject recruiter: " + err.message);
        }
    };

    const filteredRecruiters = useMemo(() => {
        let filtered = recruiters.filter((recruiter) =>
            recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recruiter.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortType === "newest") {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortType === "oldest") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortType === "az") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "za") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        return filtered;
    }, [searchTerm, sortType, recruiters]);

    const totalPages = Math.ceil(filteredRecruiters.length / recruitersPerPage);
    const startIndex = (currentPage - 1) * recruitersPerPage;
    const currentRecruiters = filteredRecruiters.slice(startIndex, startIndex + recruitersPerPage);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#FAF3E8]">
                <Sidebar />
                <main className="ml-62.5 py-10 px-8">
                    <p className="text-[#583927]">Loading recruiters...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-62.5 py-10 px-8">
                <div className="mb-8">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                        Admin Tools
                    </p>
                    <h1 className="text-4xl font-bold text-[#583927]">
                        Recruiter Management
                    </h1>
                    <p className="mt-3 text-[#583927]/80">
                        Search, sort, review, and manage recruiter accounts and their job postings.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-[2rem] shadow-lg p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#583927]">
                                Recruiters ({filteredRecruiters.length})
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Manage recruiter accounts and view their job postings.
                            </p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search recruiters..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-4 pr-4 py-3 rounded-full border border-[#E7D8C7] bg-[#FAF3E8] text-[#583927] outline-none focus:ring-2 focus:ring-[#91D8D4]"
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex gap-4">
                        {["newest", "oldest", "az", "za"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSortType(type)}
                                className={`px-4 py-2 rounded-full font-semibold transition ${sortType === type
                                    ? "bg-[#91D8D4] text-[#583927]"
                                    : "bg-gray-200 text-[#583927] hover:bg-gray-300"
                                    }`}
                            >
                                {type === "newest" && "Newest"}
                                {type === "oldest" && "Oldest"}
                                {type === "az" && "A-Z"}
                                {type === "za" && "Z-A"}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-[#e0d5c7]">
                                <tr className="text-[#583927]">
                                    <th className="py-3 px-4 font-semibold">Name</th>
                                    <th className="py-3 px-4 font-semibold">Email</th>
                                    <th className="py-3 px-4 font-semibold">Company</th>
                                    <th className="py-3 px-4 font-semibold">Status</th>
                                    <th className="py-3 px-4 font-semibold">Joined</th>
                                    <th className="py-3 px-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecruiters.map((recruiter) => (
                                    <React.Fragment key={recruiter._id}>
                                        <tr className="border-b border-[#e0d5c7] hover:bg-[#FAF3E8]">
                                            <td className="py-4 px-4 font-semibold text-[#583927]">
                                                {recruiter.name}
                                            </td>
                                            <td className="py-4 px-4 text-[#583927]">
                                                {recruiter.email}
                                            </td>
                                            <td className="py-4 px-4 text-[#583927]">
                                                {recruiter.companyName || "N/A"}
                                            </td>
                                            <td className="py-4 px-4">
                                                {recruiter.isApproved ? (
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                        Approved
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-[#583927] text-sm">
                                                {new Date(recruiter.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4 flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => {
                                                        const isExpanding = expandedId !== recruiter._id;
                                                        setExpandedId(isExpanding ? recruiter._id : null);
                                                        if (isExpanding) loadRecruiterJobs(recruiter._id);
                                                    }}
                                                    className="px-3 py-1 rounded bg-[#91D8D4] hover:bg-[#7ec5cb] text-[#583927] font-semibold text-sm transition"
                                                >
                                                    Jobs
                                                </button>
                                                {!recruiter.isApproved && (
                                                    <button
                                                        onClick={() => handleApproveRecruiter(recruiter._id, recruiter.name)}
                                                        className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {!recruiter.isApproved && (
                                                    <button
                                                        onClick={() => handleRejectRecruiter(recruiter._id, recruiter.name)}
                                                        className="px-3 py-1 rounded bg-orange-400 hover:bg-orange-500 text-white font-semibold text-sm transition"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDisableRecruiter(recruiter._id, recruiter.name, recruiter.email)}
                                                    className="px-3 py-1 rounded bg-[#BB616D] hover:bg-[#a0505c] text-white font-semibold text-sm transition"
                                                >
                                                    Disable
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedId === recruiter._id && (
                                            <tr className="bg-[#f5f0eb] border-b border-[#e0d5c7]">
                                                <td colSpan="6" className="py-4 px-4">
                                                    <div>
                                                        <h4 className="font-semibold text-[#583927] mb-2">
                                                            Job Postings ({recruiterJobs[recruiter._id]?.length || 0})
                                                        </h4>
                                                        {recruiterJobs[recruiter._id] && recruiterJobs[recruiter._id].length > 0 ? (
                                                            <ul className="space-y-2">
                                                                {recruiterJobs[recruiter._id].map((job) => (
                                                                    <li key={job._id} className="text-[#583927] text-sm">
                                                                        • <strong>{job.title}</strong> - {job.location}
                                                                        <span className={`ml-2 text-xs font-semibold ${job.isActive ? "text-green-600" : "text-red-600"}`}>
                                                                            ({job.isActive ? "Active" : "Inactive"})
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-[#583927]/60 text-sm">No job postings found</p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            maxPage={totalPages}
                            onPageSelect={setCurrentPage}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}