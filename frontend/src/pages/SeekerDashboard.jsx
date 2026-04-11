import React from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import JobCard from "../components/JobCard.jsx";
import { IoCompassOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";

const SeekerDashboard = () => {
    return (
        <div className="min-h-screen w-full">
            <div className="bg-[#583927] h-screen w-[250px] fixed">
                <ul className="mt-20 league-gothic-font text-2xl text-[#FAF3E8]">
                   <li className="flex items-center gap-2 justify-center"><IoCompassOutline style={{}} /><a>
                       Explore</a></li>
                    <li className="flex items-center gap-2 justify-center"><CiBookmark /><a>Saved</a></li>
                </ul>
                <hr className="border-t border-[#FAF3E8] my-4 mr-5 ml-5" />
                <ul className="fixed left-15 bottom-0 flex flex-col text-2xl">
                <li className="flex items-center gap-2 justify-center league-gothic-font text-[#FAF3E8]"><a>Profile</a></li>
                    <li className="flex items-center gap-2 justify-center"><PinkButton text="Logout" /></li>
            </ul>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <JobCard />
            </div>

        </div>
    );
};

export default SeekerDashboard;