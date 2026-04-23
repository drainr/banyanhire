import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import PinkButton from "../components/buttons/PinkButton.jsx";
import Searchbar from "../components/Searchbar.jsx";
import { useAuth } from "../hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";

const CreateJob = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div>
        <Sidebar />

            <main className="ml-62.5 pb-20 bg-[#FAF3E8]">
                <div className="p-8">
                    <div className="mb-8">
                        <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                            Recruiter Tools
                        </p>
                        <h1 className="text-4xl font-bold text-[#583927] mb-3">
                            Create Job Posting
                        </h1>
                        <p className="text-[#583927]/80 text-center">
                            Add a new opportunity for students and professionals to discover on Campus Careers.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-md p-8">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Provost "
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Institution / Company
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. New College of Florida"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Sarasota, FL"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Employment Type
                                    </label>
                                    <select className="w-[210px] rounded-2xl border border-[#E7D8C7] bg-white p-2.5 mt-2 text-[#583927] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20">
                                        <option value="">Select employment type</option>
                                        <option value="full-time">Full-Time</option>
                                        <option value="part-time">Part-Time</option>
                                        <option value="internship">Internship</option>
                                        <option value="temporary">Temporary</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Salary Minimum
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 45000"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Salary Maximum
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 60000"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Job Description
                                </label>
                                <textarea
                                    rows="6"
                                    placeholder="Describe the role, responsibilities, and what candidates can expect."
                                    className="w-[750px] rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Qualifications
                                </label>
                                <textarea
                                    rows="5"
                                    placeholder="List required skills, education, or preferred experience."
                                    className="w-[750px] rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Application Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-5 pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-full bg-[#583927] text-[#FAF3E8] font-semibold hover:opacity-90 transition"
                                >
                                    Publish Job
                                </button>

                                <button
                                    type="button"
                                    className="px-8 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition"
                                >
                                    Save Draft
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateJob;