const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

module.exports = router;
 