import React from "react";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { HiOutlineBriefcase } from "react-icons/hi";
import { deleteJob } from "../../utils/api";
import { useState } from "react";

const dashboardCards = [
    {
        title: "Manage Companies",
        text: "See a quick overview of companies registered and view their users and job postings.",
        icon: <HiOutlineBriefcase size={30} />,
        path: "/manage-companies",
    },
    {
        title: "Manage Users",
        text: "View and manage all users.",
        icon: <CiViewList size={30} />,
        path: "/admin/jobs",
    },
    {
        title: "Manage Job Posting",
        text: "Review job postings by companies.",
        icon: <IoCreateOutline size={30} />,
        path: "/jobs",
    },
    {
        title: "View Approvals",
        text: "See who signed up and review candidates.",
        icon: <BsEye size={30} />,
        path: "/admin/approvals",
    },
];

const AdminDashboardBoxes = () => {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("authToken"));

    const handleDeleteJob = async (jobId) => {
        try {
            await deleteJob(jobId, token);
            alert("Job deleted successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardCards.map((card, index) => (
                <div key={index} className="relative">
                    <button
                        onClick={() => navigate(card.path)}
                        className="group bg-white rounded-2xl shadow-md p-6 text-left hover:scale-[1.02] hover:shadow-lg transition-all duration-200 border border-transparent hover:border-[#91D8D4]"
                    >
                        <div className="flex items-start gap-4 mb-4">


                            <div className="w-10 h-10 flex items-center justify-center shrink-0 text-[#583927]">
                                {card.icon}
                            </div>


                            <h2 className="text-2xl font-bold text-[#583927] leading-tight mt-1">
                                {card.title}
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed ml-14">
                            {card.text}
                        </p>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboardBoxes;