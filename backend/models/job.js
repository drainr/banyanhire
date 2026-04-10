// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  institution:    { type: String, required: true },
  category:       { type: String },
  location:       { type: String, required: true },
  salaryMin:      { type: Number },
  salaryMax:      { type: Number },
  hourlyRate:     { type: Number },
  employmentType: { type: String, enum: ["full-time", "part-time", "internship"] },
  description:    { type: String, required: true },
  qualifications: { type: String },
  deadline:       { type: Date },
  startDate:      { type: Date },
  recruiterId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive:       { type: Boolean, default: true },
  createdAt:      { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);