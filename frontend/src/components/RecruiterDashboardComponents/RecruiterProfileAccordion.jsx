import React, { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import UserProfile from "../../pages/UserProfile.jsx";
import CompanyProfile from "../../pages/CompanyProfile.jsx";

export default function RecruiterProfileAccordion() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-62.5 py-10 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                            Recruiter Settings
                        </p>

                        <h1 className="text-4xl font-bold text-[#583927]">
                            Profile Management
                        </h1>

                        <p className="mt-3 text-[#583927]/80">
                            Manage your personal profile and company profile from one place.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection("user")}
                                className="w-full px-10 py-6 flex items-center justify-between bg-[#91D8D4] text-[#583927]"
                            >
                                <span className="text-2xl font-bold">User Profile</span>
                                <span className="text-3xl font-bold">{openSection === "user" ? "−" : "+"}</span>
                            </button>

                            {openSection === "user" && (
                                <div className="p-8 bg-white">
                                    <UserProfile embedded />
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection("company")}
                                className="w-full px-10 py-6 flex items-center justify-between bg-[#91D8D4] text-[#583927]"
                            >
                                <span className="text-2xl font-bold">Company Profile</span>
                                <span className="text-3xl font-bold">{openSection === "company" ? "−" : "+"}</span>
                            </button>

                            {openSection === "company" && (
                                <div className="p-8 bg-white">
                                    <CompanyProfile />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}