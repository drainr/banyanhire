import React from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import JobCard from "../components/JobCard.jsx";

const SeekerDashboard = () => {
    return (
        <div className="min-h-screen w-full">
            <div className="bg-[#FAF3E8] h-screen w-[250px] fixed">
                <ul>
                   <li><a>Explore</a></li>
                    <li><a>Saved</a></li>
                </ul>
                <ul className="fixed bottom-0 flex flex-col ">
                <a>Profile</a>
                <PinkButton text="Logout" />
            </ul>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <JobCard />
            </div>

        </div>
    );
};

export default SeekerDashboard;