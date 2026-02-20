const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    otp: { type: String, required: true },
    userData: { type: Object, required: true }, // stores name, email, password (hashed), role
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Auto-delete expired documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OtpVerification', otpSchema);
