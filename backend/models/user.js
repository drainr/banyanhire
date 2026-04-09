const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true }, 
  role:         { type: String, enum: ["admin", "recruiter", "seeker"], required: true },
  isDisabled:   { type: Boolean, default: false },

  // recruiter-specific
  companyName:  { type: String },
  companyBio:   { type: String },
  // for admin acceptance of recruiter acc creation
  isApproved:   { type: Boolean, default: false }, 

  // seeker-specific
  resumeURL:    { type: String },
  bio:          { type: String },

  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);