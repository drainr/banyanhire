import React from "react";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth.js";

const dashboardCards = [
    {
        title: "Manage Recruiters",
        text: "See a quick overview of recruiters registered and view their users and job postings.",
        icon: <HiOutlineBriefcase size={30} />,
        path: "/manage-recruiters",
    },
    {
        title: "Manage Seekers",
        text: "View and manage all seekers.",
        icon: <CiViewList size={30} />,
        path: "/manage-seekers",
    },
    {
        title: "Manage Job Posting",
        text: "Review job postings by companies.",
        icon: <IoCreateOutline size={30} />,
        path: "/jobs",
    }
];

const AdminDashboardBoxes = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div>
            <div className="mb-8">
                <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                    Admin Portal
                </p>

                <h1 className="text-4xl font-bold text-[#583927] mb-3">
                    Welcome, {user?.name || "Admin"}
                </h1>

                <p className="text-[#583927]/80">
                    Manage published job postings, review companies and users,
                    and approve or decline company accounts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardCards.map((card) => (
                    <button
                        key={card.title}
                        onClick={() => navigate(card.path)}
                        className="group bg-white rounded-2xl shadow-md p-6 text-left hover:scale-[1.02] hover:shadow-lg transition-all duration-200 border border-transparent hover:border-[#91D8D4] w-full"
                    >
                        <div className="flex gap-4">

                            {/* icon */}
                            <div className="w-10 flex justify-center text-[#583927] pt-1">
                                {card.icon}
                            </div>

                            {/* text */}
                            <div className="flex flex-col items-start text-left w-full">
                                <h2 className="text-2xl font-bold text-[#583927] leading-none mt-1.5">
                                    {card.title}
                                </h2>

                                <p className="text-gray-600 leading-relaxed mt-2 text-left">
                                    {card.text}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboardBoxes;