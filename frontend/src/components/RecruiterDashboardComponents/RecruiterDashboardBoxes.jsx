import React from "react";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { HiOutlineBriefcase } from "react-icons/hi";

const dashboardCards = [
    {
        title: "Job Postings",
        text: "View and manage all jobs you have posted.",
        icon: <CiViewList size={34} />,
        path: "/recruiter/jobs",
    },
    {
        title: "Create Job Posting",
        text: "Create a new academic job posting for applicants.",
        icon: <IoCreateOutline size={34} />,
        path: "/recruiter/create",
    },
    {
        title: "View Applicants",
        text: "See who applied and review candidate information.",
        icon: <BsEye size={34} />,
        path: "/recruiter/applicants",
    },
];

const RecruiterDashboardBoxes = () => {
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

export default RecruiterDashboardBoxes;