const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const Application = require("../models/application");
const { protect } = require("../middleware/authMiddleware");

// POST - Create a new job posting
router.post("/create-job", protect, async (req, res) => {
    try {
        const {
            title,
            institution,
            category,
            location,
            salaryMin,
            salaryMax,
            hourlyRate,
            employmentType,
            imageUrl,
            description,
            qualifications,
            deadline,
            startDate
        } = req.body;

        // Validate required fields
        if (!title || !institution || !location || !description) {
            return res.status(400).json({ 
                message: "Title, institution, location, and description are required" 
            });
        }

        // Create new job
        const job = new Job({
            title,
            institution,
            category,
            location,
            salaryMin: salaryMin || null,
            salaryMax: salaryMax || null,
            hourlyRate: hourlyRate || null,
            employmentType,
            imageUrl,
            description,
            qualifications,
            deadline: deadline || null,
            startDate: startDate || null,
            recruiterId: req.user._id,
            isActive: true
        });

        await job.save();

        res.status(201).json({
            message: "Job posting created successfully",
            job: {
                id: job._id,
                title: job.title,
                institution: job.institution,
                category: job.category,
                location: job.location,
                description: job.description,
                recruiterId: job.recruiterId,
                isActive: job.isActive,
                createdAt: job.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST - Submit a job application
router.post("/apply", protect, async (req, res) => {
    try {
        const { jobId, resumeURL, coverLetter } = req.body;

        if (!jobId || !resumeURL) {
            return res.status(400).json({ 
                message: "Job ID and resume URL are required" 
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if user already applied to this job
        const existingApplication = await Application.findOne({
            jobId: jobId,
            applicantId: req.user._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied to this job" });
        }

        // Create new application
        const application = new Application({
            jobId,
            applicantId: req.user._id,
            resumeURL,
            coverLetter: coverLetter || "",
            status: "pending"
        });

        await application.save();

        res.status(201).json({
            message: "Application submitted successfully",
            application: {
                id: application._id,
                jobId: application.jobId,
                applicantId: application.applicantId,
                status: application.status,
                appliedAt: application.appliedAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// TODO: Add more application routes (get, update status, etc.)

module.exports = router;
