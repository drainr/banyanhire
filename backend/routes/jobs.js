const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { protect } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
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

module.exports = router;







