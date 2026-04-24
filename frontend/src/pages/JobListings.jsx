import React, { useState } from 'react';
import Searchbar from "../components/Searchbar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Pagination from "../components/Pagination.jsx";
import JobCardsGrid from "../components/ConcreteJobListings/JobCardsGrid.jsx";
import useJobs from "../Hooks/useJobs.js";
import Sidebar from "../components/Sidebar.jsx";

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

    const locations = [...new Set(jobs.map((j) => j.location).filter(Boolean))].sort();
    const categories = [...new Set(jobs.map((j) => j.category).filter(Boolean))].sort();

    const [removedJobIds, setRemovedJobIds] = useState([]);
    const handleJobDeleted = (jobId) => {
        setRemovedJobIds((prev) => [...prev, jobId]);
    };

    const filteredJobs = jobs
        .filter((job) => !removedJobIds.includes(job._id))
        .filter((job) => {
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesTitle = job.title?.toLowerCase().includes(term);
                const matchesCompany = job.company?.toLowerCase().includes(term);
                if (!matchesTitle && !matchesCompany) return false;
            }
            if (filters.location && job.location !== filters.location) return false;
            if (filters.category && job.category !== filters.category) return false;
            if (filters.salaryMin && job.salaryMax < Number(filters.salaryMin)) return false;
            if (filters.salaryMax && job.salaryMin > Number(filters.salaryMax)) return false;
            return true;
        });

    const maxPage = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

    React.useEffect(() => {
        if (currentPage > maxPage) setCurrentPage(maxPage);
    }, [currentPage, maxPage]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <nav className="bg-[#FAF3E8] shadow-md ml-62.5 h-20">
                <div><Searchbar onChange={(e) => setSearchTerm(e.target.value)} /></div>
            </nav>

            <div className="ml-62.5">
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    categories={categories}
                    locations={locations}
                />
            </div>

            <div className="ml-62.5 px-8 pt-2">
                <p className="text-sm text-[#583927]">
                    {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
                </p>
            </div>

            <main className="ml-62.5 pb-20">
                {isLoading && <p className="px-8 pt-6 text-[#583927]">Loading jobs...</p>}
                {error && <p className="px-8 pt-6 text-[#BB616D]">{error}</p>}
                {!isLoading && !error && (
                    <JobCardsGrid jobs={filteredJobs} currentPage={currentPage} pageSize={pageSize} onJobDeleted={handleJobDeleted} />
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