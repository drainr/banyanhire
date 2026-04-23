import React from 'react';
import '../App.css'
import logo from '../assets/logo-banyanhire.png';
import NavbarAnimationButton from "./buttons/NavbarAnimationButton.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import PinkButton from './buttons/PinkButton.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    const handleFindJob = () => {
        if (!user) return navigate("/auth");
        navigate("/jobs");
    };

    const handleHireNow = () => {
        if (!user) return navigate("/auth");
        if (user.role === "recruiter") navigate("/Recruiter");
        else navigate("/auth");
    };

    const handleDashboardRedirect = () => {
        if (user?.role === "admin") navigate("/admin");
        else if (user?.role === "seeker") navigate("/seeker");
        else if (user?.role === "recruiter") navigate("/recruiter");
    };

    return (
        <div className="navbar bg-[#583927]">
            <div className="navbar-start">
                <img
                    src={logo}
                    alt="BanyanHire logo"
                    className="h-12 w-auto cursor-pointer"
                    onClick={() => navigate("/")}
                />
            </div>
            <div className="navbar-center">
                <NavbarAnimationButton text="Find a Job" onClick={handleFindJob} />
                <NavbarAnimationButton text="Hire Now" onClick={handleHireNow} />
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-[#FAF3E8] mr-2">Hi, {user.name}</span>
                        <button
                            onClick={handleDashboardRedirect}
                            className="btn rounded-3xl bg-transparent text-[#FAF3E8] border-[#FAF3E8]"
                        >
                            Dashboard
                        </button>
                        <PinkButton text="Logout" onClick={handleLogout} scale={.5} />
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/auth")}
                            className="btn rounded-3xl bg-transparent text-[#FAF3E8] border-[#FAF3E8]"
                        >
                            LogIn
                        </button>
                        <button
                            onClick={() => navigate("/auth")}
                            className="btn rounded-3xl m-2 text-[#583927] bg-[#FAF3E8] border-[#FAF3E8]"
                        >
                            SignUp
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;