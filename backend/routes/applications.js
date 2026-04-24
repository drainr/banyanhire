const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const Application = require("../models/application");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
const { sendEmail, applicationReviewedEmail, applicationRejectedEmail } = require("../config/email");

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

// PUT - Update application status and send email notification
router.put("/update-status/:applicationId", protect, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !["pending", "reviewed", "rejected"].includes(status)) {
            return res.status(400).json({ 
                message: "Invalid status. Must be 'pending', 'reviewed', or 'rejected'" 
            });
        }

        // Find the application
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Get the job details
        const job = await Job.findById(application.jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if user is the recruiter who posted the job or an admin
        if (req.user._id.toString() !== job.recruiterId.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this application" });
        }

        // Get applicant details for email
        const applicant = await User.findById(application.applicantId);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        // Update status
        application.status = status;
        await application.save();

        // Send email based on status
        if (status === "rejected") {
            const emailTemplate = applicationRejectedEmail(applicant.name, job.title);
            await sendEmail({
                to: applicant.email,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            });
        } else if (status === "reviewed") {
            const emailTemplate = applicationReviewedEmail(applicant.name, job.title, "reviewed");
            await sendEmail({
                to: applicant.email,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            });
        }

        res.status(200).json({
            message: "Application status updated and email sent",
            application: {
                id: application._id,
                jobId: application.jobId,
                applicantId: application.applicantId,
                status: application.status,
                updatedAt: new Date()
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT - Bulk update application statuses by job and send emails
router.put("/update-job-applications/:jobId", protect, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !["pending", "reviewed", "rejected"].includes(status)) {
            return res.status(400).json({ 
                message: "Invalid status. Must be 'pending', 'reviewed', or 'rejected'" 
            });
        }

        // Get the job details
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if user is the recruiter who posted the job or an admin
        if (req.user._id.toString() !== job.recruiterId.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update applications for this job" });
        }

        // Get all applications for this job
        const applications = await Application.find({ jobId: req.params.jobId });
        
        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job" });
        }

        let updatedCount = 0;
        let emailsSent = 0;

        // Update each application and send emails
        for (const application of applications) {
            // Skip if status is already the same
            if (application.status === status) continue;

            application.status = status;
            await application.save();
            updatedCount++;

            // Get applicant details for email
            const applicant = await User.findById(application.applicantId);
            if (applicant) {
                try {
                    if (status === "rejected") {
                        const emailTemplate = applicationRejectedEmail(applicant.name, job.title);
                        await sendEmail({
                            to: applicant.email,
                            subject: emailTemplate.subject,
                            html: emailTemplate.html,
                            text: emailTemplate.text,
                        });
                    } else if (status === "reviewed") {
                        const emailTemplate = applicationReviewedEmail(applicant.name, job.title, "reviewed");
                        await sendEmail({
                            to: applicant.email,
                            subject: emailTemplate.subject,
                            html: emailTemplate.html,
                            text: emailTemplate.text,
                        });
                    }
                    emailsSent++;
                } catch (emailError) {
                    console.error(`Failed to send email to ${applicant.email}:`, emailError.message);
                }
            }
        }

        res.status(200).json({
            message: `Updated ${updatedCount} applications and sent ${emailsSent} emails`,
            jobId: req.params.jobId,
            status: status,
            updatedCount: updatedCount,
            emailsSent: emailsSent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// TODO: Add more application routes (get, update status, etc.)
// GET - Get applications for logged-in user
router.get("/my-applications", protect, async (req, res) => {
    try {
        const applications = await Application.find({
            applicantId: req.user._id
        }).populate("jobId");

        res.json({ applications });  // wrap in object
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
