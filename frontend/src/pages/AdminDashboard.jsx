import React from 'react';
import Searchbar from "../components/Searchbar.jsx";
import AdminDashboardBoxes from "../components/AdminDashboardComponents/AdminDashboardBoxes.jsx";
import Sidebar from "../components/Sidebar.jsx";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <nav className="bg-[#FAF3E8] shadow-md ml-62.5 h-20">
                <div><Searchbar /></div>
            </nav>
            <main className="ml-62.5 pb-20">
                <div className="m-8">
                    <AdminDashboardBoxes />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;