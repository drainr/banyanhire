import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { createJob, updateJob, fetchJobById } from "../utils/api.js";
import Sidebar from "../components/Sidebar.jsx";

const CreateEditJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, token } = useAuth();
    const isEditing = Boolean(id);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        institution: "",
        category: "",
        location: "",
        employmentType: "",
        salaryMin: "",
        salaryMax: "",
        description: "",
        qualifications: "",
        deadline: "",
        startDate: "",
    });

    // If editing, pre-fill the form
    useEffect(() => {
        if (isEditing) {
            fetchJobById(id)
                .then(job => {
                    setForm({
                        title: job.title || "",
                        institution: job.institution || "",
                        category: job.category || "",
                        location: job.location || "",
                        employmentType: job.employmentType || "",
                        salaryMin: job.salaryMin || "",
                        salaryMax: job.salaryMax || "",
                        description: job.description || "",
                        qualifications: job.qualifications || "",
                        deadline: job.deadline ? job.deadline.split("T")[0] : "",
                        startDate: job.startDate ? job.startDate.split("T")[0] : "",
                    });
                })
                .catch(err => setError("Failed to load job details"));
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!form.title || !form.institution || !form.location || !form.description) {
            setError("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        const jobData = {
            ...form,
            salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
            salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        };

        try {
            if (isEditing) {
                await updateJob(id, jobData, token);
            } else {
                await createJob(jobData, token);
            }
            navigate("/recruiter");
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20";

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />

            <main className="ml-62.5 pb-20">
                <div className="p-8">
                    <div className="mb-8">
                        <p className="text-[#BB616D] font-semibold uppercase tracking-wide mb-2">
                            Recruiter Tools
                        </p>
                        <h1 className="text-4xl font-bold text-[#583927] mb-3">
                            {isEditing ? "Edit Job Posting" : "Create Job Posting"}
                        </h1>
                        <p className="text-[#583927]/80">
                            {isEditing
                                ? "Update the details of your job posting."
                                : "Add a new opportunity for students and professionals to discover on Campus Careers."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-2xl bg-[#BB616D]/10 border border-[#BB616D]/20 px-4 py-3 text-[#BB616D] font-medium">
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-md p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Provost"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Institution / Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={form.institution}
                                        onChange={handleChange}
                                        placeholder="e.g. New College of Florida"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Sarasota, FL"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Employment Type
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={form.employmentType}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select employment type</option>
                                        <option value="full-time">Full-Time</option>
                                        <option value="part-time">Part-Time</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Category / Department
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Computer Science"
                                        className={inputClass}
                                    />
                                </div>

                                <div></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Salary Minimum
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        value={form.salaryMin}
                                        onChange={handleChange}
                                        placeholder="e.g. 45000"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Salary Maximum
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        value={form.salaryMax}
                                        onChange={handleChange}
                                        placeholder="e.g. 60000"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Job Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="Describe the role, responsibilities, and what candidates can expect."
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Qualifications
                                </label>
                                <textarea
                                    name="qualifications"
                                    value={form.qualifications}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="List required skills, education, or preferred experience."
                                    className={inputClass}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Application Deadline
                                    </label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={form.deadline}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {isLoading && <p className="text-[#91D8D4] font-medium">Saving...</p>}

                            <div className="flex flex-wrap gap-5 pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-8 py-3 rounded-full bg-[#583927] text-[#FAF3E8] font-semibold hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {isEditing ? "Update Job" : "Publish Job"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/recruiter")}
                                    className="px-8 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateEditJob;