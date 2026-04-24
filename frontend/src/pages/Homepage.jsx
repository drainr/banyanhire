import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VideoBox from '../components/HomepageComponents/VideoBoxHome.jsx';
import YellowButton from '../components/buttons/YellowButton.jsx';
import GreenButton from '../components/buttons/GreenButton.jsx';
import HomepageExtraSection from "../components/HomepageComponents/HomepageExtraSection.jsx";
import UniversityCarousel from "../components/HomepageComponents/UniversityCarousel.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Homepage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleFindJob = () => {
        if (!user) return navigate("/auth");
        navigate("/jobs");
    };

    const handleHireNow = () => {
        if (!user) return navigate("/auth");
        if (user.role === "recruiter") navigate("/Recruiter");
        else navigate("/auth");
    };

    return (
        <div className="bg-[#583927]">
            <Navbar />
            <main className="min-h-[900px] py-6 px-4">
                <VideoBox />
                <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                    <YellowButton text="Find a Job" onClick={handleFindJob} />
                    <GreenButton text="Hire Now" onClick={handleHireNow} />
                </div>
                <div className="m-16">
                    <HomepageExtraSection />
                </div>
                <div className="m-26">
                    <UniversityCarousel />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;