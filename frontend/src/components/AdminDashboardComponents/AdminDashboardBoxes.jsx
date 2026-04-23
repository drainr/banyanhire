import React from "react";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { HiOutlineBriefcase } from "react-icons/hi";

const dashboardCards = [
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
        path: "/admin/review",
    },
    {
        title: "View Approvals",
        text: "See who Signed Up and review Candidate.",
        icon: <BsEye size={34} />,
        path: "/admin/approvals",
    },
    {
        title: "Job Overview",
        text: "See a quick overview of active jobs, deadlines, and status.",
        icon: <HiOutlineBriefcase size={34} />,
        path: "/recruiter/overview",
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
                    className="bg-white rounded-2xl shadow-md p-6 text-left hover:scale-[1.02] hover:shadow-lg transition duration-200 border border-transparent hover:border-[#91D8D4]"
                >
                    <div className="flex items-start gap-4">
                        <div className="text-[#583927] mt-1">{card.icon}</div>

                        <div>
                            <h2 className="text-2xl font-bold text-[#583927]">
                                {card.title}
                            </h2>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                {card.text}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default AdminDashboardBoxes;