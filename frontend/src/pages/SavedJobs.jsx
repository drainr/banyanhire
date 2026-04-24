import React, { useState, useEffect } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { fetchSavedJobs } from "../utils/api.js";
import Sidebar from "../components/Sidebar.jsx";

const SavedJobs = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [savedJobs, setSavedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            fetchSavedJobs(token)
                .then(jobs => setSavedJobs(jobs))
                .catch(err => setError(err.message || "Failed to load saved jobs"))
                .finally(() => setIsLoading(false));
        }
    }, [token]);

    const formatSalary = (min, max) => {
        if (!min && !max) return "Not listed";
        const fmt = (n) => "$" + (n / 1000).toFixed(0) + "k";
        if (min && max) return `${fmt(min)} – ${fmt(max)}`;
        return min ? `From ${fmt(min)}` : `Up to ${fmt(max)}`;
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <main className="ml-62.5 p-8">
                <h1 className="league-gothic-font text-[#583927] text-4xl mb-8">SAVED JOBS</h1>

                {isLoading && <p className="text-[#583927]">Loading saved jobs...</p>}
                {error && <p className="text-[#BB616D]">{error}</p>}

                {!isLoading && !error && savedJobs.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-[#583927] text-lg mb-4">No saved jobs yet.</p>
                        <button
                            onClick={() => navigate("/jobs")}
                            className="text-[#91D8D4] font-bold hover:underline"
                        >
                            Browse jobs and bookmark ones you like
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                        <div
                            key={job._id}
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
                        >
                            <h3 className="font-bold text-[#583927] text-lg mb-1 truncate">{job.title}</h3>
                            <p className="text-[#91D8D4] text-sm font-semibold mb-3">{job.institution}</p>
                            <div className="flex items-center gap-1 text-sm text-[#583927] mb-2">
                                <IoLocationOutline size={16} className="text-[#91D8D4]" />
                                {job.location}
                            </div>
                            <div className="text-sm text-[#B5CD88] font-semibold">
                                {formatSalary(job.salaryMin, job.salaryMax)}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SavedJobs;