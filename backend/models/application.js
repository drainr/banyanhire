// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId:       { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeURL:   { type: String, required: true },
  coverLetter: { type: String },
  status:      { type: String, enum: ["pending", "reviewed", "rejected"], default: "pending" },
  appliedAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);