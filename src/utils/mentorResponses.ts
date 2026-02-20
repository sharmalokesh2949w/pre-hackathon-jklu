// Offline smart response engine for AI Mentor chatbot
// Keyword-based with Hinglish personality — no API needed

interface MentorResponse {
    reply: string;
    suggestions: string[];
}

const responses: { keywords: string[]; reply: string; suggestions: string[] }[] = [
    {
        keywords: ['career', 'confused', 'what should', 'kya karu', 'choose'],
        reply: `Yaar, career confusion toh sabko hota hai — even Sundar Pichai ko hua tha! 😄

Here's what works:
1. **Apne interests explore karo** — coding, designing, science, ya business?
2. **Aptitude test do** — isse pata chalega ki natural strength kya hai
3. **Parents se baat karo** — but ultimately tumhari choice hai
4. Try our **What-If Simulator** to see how different choices lead to different careers!

Remember: Koi bhi career "wrong" nahi hota — sirf kuch tumhare liye better fit hota hai 🎯`,
        suggestions: ['What-If Simulator try karo', 'Best careers for introverts', 'How to talk to parents']
    },
    {
        keywords: ['engineering', 'design', 'parents', 'dad', 'mom', 'family'],
        reply: `This is SO common in India — engineering vs passion ka struggle! 💪

**Practical approach:**
1. Show parents real salary data — designers at top companies earn ₹15-30 LPA!
2. UX Design + Tech = Best of BOTH worlds (parents happy, you happy)
3. Start a portfolio NOW — Figma pe free design karo
4. IIT Bombay, NID Ahmedabad have amazing design programs

**Fun fact:** Flipkart's design team makes more than many engineers there! 🎨

Parents ko numbers dikhao — woh samajhenge! 📊`,
        suggestions: ['Design careers salary data', 'How to start a portfolio', 'Top design colleges India']
    },
    {
        keywords: ['marks', 'low', 'fail', 'score', 'percentage', 'poor'],
        reply: `Bro, marks are NOT everything — yeh main guarantee se bol sakta hoon! 🙌

**Real talk:**
- **Steve Jobs** — college dropout → Apple founder
- **Dhirubhai Ambani** — no degree → Reliance Industries
- India mein ab **skill-based hiring** badhta jaa raha hai!

**What you CAN do:**
1. 📱 Learn coding on freeCodeCamp (FREE!)
2. 🎨 Build projects on GitHub — yeh resume se zyada matter karta hai
3. 📚 Focus on certifications — Google, AWS, HubSpot sab free hain
4. 💼 Internships karo — even unpaid ones teach more than classrooms

**Bottom line:** Marks open doors, but skills keep them open! 🔑`,
        suggestions: ['Free online courses', 'How to build a portfolio', 'Skill-based career options']
    },
    {
        keywords: ['college', 'iit', 'nit', 'university', 'admission', 'cs', 'computer'],
        reply: `CS ke liye India mein TOP colleges:

🏆 **Tier 1:**
- IIT Bombay, Delhi, Madras, Kanpur (JEE Advanced)
- IIIT Hyderabad (coding mein sabse strong!)
- BITS Pilani (BITSAT se entry)

⭐ **Tier 2 (still amazing!):**
- NIT Trichy, Warangal, Surathkal
- DTU Delhi, NSUT
- IIIT Bangalore, Pune

🌟 **Emerging:**
- Ashoka University, Plaksha University
- IIIT Sri City, LNMIIT Jaipur

💡 **Pro tip:** College ke saath **GitHub profile** banao, open-source contribute karo, hackathons mein jaao. Companies ab "where you studied" se zyada "what you built" dekhti hain!

JEE prep ke liye: PW, Unacademy, NPTEL — sab free ya affordable hai 📚`,
        suggestions: ['JEE vs NEET preparation', 'NIT cutoff trends', 'Abroad study options']
    },
    {
        keywords: ['jee', 'neet', 'exam', 'preparation', 'prep', 'study'],
        reply: `JEE/NEET prep ka game plan:

📋 **Daily Routine:**
- 6 AM: Previous year questions (PYQs are GOLD!)
- Morning: Concepts + theory (NCERT for NEET, HC Verma for JEE)
- Afternoon: Practice problems
- Evening: Mock tests (NTA Abhyas app is free!)
- Night: Revision + doubt clearing

📱 **Free Resources:**
- **PW (Physics Wallah)** — affordable + quality
- **NPTEL** — IIT professors ke lectures
- **Unacademy** — free tier bhi kaafi hai
- **NTA Abhyas** — official practice app

💪 **Mental Health:**
- Breaks lo! 50-10 method (50 min study, 10 min rest)
- Exercise karo — brain ke liye zaroori hai
- Compare mat karo — apni pace se padho

Koi bhi topper Day 1 se topper nahi tha! 🌟`,
        suggestions: ['Study schedule template', 'Best books for JEE', 'Managing exam stress']
    },
    {
        keywords: ['resource', 'learn', 'course', 'free', 'online', 'study material'],
        reply: `Free learning resources ka treasure chest 🎁:

💻 **Coding:**
- freeCodeCamp, CS50 Harvard, The Odin Project
- LeetCode (start with Easy problems!)

📊 **Data Science:**
- Kaggle Learn (free + practical!)
- Google Data Analytics Certificate

🎨 **Design:**
- Figma (free forever!), Dribbble for inspiration
- Google UX Design Certificate

📚 **Academics:**
- Khan Academy (Math, Science, Economics)
- NPTEL (IIT lectures — free!)
- MIT OpenCourseWare

🇮🇳 **India-specific:**
- SWAYAM portal (govt-backed)
- Skill India Digital
- DigiLocker for certificates

Sab kuch available hai — sirf start karna hai! 🚀`,
        suggestions: ['Best coding roadmap', 'Design portfolio tips', 'Aptitude test resources']
    },
    {
        keywords: ['stress', 'anxious', 'pressure', 'mental', 'scared', 'worried'],
        reply: `Hey, take a deep breath 🫁 — you're not alone!

**Facts:**
- 73% Indian students feel career pressure — it's WAY more common than you think
- Pressure mein best decisions nahi aate — calm mind mein aate hain

**What helps:**
1. 🧘 5-minute breathing exercise (try Box Breathing)
2. ✍️ Journal likhna — thoughts ko paper pe laao
3. 🗣️ Kisi se baat karo — friend, teacher, counselor
4. 📱 iCall (TISS) — free student counseling: 9152987821
5. 🏃 Physical activity — even a 15-min walk helps!

**Remember:**
- Ek exam tumhari poori zindagi define nahi karti
- Failures successful logon ki journey ka part hai
- You're doing your best, and that's enough! 💛

Kuch aur poochna hai toh main yahan hoon! 🤗`,
        suggestions: ['Mindfulness exercises', 'How to handle exam pressure', 'Career without top marks']
    },
    {
        keywords: ['hello', 'hi', 'hey', 'start', 'help'],
        reply: `Hey! 👋 Main hoon tumhara AI Career Mentor!

Main tumhari help kar sakta hoon:
🎯 Career guidance & comparison
📊 College selection (IITs, NITs, & more)
📝 Exam preparation tips (JEE, NEET, CLAT)
😰 Stress management & motivation
📚 Free learning resources

Batao, kya jaanna hai? 😊`,
        suggestions: ['Career guidance chahiye', 'Best colleges for CS', 'How to manage stress']
    },
    {
        keywords: ['thank', 'thanks', 'shukriya', 'dhanyawaad'],
        reply: `You're welcome yaar! 🤗 

Yaad rakhna — no question is too small. Career planning ek journey hai, destination nahi. Jab bhi help chahiye, main yahan hoon! 

All the best for your future! 🌟🚀`,
        suggestions: ['Ask another question', 'Career comparison', 'Growth tracking']
    }
];

const fallbackResponse: MentorResponse = {
    reply: `Interesting question! 🤔 

Main abhi iske baare mein detail mein help kar sakta hoon — yeh try karo:

1. **Compare Careers** page pe specific careers compare karo
2. **What-If Simulator** mein apne interests toggle karke dekho
3. **Growth Tracker** pe apna progress track karo

Ya phir mujhe kuch specific poochho — jaise:
- "Which career suits me?"
- "Best colleges for engineering?"
- "How to deal with exam stress?"

Main har cheez mein guide karunga! 💪`,
    suggestions: ['Career suggestions do', 'Study tips chahiye', 'College ranking batao']
};

export function getSmartResponse(userMessage: string): MentorResponse {
    const lowerMessage = userMessage.toLowerCase();

    for (const response of responses) {
        const match = response.keywords.some(keyword => lowerMessage.includes(keyword));
        if (match) {
            return { reply: response.reply, suggestions: response.suggestions };
        }
    }

    return fallbackResponse;
}
