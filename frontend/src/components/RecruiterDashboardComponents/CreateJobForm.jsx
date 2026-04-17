import React, { useState } from "react";
import PinkButton from "../components/buttons/PinkButton.jsx";

const CreateJobForm = ({ recruiterId }) => {

    const [formData, setFormData] = useState({
        title: "",
        institution: "",
        category: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        hourlyRate: "",
        employmentType: "full-time",
        imageUrl: "",
        description: "",
        qualifications: "",
        deadline: "",
        startDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            ...formData,
            recruiterId
        };

        try {
            const response = await fetch("http://localhost:3000/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jobData)
            });

            if (!response.ok) throw new Error("Failed to create job");

            alert("Job created successfully");

            setFormData({
                title: "",
                institution: "",
                category: "",
                location: "",
                salaryMin: "",
                salaryMax: "",
                hourlyRate: "",
                employmentType: "full-time",
                imageUrl: "",
                description: "",
                qualifications: "",
                deadline: "",
                startDate: ""
            });

        } catch (error) {
            console.error(error);
            alert("Error creating job");
        }
    };

    return (
        <div className="ml-[250px] p-10 max-w-[900px]">

            <h2 className="text-3xl font-bold mb-6 text-[#583927]">
                Create Job Posting
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow">

                <input
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    name="institution"
                    placeholder="Institution / Company"
                    value={formData.institution}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    name="category"
                    placeholder="Department / Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <div className="flex gap-4">
                    <input
                        name="salaryMin"
                        type="number"
                        placeholder="Min Salary"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        name="salaryMax"
                        type="number"
                        placeholder="Max Salary"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <input
                    name="hourlyRate"
                    type="number"
                    placeholder="Hourly Rate (optional)"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                </select>

                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    required
                />

                <textarea
                    name="qualifications"
                    placeholder="Required Qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows="3"
                />

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label className="text-sm text-gray-500">Application Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-sm text-gray-500">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <PinkButton text="Create Job" type="submit" />
                </div>

            </form>
        </div>
    );
};

export default CreateJobForm;