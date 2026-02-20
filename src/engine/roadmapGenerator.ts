import type {
    CareerRoadmap,
    RoadmapPhase,
    CollegeSuggestion,
    EntranceExam,
    CareerRanking,
    AcademicResult,
} from '../types/analysis';

// ── College Database ──────────────────────────

const COLLEGES: Record<string, CollegeSuggestion[]> = {
    'Science (PCM)': [
        { name: 'IIT Bombay', location: 'Mumbai', type: 'India', stream: 'Science (PCM)', ranking: '#1 Engineering' },
        { name: 'IIT Delhi', location: 'New Delhi', type: 'India', stream: 'Science (PCM)', ranking: '#2 Engineering' },
        { name: 'IIT Madras', location: 'Chennai', type: 'India', stream: 'Science (PCM)', ranking: '#3 Engineering' },
        { name: 'BITS Pilani', location: 'Rajasthan', type: 'India', stream: 'Science (PCM)', ranking: 'Top 10 Private' },
        { name: 'IISc Bangalore', location: 'Bangalore', type: 'India', stream: 'Science (PCM)', ranking: '#1 Research' },
        { name: 'MIT', location: 'Cambridge, USA', type: 'Global', stream: 'Science (PCM)', ranking: '#1 Global' },
        { name: 'Stanford University', location: 'California, USA', type: 'Global', stream: 'Science (PCM)', ranking: '#2 Global' },
    ],
    'Science (PCB)': [
        { name: 'AIIMS Delhi', location: 'New Delhi', type: 'India', stream: 'Science (PCB)', ranking: '#1 Medical' },
        { name: 'CMC Vellore', location: 'Tamil Nadu', type: 'India', stream: 'Science (PCB)', ranking: '#2 Medical' },
        { name: 'JIPMER Puducherry', location: 'Puducherry', type: 'India', stream: 'Science (PCB)', ranking: '#3 Medical' },
        { name: 'Johns Hopkins', location: 'Maryland, USA', type: 'Global', stream: 'Science (PCB)', ranking: '#1 Global Medical' },
    ],
    Commerce: [
        { name: 'SRCC Delhi', location: 'New Delhi', type: 'India', stream: 'Commerce', ranking: '#1 Commerce' },
        { name: 'St. Xavier\'s Mumbai', location: 'Mumbai', type: 'India', stream: 'Commerce', ranking: 'Top 5' },
        { name: 'IIM Ahmedabad', location: 'Gujarat', type: 'India', stream: 'Commerce', ranking: '#1 MBA' },
        { name: 'London School of Economics', location: 'London, UK', type: 'Global', stream: 'Commerce', ranking: 'Top 5 Global' },
    ],
    'Arts / Science': [
        { name: 'NID Ahmedabad', location: 'Gujarat', type: 'India', stream: 'Arts / Science', ranking: '#1 Design' },
        { name: 'NIFT Delhi', location: 'New Delhi', type: 'India', stream: 'Arts / Science', ranking: '#1 Fashion Design' },
        { name: 'IDC IIT Bombay', location: 'Mumbai', type: 'India', stream: 'Arts / Science' },
        { name: 'Rhode Island School of Design', location: 'USA', type: 'Global', stream: 'Arts / Science' },
    ],
    Arts: [
        { name: 'St. Stephen\'s College', location: 'New Delhi', type: 'India', stream: 'Arts', ranking: '#1 Arts' },
        { name: 'Loyola College', location: 'Chennai', type: 'India', stream: 'Arts' },
        { name: 'FTII Pune', location: 'Pune', type: 'India', stream: 'Arts', ranking: '#1 Film' },
    ],
    'Any Stream': [
        { name: 'NLSIU Bangalore', location: 'Bangalore', type: 'India', stream: 'Any Stream', ranking: '#1 Law' },
        { name: 'NALSAR Hyderabad', location: 'Hyderabad', type: 'India', stream: 'Any Stream', ranking: '#2 Law' },
        { name: 'Symbiosis Pune', location: 'Pune', type: 'India', stream: 'Any Stream' },
        { name: 'Harvard University', location: 'Cambridge, USA', type: 'Global', stream: 'Any Stream' },
    ],
};

// ── Exam Database ─────────────────────────────

const EXAMS: Record<string, EntranceExam[]> = {
    'Science (PCM)': [
        { name: 'JEE Main', targetYear: 'Class 12', stream: 'Engineering', prepTip: 'Start prep from Class 11. Focus on NCERT + PYQs.' },
        { name: 'JEE Advanced', targetYear: 'After JEE Main', stream: 'IIT Engineering', prepTip: 'Qualify JEE Main first. Deep problem solving required.' },
        { name: 'BITSAT', targetYear: 'Class 12', stream: 'BITS Pilani', prepTip: 'Speed and accuracy focused. Practice online tests.' },
        { name: 'KVPY/INSPIRE', targetYear: 'Class 11-12', stream: 'Research Scholars', prepTip: 'Strong fundamentals in science and math needed.' },
    ],
    'Science (PCB)': [
        { name: 'NEET UG', targetYear: 'Class 12', stream: 'Medical', prepTip: 'NCERT is bible. Cover Biology thoroughly.' },
        { name: 'AIIMS (NEET)', targetYear: 'Class 12', stream: 'Top Medical', prepTip: 'Top NEET rank needed. Focus on assertion-reasoning.' },
    ],
    Commerce: [
        { name: 'IPMAT', targetYear: 'Class 12', stream: 'IIM Integrated', prepTip: 'Quantitative aptitude + verbal skills.' },
        { name: 'CLAT', targetYear: 'Class 12', stream: 'Law', prepTip: 'Current affairs + legal reasoning. Read newspapers daily.' },
        { name: 'CA Foundation', targetYear: 'After Class 12', stream: 'Chartered Accountancy', prepTip: 'Strong accounting and math fundamentals.' },
    ],
    'Any Stream': [
        { name: 'CLAT', targetYear: 'Class 12', stream: 'Law', prepTip: 'Current affairs + legal reasoning. Read newspapers daily.' },
        { name: 'CUET', targetYear: 'Class 12', stream: 'Central Universities', prepTip: 'Domain-specific + general aptitude.' },
    ],
    'Arts / Science': [
        { name: 'NID DAT', targetYear: 'Class 12', stream: 'Design', prepTip: 'Drawing skills + design aptitude tests.' },
        { name: 'NIFT Entrance', targetYear: 'Class 12', stream: 'Fashion/Design', prepTip: 'Creative ability + general awareness.' },
        { name: 'UCEED', targetYear: 'Class 12', stream: 'IIT Design', prepTip: 'Visual perception + drawing.' },
    ],
    Arts: [
        { name: 'CUET', targetYear: 'Class 12', stream: 'Central Universities', prepTip: 'Domain knowledge in humanities.' },
    ],
};

// ── Generate Roadmap ──────────────────────────

export const generateFullRoadmap = (
    topCareer: CareerRanking | null,
    stream: string,
    academicResult: AcademicResult | null
): CareerRoadmap => {
    const careerTitle = topCareer?.title ?? 'Your Career';
    const actualStream = stream || 'Science (PCM)';

    // Determine subjects to focus and improve
    const strong = academicResult?.strongSubjects?.slice(0, 3) ?? [];
    const weak = academicResult?.weakSubjects?.slice(0, 3) ?? [];
    const focus = strong.length > 0 ? strong : ['Core Subjects'];
    const improve = weak.length > 0 ? weak : ['Practice Weak Areas'];

    const phases: RoadmapPhase[] = [
        {
            phase: 'Next 1 Year',
            timeframe: 'Immediate',
            items: [
                { title: `Choose ${actualStream} stream`, detail: `Aligned with ${careerTitle} career path`, type: 'focus' },
                { title: `Strengthen ${focus[0] ?? 'core subject'}`, detail: 'Your strongest subject — maintain and deepen mastery', type: 'focus' },
                ...(improve[0] ? [{ title: `Improve ${improve[0]}`, detail: 'Identified as weak area — focus on fundamentals', type: 'improve' as const }] : []),
                { title: 'Build foundational skills', detail: 'Start online courses, read subject-specific books', type: 'skill' },
                { title: 'Explore career shadowing', detail: `Find professionals in ${careerTitle} field for mentorship`, type: 'intern' },
            ],
        },
        {
            phase: 'Class 11–12 Strategy',
            timeframe: '2 Years',
            items: [
                { title: 'Stream-specific deep dive', detail: `Master all ${actualStream} subjects thoroughly`, type: 'focus' },
                { title: 'Entrance exam preparation', detail: 'Start structured coaching or self-study for target exams', type: 'exam' },
                { title: 'Build projects & portfolio', detail: `Create practical projects related to ${careerTitle}`, type: 'skill' },
                { title: 'Competitive exam mock tests', detail: 'Regular practice with previous year papers', type: 'exam' },
                { title: 'Skill development', detail: 'Online certifications, workshops, hackathons', type: 'cert' },
            ],
        },
        {
            phase: 'College Years Plan',
            timeframe: '3–4 Years',
            items: [
                { title: 'Target top colleges', detail: 'Apply to reach + safe colleges in your stream', type: 'college' },
                { title: 'Internships every summer', detail: 'Gain hands-on industry experience progressively', type: 'intern' },
                { title: 'Build professional network', detail: 'LinkedIn, conferences, college committees', type: 'skill' },
                { title: 'Specialization courses', detail: `Electives aligned with ${careerTitle}`, type: 'focus' },
                { title: 'Research/thesis projects', detail: 'Publishable work that demonstrates expertise', type: 'skill' },
            ],
        },
        {
            phase: 'Skill Stack Plan',
            timeframe: 'Ongoing',
            items: [
                { title: 'Technical certifications', detail: 'Industry-recognized certifications', type: 'cert' },
                { title: 'Soft skills development', detail: 'Communication, leadership, teamwork', type: 'skill' },
                { title: 'Domain expertise', detail: `Deep specialization in ${topCareer?.category ?? 'your field'}`, type: 'focus' },
                { title: 'Personal branding', detail: 'Blog, GitHub, portfolio website, social media presence', type: 'skill' },
            ],
        },
        {
            phase: 'Career Launch Phase',
            timeframe: 'Post-Education',
            items: [
                { title: 'Full-time placement/startup', detail: `Target top companies or start your own venture in ${careerTitle}`, type: 'focus' },
                { title: 'Advanced degree (optional)', detail: 'M.Tech/MBA/MS for career acceleration', type: 'college' },
                { title: 'Industry mentorship', detail: 'Connect with senior professionals for career guidance', type: 'skill' },
                { title: 'Continuous learning', detail: 'Stay updated with industry trends and new technologies', type: 'cert' },
            ],
        },
    ];

    // Lookup colleges and exams
    const colleges = COLLEGES[actualStream] ?? COLLEGES['Any Stream'] ?? [];
    const entranceExams = EXAMS[actualStream] ?? EXAMS['Any Stream'] ?? [];

    // Certifications based on career category
    const certifications = getCertifications(topCareer?.category ?? '');
    const internshipSuggestions = getInternships(topCareer?.category ?? '');

    return {
        stream: actualStream,
        phases,
        colleges,
        entranceExams,
        certifications,
        internshipSuggestions,
        subjectStrategy: { focus, improve },
    };
};

// ── Certification Suggestions ─────────────────

function getCertifications(category: string): string[] {
    const map: Record<string, string[]> = {
        Technology: ['AWS Cloud Practitioner', 'Google Data Analytics', 'Meta Frontend Developer', 'IBM Data Science'],
        'Life Sciences': ['Good Laboratory Practice (GLP)', 'Bioinformatics Certification', 'Clinical Research Associate'],
        Design: ['Google UX Design', 'Adobe Certified Expert', 'Interaction Design Foundation'],
        'Creative & Media': ['Adobe Creative Suite', 'YouTube Creator Program', 'Content Marketing by HubSpot'],
        Aerospace: ['Drone Pilot License', 'CAD Certification', 'Space Systems Engineering'],
        'Green Technology': ['LEED Green Associate', 'Renewable Energy Certificate', 'Carbon Management'],
        'Healthcare Technology': ['HL7 FHIR', 'Healthcare IT Certification', 'PMP'],
        'Agriculture Technology': ['Precision Agriculture', 'Drone Mapping Certificate', 'IoT Fundamentals'],
        'Law & Governance': ['Cyber Law Certification', 'IPR Certificate', 'Mediation & Arbitration'],
        'Sports & Fitness': ['Sports Nutrition', 'Coaching License', 'Sports Analytics Certificate'],
    };
    return map[category] ?? ['Google Digital Marketing', 'Project Management (PMP)', 'Communication Skills'];
}

function getInternships(category: string): string[] {
    const map: Record<string, string[]> = {
        Technology: ['Tech startups (AngelList)', 'GSoC — Google Summer of Code', 'LFX Mentorship', 'Internshala Tech'],
        'Life Sciences': ['CSIR Labs', 'Biocon internship', 'Hospital clinical internships'],
        Design: ['Design agency internships', 'Behance portfolio', 'Dribbble community projects'],
        'Creative & Media': ['Media houses', 'YouTube channels', 'Social media agencies'],
        Aerospace: ['ISRO Summer Fellowship', 'HAL internships', 'Space startups'],
        'Healthcare Technology': ['HealthTech startups', 'Hospital IT departments', 'Pharma companies'],
        'Law & Governance': ['Law firm internships', 'District court observer', 'NGO legal cells'],
    };
    return map[category] ?? ['Internshala', 'LinkedIn internships', 'University research assistantships'];
}
