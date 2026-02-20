const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    counsellor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ['Video', 'Phone', 'Chat'], default: 'Video' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    notes: { type: String, default: '' },           // counsellor notes
    feedback: { type: String, default: '' },         // counsellor feedback
    aiReport: { type: Object, default: null },       // AI-generated career report snapshot
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
