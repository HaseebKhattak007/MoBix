const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, phone, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "mobix_secret", { expiresIn: "1d" });
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, phone: user.phone }, token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "mobix_secret", { expiresIn: "1d" });
        res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
