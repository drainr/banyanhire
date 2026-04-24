import React from "react";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { HiOutlineBriefcase } from "react-icons/hi";

const dashboardCards = [
    {
        title: "Manage Companies",
        text: "See a quick overview of Companies registered and view their users and Job postings.",
        icon: <HiOutlineBriefcase size={34} />,
        path: "/manage-companies",
    },
    {
        title: "Manage Users",
        text: "View and manage all Users.",
        icon: <CiViewList size={34} />,
        path: "/admin/jobs",
    },
    {
        title: "Manage Job Posting",
        text: "Review Job Postings by Companies.",
        icon: <IoCreateOutline size={34} />,
        path: "/jobs",
    },
    {
        title: "View Approvals",
        text: "See who Signed Up and review Candidate.",
        icon: <BsEye size={34} />,
        path: "/admin/approvals",
    },
];

const AdminDashboardBoxes = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardCards.map((card) => (
                <button
                    key={card.title}
                    onClick={() => navigate(card.path)}
                    className="group bg-white rounded-2xl shadow-md p-6 text-left hover:scale-[1.02] hover:shadow-lg transition-all duration-200 border border-transparent hover:border-[#91D8D4] h-full"
                >
                    <div className="flex items-center gap-4 mb-4">
                        {/* 1. THE ICON FIX: Fixed square with 'flex' forces the "ink" of the icon to the center */}
                        <div className="w-10 h-10 flex items-center justify-center shrink-0 text-[#583927]">
                            <div className="flex items-center justify-center w-full h-full text-[34px] leading-none">
                                {card.icon}
                            </div>
                        </div>

                        {/* 2. THE HEADING FIX: leading-none removes the "float" above the icon */}
                        <h2 className="text-2xl font-bold text-[#583927] leading-none m-0">
                            {card.title}
                        </h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed ml-14">
                        {card.text}
                    </p>
                </button>
            ))}
        </div>
    );
};

export default AdminDashboardBoxes;