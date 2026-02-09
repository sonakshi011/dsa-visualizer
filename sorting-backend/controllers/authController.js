import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/* =======================
   REGISTER CONTROLLER
======================= */
export const register = async (req, res) => {
  console.log("🔥 REGISTER HIT:", req.body);

  const { username, email, password } = req.body;

  // ✅ 1. Validate input (VERY IMPORTANT)
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // ✅ 2. Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ 3. Hash password
    const hash = await bcrypt.hash(password, 10);

    // ✅ 4. Create user
    const user = await User.create({
      username,
      email,
      password: hash
    });

    // ✅ 5. Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // ✅ 6. Send correct response
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    return res.status(500).json({ error: "Server error during registration" });
  }
};

/* =======================
   LOGIN CONTROLLER
======================= */
export const login = async (req, res) => {
  console.log("🔥 LOGIN HIT:", req.body);

  const { email, password } = req.body;

  // ✅ 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // ✅ 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // ✅ 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ 4. Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // ✅ 5. Send response
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ error: "Server error during login" });
  }
};
