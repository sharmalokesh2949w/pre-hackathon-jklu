const express = require('express');
const Session = require('../models/Session');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// ─── Book Session (Student) ───────────────────────────────────────────────────
// POST /api/session/book
router.post('/book', protect, async (req, res) => {
    const { counsellorId, date, time, mode } = req.body;
    try {
        if (req.user.role !== 'student')
            return res.status(403).json({ message: 'Only students can book sessions' });

        const counsellor = await User.findById(counsellorId);
        if (!counsellor || counsellor.role !== 'counsellor')
            return res.status(404).json({ message: 'Counsellor not found' });

        const session = await Session.create({
            student: req.user._id,
            counsellor: counsellorId,
            date,
            time,
            mode: mode || 'Video',
        });
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── Get Sessions ─────────────────────────────────────────────────────────────
// GET /api/session/list
router.get('/list', protect, async (req, res) => {
    try {
        let sessions;
        if (req.user.role === 'student') {
            sessions = await Session.find({ student: req.user._id })
                .populate('counsellor', 'name email specialization')
                .sort({ createdAt: -1 });
        } else {
            sessions = await Session.find({ counsellor: req.user._id })
                .populate('student', 'name email profile')
                .sort({ createdAt: -1 });
        }
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── Add Feedback/Notes (Counsellor) ─────────────────────────────────────────
// POST /api/session/feedback
router.post('/feedback', protect, async (req, res) => {
    const { sessionId, notes, feedback, status } = req.body;
    try {
        if (req.user.role !== 'counsellor')
            return res.status(403).json({ message: 'Only counsellors can add feedback' });

        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.counsellor.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not your session' });

        if (notes !== undefined) session.notes = notes;
        if (feedback !== undefined) session.feedback = feedback;
        if (status !== undefined) session.status = status;
        await session.save();

        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── Update Session Status ────────────────────────────────────────────────────
// PUT /api/session/:id/status
router.put('/:id/status', protect, async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        session.status = req.body.status;
        await session.save();
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─── Get Assigned Students (Counsellor) ──────────────────────────────────────
// GET /api/session/students
router.get('/students', protect, async (req, res) => {
    try {
        if (req.user.role !== 'counsellor')
            return res.status(403).json({ message: 'Counsellors only' });

        const sessions = await Session.find({ counsellor: req.user._id })
            .populate('student', 'name email profile onboardingComplete createdAt')
            .sort({ createdAt: -1 });

        // Unique students
        const seen = new Set();
        const students = [];
        sessions.forEach(s => {
            if (s.student && !seen.has(s.student._id.toString())) {
                seen.add(s.student._id.toString());
                students.push({ student: s.student, latestSession: s });
            }
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
