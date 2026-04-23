import React, { useState } from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import { IoCompassOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Searchbar from "../components/Searchbar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Pagination from "../components/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import JobCardsGrid from "../components/ConcreteJobListings/JobCardsGrid.jsx";
import useJobs from "../Hooks/useJobs.js";
import { useAuth } from "../hooks/useAuth.js";

const JobListings = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        category: "",
        salaryMin: "",
        salaryMax: "",
    });

    const { jobs, isLoading, error } = useJobs();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Extract unique locations and categories from job data for dropdowns
    const locations = [...new Set(jobs.map((j) => j.location).filter(Boolean))].sort();
    const categories = [...new Set(jobs.map((j) => j.category).filter(Boolean))].sort();

    // Apply search and filters
    const filteredJobs = jobs.filter((job) => {
        // Search by title or company
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesTitle = job.title?.toLowerCase().includes(term);
            const matchesCompany = job.company?.toLowerCase().includes(term);
            if (!matchesTitle && !matchesCompany) return false;
        }

        // Filter by location
        if (filters.location && job.location !== filters.location) return false;

        // Filter by category
        if (filters.category && job.category !== filters.category) return false;

        // Filter by salary range
        if (filters.salaryMin && job.salaryMax < Number(filters.salaryMin)) return false;
        if (filters.salaryMax && job.salaryMin > Number(filters.salaryMax)) return false;

        return true;
    });

    const maxPage = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

    React.useEffect(() => {
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [currentPage, maxPage]);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            {/* Sidebar */}
            <div className="bg-[#583927] h-screen w-62.5 fixed">
                <ul className="mt-20 text-left ml-8 text-md font-bold text-[#FAF3E8]">
                    <li className="flex items-center gap-2"><IoCompassOutline /><a>Explore</a></li>
                    <li className="flex items-center gap-2"><CiBookmark /><a>Saved</a></li>
                </ul>
                <hr className="border-t border-[#FAF3E8] my-4 mr-5 ml-5" />
                <ul className="fixed left-14 bottom-3 flex flex-col text-2xl items-center">
                    <li className="flex flex-row items-center league-gothic-font text-[#FAF3E8]">
                        <div className="w-16 h-16 rounded-full t-2 scale-65 overflow-hidden border-4 border-[#91D8D4] bg-white flex items-center justify-center">
                            <span className="text-xl text-[#BB616D] font-bold">
                                {user?.name?.charAt(0) || "+"}
                            </span>
                        </div>
                        <a>{user?.name}</a>
                    </li>
                    <li className="flex items-center gap-2 p-2 justify-center">
                        <PinkButton text="Logout" onClick={() => {logout(); navigate("/auth");}} />
                    </li>
                </ul>
            </div>

            {/* Top bar with search */}
            <nav className="bg-[#FAF3E8] shadow-md ml-62.5 h-20">
                <div><Searchbar onChange={(e) => setSearchTerm(e.target.value)} /></div>
            </nav>

            {/* Filters */}
            <div className="ml-62.5">
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    categories={categories}
                    locations={locations}
                />
            </div>

            {/* Results info */}
            <div className="ml-62.5 px-8 pt-2">
                <p className="text-sm text-[#583927]">
                    {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
                </p>
            </div>

            {/* Job cards */}
            <main className="ml-62.5 pb-20">
                {isLoading && <p className="px-8 pt-6 text-[#583927]">Loading jobs...</p>}
                {error && <p className="px-8 pt-6 text-[#BB616D]">{error}</p>}
                {!isLoading && !error && (
                    <JobCardsGrid jobs={filteredJobs} currentPage={currentPage} pageSize={pageSize} />
                )}
                <div className="pb-20">
                    <Pagination
                        currentPage={currentPage}
                        maxPage={maxPage}
                        onPageSelect={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
};

export default JobListings;