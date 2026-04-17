import React from 'react';
import AquaButton from "./buttons/AquaButton.jsx";
import PinkButton from "./buttons/PinkButton.jsx";

const RecruiterJobCard = ({ title }) => {
    return (
        <div className="m-10">
            <div className="flex items-center justify-between bg-white min-h-[96px] w-[800px] px-6 py-4 rounded-lg shadow">
                <h1 className="text-[25px] font-[700] text-black leading-none m-0">
                    {title || "Random"}
                </h1>

                <div className="flex items-center gap-8 shrink-0 scale-75">
                    <AquaButton text="Edit" />
                    <PinkButton text="Delete" />
                </div>
            </div>
        </div>
    );
};

export default RecruiterJobCard;