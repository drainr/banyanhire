import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";
import { fetchRecruiters, fetchSeekers, fetchJobs } from "../utils/api.js";
import { HiOutlineBriefcase, HiOutlineUsers, HiOutlineUserGroup, HiOutlineClipboardList } from "react-icons/hi";

const StatCard = ({ icon, label, value, sublabel, onClick, highlight }) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 transition-all duration-200
            ${onClick ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:border-[#91D8D4] border border-transparent" : "border border-transparent"}
            ${highlight ? "border-l-4 border-l-[#BB616D]" : ""}
        `}
    >
        <div className="flex items-center justify-between">
            <span className="text-[#583927]/60 text-sm font-semibold uppercase tracking-wide">{label}</span>
            <div className="text-[#91D8D4]">{icon}</div>
        </div>
        <div className="text-5xl font-bold text-[#583927]">{value ?? "—"}</div>
        {sublabel && (
            <p className="text-xs text-[#583927]/60">{sublabel}</p>
        )}
        {onClick && (
            <span className="text-xs text-[#91D8D4] font-semibold mt-1">View →</span>
        )}
    </div>
);

const AdminDashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        activeJobs: null,
        recruiters: null,
        seekers: null,
        pendingRecruiters: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const load = async () => {
            try {
                const [recruiters, seekers, jobs] = await Promise.allSettled([
                    fetchRecruiters(token),
                    fetchSeekers(token),
                    fetchJobs(),
                ]);

                const recruiterList = recruiters.status === "fulfilled" ? recruiters.value : [];
                const seekerList = seekers.status === "fulfilled" ? seekers.value : [];
                const jobList = jobs.status === "fulfilled" ? jobs.value : [];

                setStats({
                    activeJobs: jobList.length,
                    recruiters: recruiterList.length,
                    seekers: seekerList.length,
                    pendingRecruiters: recruiterList.filter(r => !r.isApproved).length,
                });
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [token]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <main className="ml-[250px] p-8">
                <div className="mb-10">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                        Admin Portal
                    </p>
                    <h1 className="text-4xl font-bold text-[#583927] mb-2">
                        Welcome, {user?.name || "Admin"}
                    </h1>
                    <p className="text-[#583927]/70">
                        Platform overview at a glance.
                    </p>
                </div>

                {loading ? (
                    <p className="text-[#583927] text-sm">Loading stats...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            icon={<HiOutlineBriefcase size={22} />}
                            label="Active Job Postings"
                            value={stats.activeJobs}
                            sublabel="Currently live on the platform"
                            onClick={() => navigate("/jobs")}
                        />
                        <StatCard
                            icon={<HiOutlineUsers size={22} />}
                            label="Recruiters"
                            value={stats.recruiters}
                            sublabel="Approved & pending"
                            onClick={() => navigate("/manage-recruiters")}
                        />
                        <StatCard
                            icon={<HiOutlineUserGroup size={22} />}
                            label="Job Seekers"
                            value={stats.seekers}
                            sublabel="Registered seekers"
                            onClick={() => navigate("/manage-seekers")}
                        />
                        <StatCard
                            icon={<HiOutlineClipboardList size={22} />}
                            label="Pending Approvals"
                            value={stats.pendingRecruiters}
                            sublabel="Recruiters awaiting approval"
                            onClick={stats.pendingRecruiters > 0 ? () => navigate("/manage-recruiters") : null}
                            highlight={stats.pendingRecruiters > 0}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;