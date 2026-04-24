import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar.jsx";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const companyData = [
    { id: 1, name: "New College of Florida", email: "hr@ncf.edu", createdAt: "2026-04-20", status: "Approved" },
    { id: 2, name: "University of South Florida", email: "recruit@usf.edu", createdAt: "2026-04-15", status: "Pending" },
    { id: 3, name: "Campus Careers Inc.", email: "jobs@campuscareers.com", createdAt: "2026-04-10", status: "Approved" },
    { id: 4, name: "Florida Gulf Coast University", email: "careers@fgcu.edu", createdAt: "2026-04-22", status: "Pending" },
    { id: 5, name: "University of Tampa", email: "hr@ut.edu", createdAt: "2026-04-05", status: "Approved" },
    { id: 6, name: "Ringling College of Art and Design", email: "jobs@ringling.edu", createdAt: "2026-04-12", status: "Approved" },
    { id: 7, name: "Sarasota Memorial Hospital", email: "careers@smh.com", createdAt: "2026-04-18", status: "Pending" },
    { id: 8, name: "University of Florida", email: "recruitment@uf.edu", createdAt: "2026-04-11", status: "Approved" },
    { id: 9, name: "Florida State University", email: "jobs@fsu.edu", createdAt: "2026-04-01", status: "Approved" },
    { id: 10, name: "Amazon", email: "campus@amazon.com", createdAt: "2026-04-14", status: "Pending" },

    { id: 11, name: "Google", email: "internships@google.com", createdAt: "2026-04-09", status: "Approved" },
    { id: 12, name: "Meta", email: "recruit@meta.com", createdAt: "2026-04-16", status: "Approved" },
    { id: 13, name: "Apple", email: "students@apple.com", createdAt: "2026-04-06", status: "Pending" },
    { id: 14, name: "Microsoft", email: "careers@microsoft.com", createdAt: "2026-04-07", status: "Approved" },
    { id: 15, name: "Tesla", email: "jobs@tesla.com", createdAt: "2026-04-13", status: "Pending" },
    { id: 16, name: "LinkedIn", email: "recruit@linkedin.com", createdAt: "2026-04-02", status: "Approved" },
    { id: 17, name: "Indeed", email: "careers@indeed.com", createdAt: "2026-04-19", status: "Approved" },
    { id: 18, name: "Handshake", email: "campus@handshake.com", createdAt: "2026-04-03", status: "Pending" },
    { id: 19, name: "University of Miami", email: "jobs@miami.edu", createdAt: "2026-04-21", status: "Approved" },
    { id: 20, name: "Florida Atlantic University", email: "recruit@fau.edu", createdAt: "2026-04-08", status: "Pending" },

    { id: 21, name: "University of Central Florida", email: "hr@ucf.edu", createdAt: "2026-04-17", status: "Approved" },
    { id: 22, name: "MIT", email: "careers@mit.edu", createdAt: "2026-04-04", status: "Approved" },
    { id: 23, name: "Stanford University", email: "jobs@stanford.edu", createdAt: "2026-04-23", status: "Pending" },
    { id: 24, name: "Harvard University", email: "recruit@harvard.edu", createdAt: "2026-04-18", status: "Approved" },
    { id: 25, name: "Yale University", email: "careers@yale.edu", createdAt: "2026-04-11", status: "Pending" },
    { id: 26, name: "Princeton University", email: "jobs@princeton.edu", createdAt: "2026-04-07", status: "Approved" },
    { id: 27, name: "Columbia University", email: "hr@columbia.edu", createdAt: "2026-04-01", status: "Approved" },
    { id: 28, name: "Duke University", email: "careers@duke.edu", createdAt: "2026-04-12", status: "Pending" },
    { id: 29, name: "New York University", email: "jobs@nyu.edu", createdAt: "2026-04-06", status: "Approved" },
    { id: 30, name: "University of Texas", email: "recruit@utexas.edu", createdAt: "2026-04-09", status: "Pending" },

    { id: 31, name: "Spotify", email: "jobs@spotify.com", createdAt: "2026-04-14", status: "Approved" },
    { id: 32, name: "Netflix", email: "recruit@netflix.com", createdAt: "2026-04-03", status: "Pending" },
    { id: 33, name: "Airbnb", email: "careers@airbnb.com", createdAt: "2026-04-15", status: "Approved" },
    { id: 34, name: "Uber", email: "jobs@uber.com", createdAt: "2026-04-22", status: "Pending" },
    { id: 35, name: "Lyft", email: "recruit@lyft.com", createdAt: "2026-04-10", status: "Approved" },
    { id: 36, name: "Adobe", email: "careers@adobe.com", createdAt: "2026-04-13", status: "Approved" },
    { id: 37, name: "Salesforce", email: "jobs@salesforce.com", createdAt: "2026-04-16", status: "Pending" },
    { id: 38, name: "Oracle", email: "recruit@oracle.com", createdAt: "2026-04-08", status: "Approved" },
    { id: 39, name: "Intel", email: "jobs@intel.com", createdAt: "2026-04-05", status: "Pending" },
    { id: 40, name: "IBM", email: "careers@ibm.com", createdAt: "2026-04-19", status: "Approved" },

    { id: 41, name: "Goldman Sachs", email: "recruit@goldman.com", createdAt: "2026-04-11", status: "Pending" },
    { id: 42, name: "JPMorgan Chase", email: "careers@jpmorgan.com", createdAt: "2026-04-17", status: "Approved" },
    { id: 43, name: "PwC", email: "jobs@pwc.com", createdAt: "2026-04-06", status: "Approved" },
    { id: 44, name: "Deloitte", email: "recruit@deloitte.com", createdAt: "2026-04-02", status: "Pending" },
    { id: 45, name: "KPMG", email: "careers@kpmg.com", createdAt: "2026-04-21", status: "Approved" },
    { id: 46, name: "EY", email: "jobs@ey.com", createdAt: "2026-04-18", status: "Pending" },
    { id: 47, name: "Nike", email: "careers@nike.com", createdAt: "2026-04-07", status: "Approved" },
    { id: 48, name: "Adidas", email: "jobs@adidas.com", createdAt: "2026-04-14", status: "Pending" },
    { id: 49, name: "OpenAI", email: "careers@openai.com", createdAt: "2026-04-23", status: "Approved" },
    { id: 50, name: "BanyanHire", email: "admin@banyanhire.com", createdAt: "2026-04-24", status: "Approved" },
];

export default function ManageCompanies() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("newest");

    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 10;

    const filteredCompanies = useMemo(() => {
        let filtered = companyData.filter((company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortType === "newest") {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        if (sortType === "oldest") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        if (sortType === "az") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sortType === "za") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        return filtered;
    }, [searchTerm, sortType]);
    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

    const startIndex = (currentPage - 1) * companiesPerPage;
    const currentCompanies = filteredCompanies.slice(
        startIndex,
        startIndex + companiesPerPage
    );

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-62.5 py-10 px-8">
                <div className="">
                    <div className="mb-8">
                        <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                            Admin Tools
                        </p>

                        <h1 className="text-4xl font-bold text-[#583927]">
                            Company Management
                        </h1>

                        <p className="mt-3 text-[#583927]/80">
                            Search, sort, review, and manage recruiter company accounts.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-lg p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-[#583927]">
                                    Companies
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Manage registered employer and institution profiles.
                                </p>
                            </div>

                            <div className="relative w-full md:w-80">
                                <FiSearch
                                    size={18}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 text-transparent"
                                />

                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E7D8C7] bg-[#FAF3E8] text-[#583927] outline-none focus:ring-2 focus:ring-[#91D8D4]"
                                />
                            </div>
                        </div>

                        <div className="mb-6 flex justify-end">
                            <select
                                value={sortType}
                                onChange={(e) => {
                                    setSortType(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-5 py-3 rounded-full border border-[#E7D8C7] bg-[#FAF3E8] text-[#583927] font-medium outline-none focus:ring-2 focus:ring-[#91D8D4]"
                            >
                                <option value="newest">Newest → Oldest</option>
                                <option value="oldest">Oldest → Newest</option>
                                <option value="az">Alphabetical A-Z</option>
                                <option value="za">Alphabetical Z-A</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-[#E7D8C7]">
                            <table className="w-full text-left">
                                <thead className="bg-[#91D8D4] text-[#583927]">
                                <tr>
                                    <th className="px-6 py-4">Company Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {currentCompanies.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="border-t border-[#E7D8C7]"
                                    >
                                        <td className="px-6 py-5 font-semibold text-[#583927]">
                                            {company.name}
                                        </td>

                                        <td className="px-6 py-5 text-gray-600">
                                            {company.email}
                                        </td>

                                        <td className="px-6 py-5 text-gray-600">
                                            {company.createdAt}
                                        </td>

                                        <td className="px-6 py-5">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                                        company.status === "Approved"
                                                            ? "bg-[#B5CD88] text-white"
                                                            : "bg-[#BB616D] text-white"
                                                    }`}
                                                >
                                                    {company.status}
                                                </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 rounded-full bg-[#583927] text-white text-sm font-semibold hover:opacity-90 transition" onClick={() =>
                                                    navigate(`/view/${encodeURIComponent(company.name)}`)
                                                }>
                                                    View
                                                </button>

                                                <button className="px-4 py-2 rounded-full border border-[#583927] text-[#583927] text-sm font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition">
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredCompanies.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-[#583927]"
                                        >
                                            No companies found.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                    </div>
                </div>
            </main>
        </div>
    );
}