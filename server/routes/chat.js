const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/auth');
const router = express.Router();

const SYSTEM_PROMPT = `You are EduPath AI Mentor — a warm, friendly, and expert career counselor for Indian students (Class 8-12).

PERSONALITY:
- Use Hinglish (mix of Hindi and English) casually but keep it professional
- Be encouraging, never discouraging — even for low performers
- Use emojis sparingly for warmth
- Keep responses concise (3-5 sentences max)
- Always suggest multiple pathways, never just one

KNOWLEDGE:
- Indian education system (CBSE, ICSE, State Boards)
- Competitive exams (JEE, NEET, CLAT, NDA, UPSC, CAT)
- Emerging careers in India (AI, Climate Tech, Space Tech, Health-Tech, Agri-Tech)
- NEP 2020 alignment
- Government scholarships and schemes
- Free learning resources (NPTEL, Skill India, YouTube channels)

RULES:
- Never replace professional counselors
- Provide India-specific advice with actual college names and exam details
- If marks are low but interest is high, suggest structured improvement roadmaps
- Always end with an actionable next step or question`;

router.post('/', protect, async (req, res) => {
    try {
        const { message, conversationHistory = [], userProfile = {} } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not set in .env');
            return res.status(500).json({
                reply: "API key is not configured. Please add GEMINI_API_KEY to the server .env file.",
                suggestions: ["Try again", "Career guidance", "Best colleges?"]
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Build profile context
        let profileContext = '';
        if (userProfile && Object.keys(userProfile).length > 0) {
            profileContext = `\nStudent Profile - Interests: ${(userProfile.interests || []).join(', ') || 'N/A'}, Aptitudes: ${(userProfile.aptitude || []).join(', ') || 'N/A'}, Subjects: ${(userProfile.subjects || []).join(', ') || 'N/A'}`;
        }

        // Build conversation as a single prompt (simpler and more reliable)
        let fullPrompt = SYSTEM_PROMPT + profileContext + '\n\n';

        // Add recent conversation context
        const recentHistory = conversationHistory.filter(m => m.content).slice(-6);
        if (recentHistory.length > 0) {
            fullPrompt += 'Recent conversation:\n';
            recentHistory.forEach(m => {
                fullPrompt += `${m.type === 'user' ? 'Student' : 'Mentor'}: ${m.content}\n`;
            });
            fullPrompt += '\n';
        }

        fullPrompt += `Student: ${message}\nMentor:`;

        console.log('Sending to Gemini...');
        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();
        console.log('Gemini responded successfully');

        // Generate suggestions (simple, no second API call)
        const defaultSuggestions = ["Tell me more", "Career options?", "Best colleges?"];

        res.json({
            reply: response,
            suggestions: defaultSuggestions
        });
    } catch (error) {
        console.error('Gemini API error:', error.message || error);
        console.error('Full error:', JSON.stringify(error, null, 2));
        res.status(500).json({
            reply: `API Error: ${error.message || 'Unknown error'}. Please check if your GEMINI_API_KEY is valid.`,
            suggestions: ["Try again", "Ask something else", "Career guidance"]
        });
    }
});

module.exports = router;
