import React from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import JobCard from "../components/JobCard.jsx";
import { IoCompassOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Searchbar from "../components/Searchbar.jsx";
import Pagination from "../components/Pagination.jsx";

const SeekerDashboard = ({ profile, profileImage }) => {
    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <div className="bg-[#583927] h-screen w-[250px] fixed">
                <ul className="mt-20 league-gothic-font text-2xl text-[#FAF3E8]">
                   <li className="flex items-center gap-2 justify-center"><IoCompassOutline style={{}} /><a>
                       Explore</a></li>
                    <li className="flex items-center gap-2 justify-center"><CiBookmark /><a>Saved</a></li>
                </ul>
                <hr className="border-t border-[#FAF3E8] my-4 mr-5 ml-5" />
                <ul className="fixed left-14 bottom-3 flex flex-col text-2xl items-center">
                    <li className="flex flex-row items-center league-gothic-font text-[#FAF3E8]">

                        <div className="w-16 h-16 rounded-full t-2 scale-65 overflow-hidden border-4 border-[#91D8D4] bg-white flex items-center justify-center">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xl text-[#BB616D] font-bold">
          {profile?.name?.charAt(0) || "+"}
        </span>
                            )}
                        </div>

                        <a>{profile?.name || "Profile"}</a>
                    </li>

                    <li className="flex items-center gap-2 p-2 justify-center">
                        <PinkButton text="Logout" />
                    </li>
                </ul>
            </div>
            <nav className="bg-[#FAF3E8] shadow-md w-2/2 h-[80px]">
                <div> <Searchbar /> </div>
            </nav>
            <div className="flex flex-wrap justify-center items-center w-full">
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
            </div>
            <div className="ml-[250px] pb-20">
            <Pagination />
            </div>
        </div>
    );
};

export default SeekerDashboard;