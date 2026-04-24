import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PinkButton from "./buttons/PinkButton.jsx";
import { IoCompassOutline, IoBriefcaseOutline, IoCreateOutline, IoHomeOutline } from "react-icons/io5";
import { CiBookmark, CiViewList } from "react-icons/ci";
import { BsEye } from "react-icons/bs";
import logo from '../assets/logo-banyanhire.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center gap-2 pb-3 cursor-pointer transition-colors ${
            isActive(path) ? "text-[#91D8D4]" : "text-[#FAF3E8] hover:text-[#91D8D4]"
        }`;

    const seekerLinks = [
        { path: "/", icon: <IoHomeOutline />, label: "Home" },
        { path: "/seeker", icon: <IoBriefcaseOutline />, label: "Dashboard" },
        { path: "/jobs", icon: <IoCompassOutline />, label: "Explore Jobs" },
        { path: "/jobs/saved", icon: <CiBookmark />, label: "Saved Jobs" },
    ];

    const recruiterLinks = [
        { path: "/", icon: <IoHomeOutline />, label: "Home" },
        { path: "/recruiter", icon: <CiViewList />, label: "Dashboard" },
        { path: "/jobs", icon: <IoCompassOutline />, label: "Browse All Jobs" },
        { path: "/jobs/my", icon: <BsEye />, label: "My Job Postings" },
        { path: "/create-job", icon: <IoCreateOutline />, label: "New Job Posting" },
    ];

    const adminLinks = [
        { path: "/", icon: <IoHomeOutline />, label: "Home" },
        { path: "/admin", icon: <CiViewList />, label: "Dashboard" },
        { path: "/manage-recruiters", icon: <IoCreateOutline />, label: "Manage Recruiters" },
        { path: "/manage-seekers", icon: <IoCreateOutline />, label: "Manage Seekers" },
        { path: "/jobs", icon: <IoCreateOutline />, label: "Manage Job Postings" }
    ];

    const getLinks = () => {
        if (user?.role === "admin") return adminLinks;
        if (user?.role === "recruiter") return recruiterLinks;
        return seekerLinks;
    };

    return (
        <div className="bg-[#583927] h-screen w-62.5 fixed z-40">
            {/* Logo */}
            <div className="pt-6 pl-6 cursor-pointer" onClick={() => navigate("/")}>
                <img src={logo} alt="BanyanHire" className="h-10 w-auto" />
            </div>

            {/* Nav links */}
            <ul className="mt-10 text-left ml-8 text-md font-bold">
                {getLinks().map((link, i) => (
                    <li
                        key={i}
                        className={linkClass(link.path)}
                        onClick={() => navigate(link.path)}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </li>
                ))}
            </ul>

            <hr className="border-t border-[#FAF3E8] my-4 mr-5 ml-5" />

            {/* User info + logout */}
            <ul className="fixed left-14 bottom-3 flex flex-col text-2xl items-center">
                {user?.role !== "admin" && (
                    <li
                        className="flex flex-row items-center league-gothic-font text-[#FAF3E8] cursor-pointer"
                        onClick={() =>
                            navigate(user?.role === "recruiter" ? "/recruiterprofile" : "/profile")
                        }
                    >
                        <div className="w-16 h-16 rounded-full scale-65 overflow-hidden border-4 border-[#91D8D4] bg-white flex items-center justify-center">
                <span className="text-xl text-[#BB616D] font-bold">
                    {user?.name?.charAt(0) || "+"}
                </span>
                        </div>
                        <span>{user?.name || "Profile"}</span>
                    </li>
                )}

                <li className="flex items-center gap-2 p-2 justify-center">
                    <PinkButton text="Logout" onClick={handleLogout} />
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;