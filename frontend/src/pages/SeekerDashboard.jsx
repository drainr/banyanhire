import React from 'react';
import PinkButton from "../components/buttons/PinkButton.jsx";
import { IoCompassOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Searchbar from "../components/Searchbar.jsx";
import Pagination from "../components/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import JobCardsGrid from "../components/ConcreteJobListings/JobCardsGrid.jsx";
import useJobs from "../Hooks/useJobs.js";

const SeekerDashboard = ({ profile, profileImage }) => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = React.useState(1);
    // Jobs now come from the backend instead of local hardcoded templates.
    const { jobs, isLoading, error } = useJobs();
    const maxPage = Math.max(1, Math.ceil(jobs.length / pageSize));
    const navigate = useNavigate();

    React.useEffect(() => {
        // If result count shrinks, keep current page inside the valid range.
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [currentPage, maxPage]);

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <div className="bg-[#583927] h-screen w-62.5 fixed">
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
                        <PinkButton text="Logout" onClick={() => navigate("/auth")}  />
                    </li>
                </ul>
            </div>
            <nav className="bg-[#FAF3E8] shadow-md ml-62.5 h-20">
                <div> <Searchbar /> </div>
            </nav>
            <main className="ml-62.5 pb-20">
                {/* grid uses cards in JobCards */}
                {/* each card is individually made and added to the grid using factory */}
                {isLoading && <p className="px-8 pt-6 text-[#583927]">Loading jobs...</p>}
                {error && <p className="px-8 pt-6 text-[#BB616D]">{error}</p>}
                {!isLoading && !error && (
                    <JobCardsGrid jobs={jobs} currentPage={currentPage} pageSize={pageSize} />
                )}
                <div className="pb-20">
                    <Pagination
                        currentPage={currentPage}
                        maxPage={maxPage}
                        onPageSelect={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
};

export default SeekerDashboard;