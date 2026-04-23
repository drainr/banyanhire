import React from "react";
import web1 from "../../assets/work-1.webp";
import web2 from "../../assets/work-2.jpg";
import web3 from "../../assets/work-3.jpg";


const HomepageExtraSection = () => {
    return (
        <section className="w-full px-8 py-16 bg-[#FAF3E8] rounded-2xl">
            <div className="max-w-6xl mx-auto">

                <div className="mb-14 text-center">
                    <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-3">
                        Your next opportunity
                    </p>

                    <h2 className="text-5xl font-bold text-[#583927] tracking-wide max-w-3xl mx-auto">
                        Thousands of academic and campus jobs ready for you.
                    </h2>

                    <div className="mt-6 space-y-2 text-xl text-[#583927] max-w-4xl mx-auto">
                        <p>Find roles from universities, colleges, and educational organizations.</p>
                        <p>Explore research, administration, teaching, and student-focused opportunities.</p>
                        <p>Discover internships, part-time roles, and full-time careers in one place.</p>
                    </div>
                </div>

                <div className="mb-14 text-center">
                    <h3 className="text-2xl font-bold text-[#583927] mb-5">
                        Not sure where to begin?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Get started with these popular suggestions:
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            Research Assistant
                        </span>
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            Full-Time
                        </span>
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            Remote
                        </span>
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            Internship
                        </span>
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            Student Services
                        </span>
                        <span className="px-5 py-3 rounded-full bg-white shadow text-[#583927] font-semibold">
                            IT Support
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-md p-10 mb-14 text-center">
                    <p className="text-sm uppercase tracking-wide text-[#BB616D] font-semibold mb-3">
                        Employers hiring on Campus Careers
                    </p>

                    <h3 className="text-3xl font-bold text-[#583927] max-w-3xl mx-auto leading-snug">
                        A trusted network for careers in higher education.
                    </h3>

                    <p className="mt-4 text-lg text-gray-700  mx-auto leading-snug">
                        Connect with institutions that are actively looking for talent,
                        from universities and colleges to research centers and educational organizations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-7 shadow text-center">
                        <img src={web1} className="w-full h-56 object-cover rounded-xl mb-4"/>
                        <h4 className="text-2xl font-bold text-[#583927] mb-3">
                            Grow your career
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Learn about opportunities, explore different paths, and build experience for your future.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-7 shadow text-center">

                        <img src={web2} className="w-full h-56 object-cover rounded-xl mb-4"/>
                        <h4 className="text-2xl font-bold text-[#583927] mb-3">
                            Get hired
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Apply for jobs, internships, and campus roles with a platform designed for academic hiring.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-7 shadow text-center">
                        <img src={web3} className="w-full h-56 object-cover rounded-xl mb-4"/>
                        <h4 className="text-2xl font-bold text-[#583927] mb-3">
                            Get connected
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            Build relationships with recruiters and institutions that can help shape your next step.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomepageExtraSection;