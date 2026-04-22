const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
const { sendEmail, recruiterApprovedEmail, recruiterRejectedEmail } = require("../config/email");

const generateToken = (id) => {
    return jwt.sign({ id }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" });
};

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Please fill in all required fields" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already in use" });
        }

        user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ message: "Name already in use" });
        }

        user = new User({ name, email, password, role }); 
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ 
        message: "User registration successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
      }, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        if (user.isDisabled) {
            return res.status(403).json({ message: "Account is disabled" });
        }

        let match = await user.matchPassword(password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.status(200).json({ 
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
      }, 
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
});

router.put("/update-company", protect, async (req, res) => {
    try {
        const { companyName, companyBio } = req.body;
        
        if (!companyName || !companyBio) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const user = await User.findById(req.user._id);
        
        if (user.role !== "recruiter") {
            return res.status(403).json({ message: "Only recruiters can update company info" });
        }

        user.companyName = companyName;
        user.companyBio = companyBio;
        user.isApproved = false; // Reset approval status when updating

        await user.save();

        res.status(200).json({ 
            message: "Company information updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyName: user.companyName,
                companyBio: user.companyBio,
                isApproved: user.isApproved
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT - Approve a recruiter (admin only)
router.put("/approve-recruiter/:userId", protect, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can approve recruiters" });
        }

        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "recruiter") {
            return res.status(400).json({ message: "User is not a recruiter" });
        }

        user.isApproved = true;
        await user.save();

        // Send approval email
        const emailTemplate = recruiterApprovedEmail(user.name);
        await sendEmail({
            to: user.email,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
            text: emailTemplate.text,
        });

        res.status(200).json({
            message: "Recruiter approved successfully and email sent",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isApproved: user.isApproved
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT - Reject a recruiter (admin only)
router.put("/reject-recruiter/:userId", protect, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can reject recruiters" });
        }

        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "recruiter") {
            return res.status(400).json({ message: "User is not a recruiter" });
        }

        // Disable the account
        user.isDisabled = true;
        await user.save();

        // Send rejection email
        const emailTemplate = recruiterRejectedEmail(user.name);
        await sendEmail({
            to: user.email,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
            text: emailTemplate.text,
        });

        res.status(200).json({
            message: "Recruiter rejected successfully and email sent",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isDisabled: user.isDisabled
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
 