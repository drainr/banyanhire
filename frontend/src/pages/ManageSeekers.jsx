import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/Sidebar.jsx";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth.js";
import { fetchSeekers, disableUser } from "../utils/api.js";

export default function ManageSeekers() {
    const { token } = useAuth();
    const [seekers, setSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const seekersPerPage = 10;

    useEffect(() => {
        const loadSeekers = async () => {
            try {
                setLoading(true);
                const data = await fetchSeekers(token);
                setSeekers(data);
                setError("");
            } catch (err) {
                setError(err.message || "Failed to load seekers");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            loadSeekers();
        }
    }, [token]);

    const handleDisableSeeker = async (seekerId, seekerName) => {
        const confirmed = window.confirm(
            `Are you sure you want to disable ${seekerName}'s account? They will no longer be able to log in or post jobs.`
        );

        if (!confirmed) return;

        try {
            const reason = window.prompt("Enter reason for disabling account (optional):");
            await disableUser(seekerId, reason || "Account disabled by administrator", token);

            // Remove from list
            setSeekers(seekers.filter(s => s._id !== seekerId));
            alert(`${seekerName}'s account has been disabled and they have been notified via email.`);
        } catch (err) {
            alert("Failed to disable account: " + err.message);
        }
    };

    const filteredSeekers = useMemo(() => {
        let filtered = seekers.filter((seeker) =>
            seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            seeker.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [searchTerm, sortType, seekers]);

    const totalPages = Math.ceil(filteredSeekers.length / seekersPerPage);
    const startIndex = (currentPage - 1) * seekersPerPage;
    const currentSeekers = filteredSeekers.slice(startIndex, startIndex + seekersPerPage);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#FAF3E8]">
                <Sidebar />
                <main className="ml-62.5 py-10 px-8">
                    <p className="text-[#583927]">Loading seekers...</p>
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
                        Seeker Management
                    </h1>
                    <p className="mt-3 text-[#583927]/80">
                        Search, sort, review, and manage seeker accounts and their job applications.
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
                                Seekers ({filteredSeekers.length})
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Manage seeker accounts and view their job applications.
                            </p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search seekers..."
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
                                    <th className="py-3 px-4 font-semibold">Joined</th>
                                    <th className="py-3 px-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSeekers.map((seeker) => (
                                    <React.Fragment key={seeker._id}>
                                        <tr className="border-b border-[#e0d5c7] hover:bg-[#FAF3E8]">
                                            <td className="py-4 px-4 font-semibold text-[#583927]">
                                                {seeker.name}
                                            </td>
                                            <td className="py-4 px-4 text-[#583927]">
                                                {seeker.email}
                                            </td>
                                            <td className="py-4 px-4 text-[#583927] text-sm">
                                                {new Date(seeker.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4 flex gap-2">
                                                <button
                                                    onClick={() => handleDisableSeeker(seeker._id, seeker.name, seeker.email)}
                                                    className="px-3 py-1 rounded bg-[#BB616D] hover:bg-[#a0505c] text-white font-semibold text-sm transition"
                                                >
                                                    Disable
                                                </button>
                                            </td>
                                        </tr>
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
