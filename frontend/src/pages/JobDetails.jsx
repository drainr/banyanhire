import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById, submitApplication, deleteJob } from "../utils/api.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import GreenButton from "../components/buttons/GreenButton.jsx";
import AquaButton from "../components/buttons/AquaButton.jsx";
import PinkButton from "../components/buttons/PinkButton.jsx";
import { IoLocationOutline, IoCalendarOutline, IoCashOutline, IoBriefcaseOutline, IoSchoolOutline, IoTimeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth.js";
import Sidebar from "../components/Sidebar.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api";

export default function JobDetails() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
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

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!resume) {
      setSubmitError("Please upload a resume");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload resume to Cloudinary
      console.log("Uploading resume to Cloudinary...");
      const resumeUrl = await uploadToCloudinary(resume);
      console.log("Resume uploaded:", resumeUrl);

      // Step 2: Submit application to backend
      const response = await fetch(`${API_BASE_URL}/applications/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: id,
          resumeURL: resumeUrl,
          coverLetter: coverLetter
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
      day: "numeric",
    });
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Not listed";
    const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
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
          <p className="text-[#BB616D] text-lg">{error || "Job not found"}</p>
          <AquaButton text="Go Back" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E8]">
      <Sidebar />

      <div className="ml-62.5">
        {/* Bookmark bar */}
        <div className="bg-[#583927] py-3 px-6 flex items-center justify-end">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="flex items-center gap-1 text-[#FAF3E8] hover:text-[#B5CD88] transition-colors"
          >
            <CiBookmark size={24} className={bookmarked ? "fill-[#B5CD88] text-[#B5CD88]" : ""} />
            <span className="text-sm">{bookmarked ? "Saved" : "Save"}</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="league-gothic-font text-[#583927] text-4xl mb-2">{job.title}</h1>
            <p className="text-[#583927] text-lg font-semibold">{job.institution}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoLocationOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4]">Location</div>
                <div className="text-[#583927] font-medium">{job.location}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoCashOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4]">Salary</div>
                <div className="text-[#583927] font-medium">{formatSalary(job.salaryMin, job.salaryMax)}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoBriefcaseOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4]">Department</div>
                <div className="text-[#583927] font-medium">{job.category}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <IoCalendarOutline size={22} className="text-[#91D8D4]" />
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4]">Deadline</div>
                <div className="text-[#583927] font-medium">{formatDate(job.applicationDeadline)}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="league-gothic-font text-[#583927] text-2xl mb-3">JOB DESCRIPTION</h2>
            <p className="text-[#583927] leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="league-gothic-font text-[#583927] text-2xl mb-3">QUALIFICATIONS</h2>
            <p className="text-[#583927] leading-relaxed">{job.qualifications}</p>
          </div>

          <div className="mb-8 bg-white rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <IoTimeOutline size={20} className="text-[#91D8D4]" />
              <span className="text-sm text-[#583927]">
                <strong>Posted:</strong> {formatDate(job.createdAt || job.postedDate)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <IoSchoolOutline size={20} className="text-[#91D8D4]" />
              <span className="text-sm text-[#583927]">
                <strong>Expected start:</strong> {formatDate(job.expectedStartDate)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            {userRole === "seeker" && (
              <GreenButton text="Apply Now" onClick={() => setShowApplyForm(true)} />
            )}
            {userRole === "recruiter" && (
              <>
                <AquaButton text="Edit" onClick={() => navigate(`/jobs/edit/${id}`)} />
                <PinkButton text="Delete" onClick={handleDelete} />
              </>
            )}
            {userRole === "admin" && (
              <PinkButton text="Delete Job" onClick={handleDelete} />
            )}
          </div>

          {showApplyForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#FAF3E8] rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl">
                <h2 className="league-gothic-font text-[#583927] text-3xl mb-6 text-center">
                  APPLY FOR THIS POSITION
                </h2>

                <form onSubmit={handleApply}>
                  <div className="mb-4">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-2 block">
                      Resume (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="file-input file-input-bordered w-full bg-white text-[#583927] border-[#e0d5c7]"
                      required
                    />
                    {resume && (
                      <p className="text-sm text-[#B5CD88] mt-1">{resume.name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-2 block">
                      Cover Letter (optional)
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={4}
                      placeholder="Tell the employer why you're a great fit..."
                      className="textarea textarea-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
                    />
                  </div>

                  {submitError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-[#B5CD88] hover:bg-[#a0b875] disabled:bg-gray-400 text-white font-bold rounded-lg transition"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="px-6 py-2 bg-[#BB616D] hover:bg-[#a0505c] text-white font-bold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}