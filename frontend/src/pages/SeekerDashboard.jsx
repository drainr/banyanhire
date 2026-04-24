import React from 'react';
import { IoLocationOutline, IoBriefcaseOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";
import { fetchSavedJobs } from "../utils/api.js";

const ScrollableRow = ({ title, icon, children }) => (
    <div className="mb-8">
        {/* Fixed header alignment */}
        <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
                {icon}
            </div>

            <h2 className="league-gothic-font text-[#583927] text-2xl leading-none pt-1">
                {title}
            </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {children}
        </div>
    </div>
);

const SeekerDashboard = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [savedJobs, setSavedJobs] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(true);

    // TODO: replace with real API call when application routes exist
    const savedJobs = [
        {
            _id: "1",
            title: "Assistant Professor of CS",
            company: "USF",
            location: "Tampa, FL",
            salaryMin: 75000,
            salaryMax: 95000
        },
        {
            _id: "2",
            title: "Data Analyst",
            company: "Raymond James",
            location: "St. Petersburg, FL",
            salaryMin: 60000,
            salaryMax: 80000
        },
        {
            _id: "3",
            title: "Research Scientist",
            company: "Moffitt Cancer Center",
            location: "Tampa, FL",
            salaryMin: 70000,
            salaryMax: 90000
        },
        {
            _id: "4",
            title: "Software Engineer",
            company: "Tech Data",
            location: "Clearwater, FL",
            salaryMin: 85000,
            salaryMax: 110000
        },
        {
            _id: "5",
            title: "UX Designer",
            company: "Nielsen",
            location: "Oldsmar, FL",
            salaryMin: 65000,
            salaryMax: 85000
        },
    ];

    const appliedJobs = [
        { _id: "6", title: "Frontend Developer", company: "Publix", location: "Lakeland, FL", dateApplied: "2026-04-10", status: "Under Review" },
        { _id: "7", title: "IT Support Specialist", company: "BayCare", location: "Clearwater, FL", dateApplied: "2026-04-05", status: "Submitted" },
        {
            _id: "6",
            title: "Frontend Developer",
            company: "Publix",
            location: "Lakeland, FL",
            salaryMin: 70000,
            salaryMax: 90000,
            dateApplied: "2026-04-10",
            status: "Under Review"
        },
        {
            _id: "7",
            title: "IT Support Specialist",
            company: "BayCare",
            location: "Clearwater, FL",
            salaryMin: 45000,
            salaryMax: 60000,
            dateApplied: "2026-04-05",
            status: "Submitted"
        },
        {
            _id: "8",
            title: "Database Administrator",
            company: "USAA",
            location: "Tampa, FL",
            salaryMin: 80000,
            salaryMax: 100000,
            dateApplied: "2026-03-28",
            status: "Viewed"
        },
    ];

    useEffect(() => {
        if (token) {
            fetchSavedJobs(token)
                .then(jobs => setSavedJobs(jobs))
                .catch(() => setSavedJobs([]))
                .finally(() => setLoadingSaved(false));
        }
    }, [token]);

    const formatSalary = (min, max) => {
        if (!min && !max) return "Not listed";
        const fmt = (n) => "$" + (n / 1000).toFixed(0) + "k";
        if (min && max) return `${fmt(min)} – ${fmt(max)}`;
        return min ? `From ${fmt(min)}` : `Up to ${fmt(max)}`;
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-[250px] p-8">
                <h1 className="league-gothic-font text-[#583927] text-4xl mb-8">
                    WELCOME, {user?.name?.toUpperCase() || "SEEKER"}
                </h1>

                {/* Saved Jobs Row */}
                <ScrollableRow
                    title="SAVED JOBS"
                    icon={<CiBookmark size={24} className="text-[#B5CD88]" />}
                >
                    {loadingSaved ? (
                        <p className="text-[#583927] text-sm">Loading saved jobs...</p>
                    ) : savedJobs.length > 0 ? savedJobs.map((job) => (
                        <div
                            key={job._id}
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            className="min-w-[280px] max-w-[280px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0"
                        >
                            <h3 className="font-bold text-[#583927] text-sm mb-1 truncate">{job.title}</h3>
                            <p className="text-[#91D8D4] text-xs font-semibold mb-3">{job.institution || job.company}</p>
                            <div className="flex items-center gap-1 text-xs text-[#583927] mb-1">
                                <IoLocationOutline size={14} className="text-[#91D8D4]" />
                                {job.location}
                            </div>
                            <div className="text-xs text-[#B5CD88] font-semibold">
                                {formatSalary(job.salaryMin, job.salaryMax)}
                            </div>
                        </div>
                    )) : (
                        <p className="text-[#583927] text-sm">No saved jobs yet. Browse jobs and bookmark ones you like.</p>
                    {savedJobs.length > 0 ? (
                        savedJobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className="min-w-[280px] mt-5 max-w-[280px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0"
                            >
                                <h3 className="font-bold text-[#583927] text-sm mb-1 truncate">
                                    {job.title}
                                </h3>

                                <p className="text-[#91D8D4] text-xs font-semibold mb-3">
                                    {job.company}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-[#583927] mb-1">
                                    <IoLocationOutline
                                        size={14}
                                        className="text-[#91D8D4]"
                                    />
                                    {job.location}
                                </div>

                                <div className="text-xs text-[#B5CD88] font-semibold">
                                    {formatSalary(job.salaryMin, job.salaryMax)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#583927] text-sm">
                            No saved jobs yet. Browse jobs and bookmark ones you like.
                        </p>
                    )}
                </ScrollableRow>

                {/* Applications Row */}
                <ScrollableRow
                    title="MY APPLICATIONS"
                    icon={
                        <IoBriefcaseOutline
                            size={24}
                            className="text-[#91D8D4]"
                        />
                    }
                >
                    {appliedJobs.length > 0 ? (
                        appliedJobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className="min-w-[280px] mt-5 max-w-[280px] bg-white rounded-xl p-5 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all flex-shrink-0"
                            >
                                <h3 className="font-bold text-[#583927] text-sm mb-1 truncate">
                                    {job.title}
                                </h3>

                                <p className="text-[#91D8D4] text-xs font-semibold mb-2">
                                    {job.company}
                                </p>

                                <div className="flex items-center gap-1 text-xs text-[#583927] mb-1">
                                    <IoLocationOutline
                                        size={14}
                                        className="text-[#91D8D4]"
                                    />
                                    {job.location}
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-xs text-[#583927]">
                                        Applied:{" "}
                                        {new Date(
                                            job.dateApplied
                                        ).toLocaleDateString()}
                                    </span>

                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            job.status === "Viewed"
                                                ? "bg-[#F6E58D] text-[#583927]"
                                                : job.status === "Under Review"
                                                    ? "bg-[#91D8D4] text-white"
                                                    : "bg-[#B5CD88] text-white"
                                        }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#583927] text-sm">
                            No applications yet. Start applying to jobs.
                        </p>
                    )}
                </ScrollableRow>
            </main>
        </div>
    );
};

export default SeekerDashboard;