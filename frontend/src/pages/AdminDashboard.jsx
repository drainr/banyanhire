import React from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import Searchbar from "../components/Searchbar.jsx";
import Pagination from "../components/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import JobCardsGrid from "../components/ConcreteJobListings/JobCardsGrid.jsx";
import RecruiterJobCard from "../components/RecruiterJobCard.jsx";
import AdminDashboardBoxes from "../components/AdminDashboardComponents/AdminDashboardBoxes.jsx";

const RecruiterDashboard = ({ profile, profileImage }) => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <div className="bg-[#583927] h-screen w-62.5 fixed">
                <ul className="mt-20 text-left ml-8 text-md font-bold text-[#FAF3E8]">
                    <li className="flex items-center gap-2 pb-2 ">< CiViewList style={{}} /><a>
                        Dashboard </a></li>
                    <li className="flex items-center gap-2 pb-2 "><IoCreateOutline /><a>Manage Postings</a></li>
                    <li className="flex items-center gap-2 pb-2 "><IoCreateOutline /><a>Manage Users</a></li>
                    <li className="flex items-center gap-2 pb-2 "><BsEye /><a>View Approvals</a></li>
                </ul>
                <hr className="border-t border-[#FAF3E8] my-4 mr-5 ml-5" />
                <ul className="fixed left-14 bottom-3 flex flex-col text-2xl items-center">


                    <li className="flex items-center gap-2 p-2 justify-center">
                        <PinkButton text="Logout" onClick={() => navigate("/auth")}  />
                    </li>
                </ul>
            </div>
            <nav className="bg-[#FAF3E8] shadow-md ml-62.5 h-20">
                <div> <Searchbar /> </div>
            </nav>
            <main className="ml-62.5 pb-20">
                <div className="m-8">
                <AdminDashboardBoxes />
        </div>
</main>
        </div>
    );
};

export default RecruiterDashboard;