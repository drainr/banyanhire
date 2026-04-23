const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Job = require("../models/job");
const { protect } = require("../middleware/authMiddleware");

// POST - Save a job
router.post("/:jobId", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.savedJobs.includes(req.params.jobId)) {
            return res.status(400).json({ message: "Job already saved" });
        }
        user.savedJobs.push(req.params.jobId);
        await user.save();
        res.status(200).json({ message: "Job saved", savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE - Unsave a job
router.delete("/:jobId", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== req.params.jobId);
        await user.save();
        res.status(200).json({ message: "Job removed", savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET - Get all saved jobs (populated)
router.get("/", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("savedJobs");
        res.status(200).json({ savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;