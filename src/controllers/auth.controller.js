const Admin = require("../models/model.Admin");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ---------------- REGISTER ADMIN ----------------
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      username,
      passwordHash,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- LOGIN ADMIN ----------------
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
