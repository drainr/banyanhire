const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
const { sendEmail, jobListingDisabledEmail } = require("../config/email");

router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
		res.status(200).json({ jobs });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/my", protect, async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.user._id, isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/recruiter/:recruiterId", protect, async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.params.recruiterId })
            .sort({ createdAt: -1 });
        res.status(200).json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);

		if (!job || !job.isActive) {
			return res.status(404).json({ message: "Job not found" });
		}

		res.status(200).json({ job });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/", protect, async (req, res) => {
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
		startDate,
		isActive
	} = req.body;

	if (!title || !institution || !location || !description) {
		return res.status(400).json({
			message: "Please fill in all required fields"
		});
	}

	try {
		if (!req.user || req.user.role !== "recruiter") {
			return res.status(403).json({
				message: "Only recruiters can create job listings"
			});
		}

		if (!req.user.isApproved) {
			return res.status(403).json({
				message: "Recruiter account is pending approval"
			});
		}

		const job = new Job({
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
			startDate,
			recruiterId: req.user._id,
			isActive: typeof isActive === "boolean" ? isActive : true
		});

		await job.save();

		res.status(201).json({
			message: "Job listing created successfully",
			job
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

router.put("/:id", protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.recruiterId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to edit this job" });
        }

        const {
            title, institution, category, location, salaryMin, salaryMax,
            hourlyRate, employmentType, imageUrl, description, qualifications,
            deadline, startDate, isActive
        } = req.body;

        if (title) job.title = title;
        if (institution) job.institution = institution;
        if (category !== undefined) job.category = category;
        if (location) job.location = location;
        if (salaryMin !== undefined) job.salaryMin = salaryMin;
        if (salaryMax !== undefined) job.salaryMax = salaryMax;
        if (hourlyRate !== undefined) job.hourlyRate = hourlyRate;
        if (employmentType) job.employmentType = employmentType;
        if (imageUrl !== undefined) job.imageUrl = imageUrl;
        if (description) job.description = description;
        if (qualifications !== undefined) job.qualifications = qualifications;
        if (deadline !== undefined) job.deadline = deadline;
        if (startDate !== undefined) job.startDate = startDate;
        if (typeof isActive === "boolean") job.isActive = isActive;

        await job.save();

        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Get recruiter info for email
        const recruiter = await User.findById(job.recruiterId);

        // Allow recruiter who owns it or admin
        if (req.user.role === "admin") {
            // Admin disables job - set isActive to false and send email
            job.isActive = false;
            await job.save();
            
            // Send disabled email to recruiter
            if (recruiter) {
                try {
                    const emailTemplate = jobListingDisabledEmail(recruiter.name, job.title, "Job listing does not meet platform guidelines");
                    await sendEmail({
                        to: recruiter.email,
                        subject: emailTemplate.subject,
                        html: emailTemplate.html,
                        text: emailTemplate.text
                    });
                } catch (err) {
                    console.error("Failed to send job disabled email:", err);
                }
            }
            
            return res.status(200).json({ message: "Job listing disabled and recruiter notified" });
        }
        
        if (job.recruiterId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this job" });
        }

        // Recruiter deletes own job - set isActive to false instead of hard delete
        job.isActive = false;
        await job.save();

        res.status(200).json({ message: "Job listing removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;