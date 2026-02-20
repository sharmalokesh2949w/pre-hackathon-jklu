const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const OtpVerification = require('../models/OtpVerification');
const { protect } = require('../middleware/auth');
const router = express.Router();

// ─── JWT ──────────────────────────────────────────────────────────────────────
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// ─── Email Transporter ────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// ─── Send OTP ─────────────────────────────────────────────────────────────────
// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Hash password for storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Remove existing OTP for this email (if any)
    await OtpVerification.deleteMany({ email });

    // Save OTP
    await OtpVerification.create({
      email,
      otp,
      userData: { name, email, password: hashedPassword, role },
      expiresAt,
    });

    // Send email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"CareerCube AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your CareerCube OTP - Verify Your Account',
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
            <div style="text-align:center; margin-bottom:24px;">
              <div style="background: linear-gradient(135deg,#6366f1,#14b8a6); display:inline-block; padding:14px 20px; border-radius:12px;">
                <span style="color:white; font-size:22px; font-weight:900;">CareerCube AI</span>
              </div>
            </div>
            <h2 style="color:#1e293b; text-align:center; margin-bottom:8px;">Verify Your Email</h2>
            <p style="color:#64748b; text-align:center; margin-bottom:32px;">Use the code below to complete your signup. It expires in <strong>5 minutes</strong>.</p>
            <div style="background:white; border-radius:12px; padding:24px; text-align:center; border:2px solid #e2e8f0; margin-bottom:24px;">
              <span style="font-size:42px; font-weight:900; color:#6366f1; letter-spacing:10px;">${otp}</span>
            </div>
            <p style="color:#94a3b8; text-align:center; font-size:13px;">If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
      res.json({ message: 'OTP sent to your email', emailSent: true });
    } catch (emailErr) {
      console.error('Email send error:', emailErr.message);
      // Still return OTP in dev mode so app works without email config
      res.json({ message: 'OTP generated (email service not configured)', otp, emailSent: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Verify OTP & Create Account ──────────────────────────────────────────────
// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: 'Email and OTP are required' });

  try {
    const record = await OtpVerification.findOne({ email });

    if (!record) return res.status(400).json({ message: 'OTP expired or not found. Please request a new OTP.' });
    if (record.otp !== otp.toString()) return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    if (new Date() > record.expiresAt) {
      await OtpVerification.deleteMany({ email });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Create user with pre-hashed password (bypass pre-save hook by using insertOne)
    const { name, password, role } = record.userData;
    const user = new User({ name, email, password: 'placeholder', role });
    user.password = password; // set raw (already hashed)
    // Hack: mark password as not modified so hook skips
    user.$__.activePaths.states.modify = {};
    await User.collection.insertOne({
      name, email, password, role,
      onboardingComplete: false, profile: null, createdAt: new Date()
    });

    const createdUser = await User.findOne({ email });
    await OtpVerification.deleteMany({ email });

    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      onboardingComplete: false,
      token: generateToken(createdUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      onboardingComplete: user.onboardingComplete,
      profile: user.profile,
      specialization: user.specialization,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Update Profile ───────────────────────────────────────────────────────────
// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profile = req.body.profile || user.profile;
    user.onboardingComplete = true;
    // Prevent password re-hash
    user.$__.activePaths.states.modify = user.$__.activePaths.states.modify || {};
    delete user.$__.activePaths.states.modify['password'];

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      onboardingComplete: updated.onboardingComplete,
      profile: updated.profile,
      token: generateToken(updated._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Get All Counsellors ──────────────────────────────────────────────────────
// GET /api/auth/counsellors
router.get('/counsellors', protect, async (req, res) => {
  try {
    const counsellors = await User.find({ role: 'counsellor' }).select('-password');
    res.json(counsellors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Signup (direct, no OTP, for compatibility) ─────────────────────────────
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role: role || 'student' });
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email,
      role: user.role, onboardingComplete: false,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
