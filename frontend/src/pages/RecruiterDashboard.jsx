import React from 'react';
import Searchbar from "../components/Searchbar.jsx";
import RecruiterDashboardBoxes from "../components/RecruiterDashboardComponents/RecruiterDashboardBoxes.jsx";
import Sidebar from "../components/Sidebar.jsx";

const RecruiterDashboard = () => {
    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <nav className="bg-[#FAF3E8] ml-62.5 h-5">
            </nav>
            <main className="ml-62.5 pb-20">
                <div className="m-8">
                    <RecruiterDashboardBoxes />
                </div>
            </main>
        </div>
    );
};

export default RecruiterDashboard;