import React from "react";

const universities = [
    "New College of Florida",
    "University of South Florida",
    "Florida State University",
    "University of Florida",
    "Ringling College",
    "University of Tampa",
    "Eckerd College",
    "Florida Gulf Coast University",
    "St. Thomas University",
    "Savannah College of Art and Design",
    "New York University",
    "Yale University",
    "Wake Forest University",
    "University of Miami",
];

const UniversityCarousel = () => {
    return (
        <section className="w-full py-14 bg-[#583927] overflow-hidden">
            <div className="max-w-6xl mx-auto text-center mb-8 px-4">
                <p className="text-[#91D8D4] font-semibold uppercase tracking-wide mb-2">
                    Institutions hiring on <span className="league-gothic-font text-lg">BanyanHire</span>
                </p>
                <h3 className="text-3xl font-bold text-[#FAF3E8]">
                    Trusted by colleges and universities
                </h3>
            </div>

            <div className="relative w-full overflow-hidden rounded-lg">
                <div className="flex w-max animate-scroll gap-6">
                    {[...universities, ...universities].map((school, index) => (
                        <div
                            key={index}
                            className="min-w-[280px] bg-white rounded-4xl shadow-sm px-6 py-5 text-[#583927] font-semibold text-lg text-center"
                        >
                            {school}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniversityCarousel;