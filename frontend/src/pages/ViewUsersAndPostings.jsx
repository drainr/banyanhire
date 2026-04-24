import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import JobCardsGrid from "../components/ConcreteJobListings/JobCardsGrid.jsx";
// import useJobs from "../Hooks/useJobs.js";
import JobCardTemplate from "../components/ConcreteJobListings/JobCardTemplate.jsx";
import { fetchJobs } from "../utils/api";

const ViewUsersAndPostings = () => {
    const { id } = useParams();
    const decodedInstitution = decodeURIComponent(id);
    const users = [
        { id: 1, name: "Maya Johnson", email: "maya@ncf.edu" },
        { id: 2, name: "Jacob Smith", email: "jacob@ncf.edu" },
        { id: 3, name: "Lena Brown", email: "lena@ncf.edu" },
    ];
    const [currentPage] = useState(1);
    const pageSize = 6;
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs()
            .then((data) => setJobs(data))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    // Enhanced filter: show jobs for this company by institution name OR recruiter companyName
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            // Match by institution field
            if (String(job.institution) === decodedInstitution) return true;
            // Match by recruiter companyName (if recruiter is populated)
            if (job.recruiter && job.recruiter.companyName === decodedInstitution) return true;
            return false;
        });
    }, [jobs, decodedInstitution]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-64 py-10 px-8">
                <div className="mb-8">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">Admin Tools</p>
                    <h1 className="text-4xl font-bold text-[#583927]">Company Details</h1>
                </div>

                <div className="flex flex-col gap-10">

                    {/* --- Team Section --- */}
                    <section className="bg-white rounded-4xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-[#583927] mb-6">Company Team</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((user) => (
                                <div key={user.id} className="group flex items-center justify-between border border-[#E7D8C7] rounded-xl p-4 hover:border-[#BB616D] transition-all">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-full bg-[#91D8D4] flex items-center justify-center font-bold text-[#583927] shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-[#583927] leading-tight truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Manual "X" Delete Button (not implemented) */}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- Job Postings Section --- */}
                    <section className="bg-white rounded-4xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-[#583927] mb-6">Posted Jobs</h2>

                        {isLoading && <p className="italic text-gray-500">Loading listings...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {!isLoading && !error && (
                            <JobCardsGrid
                                jobs={filteredJobs}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onJobDeleted={(deletedId) => {
                                    setJobs((prev) => prev.filter((job) => job._id !== deletedId));
                                }}
                            />
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ViewUsersAndPostings;