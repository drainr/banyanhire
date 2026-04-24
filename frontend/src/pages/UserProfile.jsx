import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar.jsx";

export default function UserProfile({ embedded = false }) {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        location: "",
        bio: "",
        skills: "",
        education: "",
        experience: "",
    });

    const [formData, setFormData] = useState({ ...profile });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setProfile({ ...formData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...profile });
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const inputClass =
        "w-full rounded-2xl border border-[#E7D8C7] bg-white px-5 py-4 text-[#583927] placeholder:text-[#9C7C68] outline-none transition focus:border-[#91D8D4] focus:ring-2 focus:ring-[#91D8D4]/20";

    const content = (
        <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden w-full">
            <div className="bg-[#91D8D4] px-10 md:px-14 py-12">
                <p className="uppercase tracking-[0.2em] text-sm font-semibold text-[#583927] mb-2">Profile</p>
                <h1 className="text-4xl md:text-5xl font-bold text-[#583927]">My Profile</h1>
                <p className="mt-4 text-[#583927]/80 leading-relaxed">
                    Showcase your education, experience, and skills so recruiters can better understand your background.
                </p>
                <div className="flex flex-col items-center mb-10">
                    <div
                        className="w-32 h-32 rounded-full border-4 border-[#91D8D4] overflow-hidden cursor-pointer bg-white flex items-center justify-center hover:border-[#B5CD88] transition-colors shadow-md"
                        onClick={() => document.getElementById("avatar-upload").click()}
                    >
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl text-[#BB616D] font-bold">+</span>
                        )}
                    </div>
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <span className="text-sm text-[#583927] mt-3 font-medium">Click to upload photo</span>
                </div>
            </div>

            <div className="px-10 md:px-14 py-12">
                {!isEditing ? (
                    <div className="text-left">
                        {[
                            { label: "Name", value: profile.name },
                            { label: "Email", value: profile.email },
                            { label: "Phone", value: profile.phone },
                            { label: "Location", value: profile.location },
                            { label: "About Me", value: profile.bio },
                            { label: "Education", value: profile.education },
                            { label: "Experience", value: profile.experience },
                        ].map((field, i) => (
                            <div key={i} className="mb-6 pb-5 border-b border-[#E7D8C7]">
                                <div className="text-xs font-bold uppercase tracking-widest text-[#91D8D4] mb-2">{field.label}</div>
                                <div className="text-base text-[#583927] font-medium">{field.value || "Not provided"}</div>
                            </div>
                        ))}

                        <div className="mb-6 pb-5 border-b border-[#E7D8C7]">
                            <div className="text-xs font-bold uppercase tracking-widest text-[#91D8D4] mb-3">Skills</div>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills ? (
                                    profile.skills.split(",").map((skill, i) => (
                                        <span key={i} className="bg-[#B5CD88] text-[#FAF3E8] text-sm font-semibold px-4 py-2 rounded-full">
                                            {skill.trim()}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[#583927]">No skills added</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button onClick={() => setIsEditing(true)} className="px-8 py-3 rounded-full bg-[#91D8D4] text-[#583927] font-semibold hover:opacity-90 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: "Name", name: "name", type: "text" },
                                { label: "Email", name: "email", type: "email" },
                                { label: "Phone", name: "phone", type: "text" },
                                { label: "Location", name: "location", type: "text" },
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block mb-3 text-sm font-semibold text-[#583927]">{field.label}</label>
                                    <input name={field.name} type={field.type} value={formData[field.name]} onChange={handleChange} className={inputClass} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">About Me</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className={inputClass} />
                        </div>
                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">Skills</label>
                            <input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, JavaScript, Python" className={inputClass} />
                        </div>
                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">Education</label>
                            <input name="education" value={formData.education} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                            <label className="block mb-3 text-sm font-semibold text-[#583927]">Experience</label>
                            <textarea name="experience" value={formData.experience} onChange={handleChange} rows={4} className={inputClass} />
                        </div>
                        <div className="flex flex-wrap justify-center gap-5 pt-4">
                            <button type="submit" className="px-8 py-3 rounded-full bg-[#91D8D4] text-[#583927] font-semibold hover:opacity-90 transition">Save Profile</button>
                            <button type="button" onClick={handleCancel} className="px-8 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );

    if (embedded) return content;

    return (
        <div className="min-h-screen w-full bg-[#FAF3E8]">
            <Sidebar />
            <main className="ml-62.5 p-8">
                {content}
            </main>
        </div>
    );
}