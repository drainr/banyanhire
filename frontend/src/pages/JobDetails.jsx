import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById, deleteJob, saveJob, unsaveJob, fetchSavedJobs } from "../utils/api.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import GreenButton from "../components/buttons/GreenButton.jsx";
import AquaButton from "../components/buttons/AquaButton.jsx";
import PinkButton from "../components/buttons/PinkButton.jsx";
import { IoLocationOutline, IoCalendarOutline, IoCashOutline, IoBriefcaseOutline, IoSchoolOutline, IoTimeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { useAuth } from "../Hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api";

export default function JobDetails() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const userRole = user?.role;

  useEffect(() => {
    const loadJob = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        setError(err.message || "Unable to load job");
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id]);

  useEffect(() => {
    const loadSaved = async () => {
      if (!token || userRole !== "seeker") return;

      try {
        const saved = await fetchSavedJobs(token);
        setSavedJobIds(saved.map((j) => j._id));
      } catch (err) {
        console.error("Failed to load saved jobs", err);
      }
    };

    loadSaved();
  }, [token, userRole]);

  const bookmarked = savedJobIds.includes(id);

  const handleBookmark = async () => {
    if (!token) return;

    try {
      if (bookmarked) {
        await unsaveJob(id, token);
        setSavedJobIds((prev) => prev.filter((jid) => jid !== id));
      } else {
        await saveJob(id, token);
        setSavedJobIds((prev) => [...prev, id]);
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!resume) {
      setSubmitError("Please upload a resume");
      return;
    }

    setIsSubmitting(true);

    try {
      const resumeUrl = await uploadToCloudinary(resume);

      const response = await fetch(`${API_BASE_URL}/applications/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: id,
          resumeURL: resumeUrl,
          coverLetter
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setShowApplyForm(false);
        setResume(null);
        setCoverLetter("");
      } else {
        setSubmitError(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application error:", error);
      setSubmitError(error.message || "Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      await deleteJob(id, token);
      navigate("/jobs");
    } catch (err) {
      alert(err.message || "Failed to delete job");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Not listed";
    const fmt = (n) =>
      n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      });

    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    if (min) return `From ${fmt(min)}`;
    return `Up to ${fmt(max)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF3E8]">
        <Sidebar />
        <div className="ml-62.5 flex items-center justify-center h-screen">
          <p className="text-[#583927] text-lg">Loading job...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#FAF3E8]">
        <Sidebar />
        <div className="ml-62.5 flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-[#BB616D] text-lg">
            {error || "Job not found"}
          </p>
          <AquaButton text="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E8]">
      <Sidebar />

      <div className="ml-62.5">
        {/* Bookmark bar (seekers only) */}
        {userRole === "seeker" && (
          <div className="bg-[#583927] py-3 px-6 flex items-center justify-end">
            <button
              onClick={handleBookmark}
              className="flex items-center gap-1 text-[#FAF3E8] hover:text-[#B5CD88] transition-colors"
              >
              <CiBookmark
                  size={24}
                  className={bookmarked ? "fill-[#B5CD88] text-[#B5CD88]" : ""}
                />
              <span className="text-sm">{bookmarked ? "Saved" : "Save"}</span>
            </button>
      </div>
    )}

        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="league-gothic-font text-[#583927] text-4xl mb-2">
              {job.title}
            </h1>
            <p className="text-[#583927] text-lg font-semibold">
              {job.institution}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoLocationOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase text-[#91D8D4]">
                  Location
                </div>
                <div className="text-[#583927] font-medium">
                  {job.location}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoCashOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase text-[#91D8D4]">
                  Salary
                </div>
                <div className="text-[#583927] font-medium">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoBriefcaseOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase text-[#91D8D4]">
                  Department
                </div>
                <div className="text-[#583927] font-medium">
                  {job.category}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoCalendarOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase text-[#91D8D4]">
                  Deadline
                </div>
                <div className="text-[#583927] font-medium">
                  {formatDate(job.applicationDeadline)}
                </div>
              </div>
            </div>
          </div>

          {/* (rest of your UI unchanged) */}
        </div>
      </div>
    </div>
  );
}