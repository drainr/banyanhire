import React, { useState } from "react";
import GreenButton from "../components/buttons/GreenButton.jsx";
import AquaButton from "../components/buttons/AquaButton.jsx";
import { useAuth } from "../hooks/useAuth";

export default function UserProfile() {
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
    // await api("/users/profile", { method: "PUT", body: formData, token: user.token });
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

  return (
    <div className="bg-[#583927] min-h-screen py-10 px-4 flex justify-center items-start">
      <div className="bg-[#FAF3E8] rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
        <h1 className="league-gothic-font text-[#583927] text-5xl text-center mb-4">MY PROFILE</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-28 h-28 rounded-full border-4 border-[#91D8D4] overflow-hidden cursor-pointer bg-white flex items-center justify-center hover:border-[#B5CD88] transition-colors"
            onClick={() => document.getElementById("avatar-upload").click()}
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-[#BB616D] font-bold">+</span>
            )}
          </div>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          <span className="text-xs text-[#BB616D] mt-2">Click to upload photo</span>
        </div>

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
              <div key={i} className="mb-5 pb-4 border-b border-[#e0d5c7]">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1">
                  {field.label}
                </div>
                <div className="text-base text-[#583927] font-medium">
                  {field.value || "Not provided"}
                </div>
              </div>
            ))}

            {/* Skills as tags */}
            <div className="mb-5 pb-4 border-b border-[#e0d5c7]">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {profile.skills ? (
                  profile.skills.split(",").map((skill, i) => (
                    <span key={i} className="bg-[#B5CD88] text-[#FAF3E8] text-sm font-semibold px-4 py-1 rounded-full">
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-[#583927]">No skills added</span>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <GreenButton text="Edit Profile" onClick={() => setIsEditing(true)} />
            </div>
          </div>
        ) : (
          /* EDIT */
          <form onSubmit={handleSave} className="text-left bg-[#FAF3E8]">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text", placeholder: "555-123-4567" },
              { label: "Location", name: "location", type: "text", placeholder: "City, State" },
            ].map((field, i) => (
              <div key={i} className="mb-4">
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1 block">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  className="input input-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1 block">About Me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Tell recruiters about yourself..."
                className="textarea textarea-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1 block">Skills (comma-separated)</label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Python"
                className="input input-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1 block">Education</label>
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Degree, School"
                className="input input-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1 block">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                placeholder="Job title at Company (dates)"
                className="textarea textarea-bordered w-full bg-white text-[#583927] border-[#e0d5c7] focus:border-[#91D8D4] focus:outline-none"
              />
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <GreenButton text="Save" onClick={handleSave} />
              <AquaButton text="Cancel" onClick={handleCancel} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}