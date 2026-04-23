import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PROFILE_KEY = "campus_careers_profiles";

function getProfile(uid) {
    try {
        const all = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
        return all[uid] || {};
    } catch {
        return {};
    }
}

function saveProfile(uid, data) {
    const all = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    all[uid] = { ...all[uid], ...data };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(all));
}

function CompanyProfile() {
    const { user } = useContext(AuthContext);
    const userId = user?.uid || user?._id;
    const existing = userId ? getProfile(userId) : {};

    const [form, setForm] = useState({
        company: existing.company || "",
        bio: existing.bio || "",
        website: existing.website || "",
        logoUrl: existing.logoUrl || "",
        location: existing.location || "",
        industry: existing.industry || "",
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId) {
            saveProfile(userId, form);
            setSaved(true);
        }
    };

    const inputClass =
        "w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#BB616D] focus:ring-2 focus:ring-[#BB616D]/20";

    return (
            <div className="px-4">

                <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden">
                    <div className="bg-[#B5CD88] px-10 md:px-14 py-12">
                        <p className="uppercase tracking-[0.2em] text-sm font-semibold text-[#583927] mb-2">
                            Employer Profile
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#583927]">
                            Company Profile
                        </h1>
                        <p className="mt-4 text-[#583927]/80">
                            Create a profile that helps students and candidates learn more
                            about your institution, team, and opportunities.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-10 md:px-14 py-12 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block m-5 mt-10 text-sm font-semibold text-[#583927]">
                                    Company / Institution Name
                                </label>
                                <input
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="e.g. New College of Florida"
                                />
                            </div>

                            <div>
                                <label className="block m-5 mt-10 text-sm font-semibold text-[#583927]">
                                    Industry / Category
                                </label>
                                <input
                                    name="industry"
                                    value={form.industry}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="e.g. Higher Education"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                About / Bio
                            </label>
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows={5}
                                className={inputClass}
                                placeholder="Tell candidates about your institution, mission, culture, and opportunities."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Website
                                </label>
                                <input
                                    name="website"
                                    value={form.website}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="https://www.example.edu"
                                />
                            </div>

                            <div>
                                <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="e.g. Sarasota, FL"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">
                                Logo URL
                            </label>
                            <input
                                name="logoUrl"
                                value={form.logoUrl}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="https://..."
                            />
                        </div>

                        {form.logoUrl && (
                            <div className="bg-[#FAF3E8] border border-[#E7D8C7] rounded-2xl p-8 mt-2">
                                <p className="text-sm font-semibold text-[#583927] mb-4">
                                    Logo Preview
                                </p>
                                <img
                                    src={form.logoUrl}
                                    alt="Company logo preview"
                                    className="h-24 w-24 object-cover rounded-xl border border-[#E7D8C7] bg-white p-2"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            </div>
                        )}

                        {saved && (
                            <div className="rounded-2xl bg-[#BB616D]/10 border border-[#BB616D]/20 px-4 py-3 text-[#BB616D] font-medium">
                                Profile saved successfully.
                            </div>
                        )}

                        <div className="flex flex-wrap gap-5 pt-2 p-10">
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-full bg-[#583927] text-[#FAF3E8] font-semibold hover:opacity-90 transition"
                            >
                                Save Profile
                            </button>

                            <Link
                                to="/recruiter"
                                className="px-8 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default CompanyProfile;