const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true }, 
  role:         { type: String, enum: ["admin", "recruiter", "seeker"], required: true },
  profilePic:   { type: String },
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

// password hashing before it is saved to db
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// set isApproved based on role
userSchema.pre("save", function(next) {
  if (this.role !== "recruiter") {
    this.isApproved = true; // non recruiters automatically approved
  }
});

// method to compare entered password with hashed password in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);