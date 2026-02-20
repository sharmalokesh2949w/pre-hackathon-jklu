import { CAREER_DATABASE, type CareerInfo } from './careerData';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface StudentProfile {
    interests?: string[];
    aptitude?: string[];
    subjects?: string[];
    learningStyle?: string;
    [key: string]: unknown; // allow extra fields
}

export interface CareerExplanation {
    whySuitable: string;
    influencingTraits: string[];
    areasOfImprovement: string[];
}

export interface CareerRecommendation {
    title: string;
    matchScore: number;
    status: string;
    description: string;
    subjects: string[];
    explanation: CareerExplanation;
    careerInfo: CareerInfo;
    roadmapPhases: {
        title: string;
        items: { label: string; detail: string; completed: boolean }[];
    }[];
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/** Safely coerce a value to a string array — never returns undefined */
const toSafeArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value;
    return [];
};

/** Safe division — returns 0 when denominator is 0 */
const safeDivide = (numerator: number, denominator: number): number => {
    return denominator > 0 ? numerator / denominator : 0;
};

// ──────────────────────────────────────────────
// Core Functions (all production-safe)
// ──────────────────────────────────────────────

/**
 * Calculate how well a career matches a student's profile.
 *
 * Fully defensive — handles undefined/null career or profile,
 * missing arrays, and division by zero. Always returns a number 30–100.
 *
 * Compatible with React StrictMode (pure, no side-effects).
 */
export const calculateMatchScore = (
    career: CareerInfo | null | undefined,
    profile: StudentProfile | null | undefined,
): number => {
    // Guard: if either argument is missing, return a neutral score
    if (!career || !profile) return 50;

    let score = 0;
    let factors = 0;

    // Safely extract profile arrays
    const interests = toSafeArray(profile.interests);
    const aptitudes = toSafeArray(profile.aptitude);
    const subjects = toSafeArray(profile.subjects);

    // Safely extract career arrays
    const careerInterests = toSafeArray(career.matchingInterests);
    const careerAptitudes = toSafeArray(career.matchingAptitudes);
    const careerSubjects = toSafeArray(career.matchingSubjects);

    // Interest match (weight: 40%)
    if (careerInterests.length > 0) {
        const interestMatches = interests.filter(i => careerInterests.includes(i)).length;
        score += safeDivide(interestMatches, careerInterests.length) * 40;
        factors++;
    }

    // Aptitude match (weight: 30%)
    if (careerAptitudes.length > 0) {
        const aptitudeMatches = aptitudes.filter(a => careerAptitudes.includes(a)).length;
        score += safeDivide(aptitudeMatches, careerAptitudes.length) * 30;
        factors++;
    }

    // Subject match (weight: 20%)
    if (careerSubjects.length > 0) {
        const subjectMatches = subjects.filter(s => careerSubjects.includes(s)).length;
        score += safeDivide(subjectMatches, careerSubjects.length) * 20;
        factors++;
    }

    // Industry demand bonus (weight: 10%)
    const demand = typeof career.industryDemand === 'number' ? career.industryDemand : 50;
    score += safeDivide(demand, 100) * 10;
    factors++;

    // Normalize to 30–100 range
    const rawScore = factors > 0 ? Math.round(score) : 50;
    return Math.max(30, Math.min(100, rawScore));
};

export const getStatusLabel = (score: number): string => {
    if (score >= 85) return 'Perfect Match';
    if (score >= 70) return 'Great Match';
    if (score >= 55) return 'Good Fit';
    if (score >= 40) return 'Growing Fit';
    return 'Explore';
};

/**
 * Generate an explainable-AI style explanation for why a career
 * suits a student's profile. Fully null-safe.
 */
export const generateExplanation = (
    career: CareerInfo | null | undefined,
    profile: StudentProfile | null | undefined,
): CareerExplanation => {
    const fallback: CareerExplanation = {
        whySuitable: 'Complete your profile to get personalised career insights.',
        influencingTraits: [],
        areasOfImprovement: [],
    };

    if (!career || !profile) return fallback;

    const interests = toSafeArray(profile.interests);
    const aptitudes = toSafeArray(profile.aptitude);
    const subjects = toSafeArray(profile.subjects);

    const careerInterests = toSafeArray(career.matchingInterests);
    const careerAptitudes = toSafeArray(career.matchingAptitudes);
    const careerSubjects = toSafeArray(career.matchingSubjects);
    const requiredSkills = toSafeArray(career.requiredSkills);

    const matchedInterests = interests.filter(i => careerInterests.includes(i));
    const matchedAptitudes = aptitudes.filter(a => careerAptitudes.includes(a));
    const matchedSubjects = subjects.filter(s => careerSubjects.includes(s));

    // Explainable AI — tell the student exactly WHY
    let whySuitable = '';
    if (matchedInterests.length > 0) {
        whySuitable += `Your interest in ${matchedInterests.join(' & ')} aligns strongly with this career. `;
    }
    if (matchedAptitudes.length > 0) {
        whySuitable += `Your ${matchedAptitudes.join(', ')} skills are key requirements. `;
    }
    if (matchedSubjects.length > 0) {
        whySuitable += `Your academic strength in ${matchedSubjects.join(', ')} provides a solid foundation.`;
    }
    if (!whySuitable) {
        whySuitable = 'This is an emerging career with high growth potential that could match your developing interests.';
    }

    const influencingTraits = [...matchedInterests, ...matchedAptitudes, ...matchedSubjects];

    const missingAptitudes = careerAptitudes.filter(a => !aptitudes.includes(a));
    const missingSubjects = careerSubjects.filter(s => !subjects.includes(s));
    const areasOfImprovement = [
        ...missingAptitudes.map(a => `Develop ${a}`),
        ...missingSubjects.map(s => `Strengthen ${s}`),
        ...requiredSkills.slice(0, 2).map(s => `Learn ${s}`),
    ].slice(0, 4);

    return { whySuitable, influencingTraits, areasOfImprovement };
};

/** Generate a 3-phase roadmap from a career — safe with optional chaining */
export const generateRoadmap = (career: CareerInfo | null | undefined) => {
    const educationPath = toSafeArray(career?.educationPath);
    const requiredSkills = toSafeArray(career?.requiredSkills);
    const topColleges = toSafeArray(career?.topColleges);
    const category = career?.category ?? 'your field';

    return [
        {
            title: 'Foundation (Class 10-11)',
            items: [
                { label: educationPath[0] ?? 'Choose the right stream', detail: 'Build your academic foundation for this career', completed: false },
                { label: `Learn ${requiredSkills[0] ?? 'core concepts'}`, detail: 'Start with the most critical skill', completed: true },
            ],
        },
        {
            title: 'Specialization (Class 12)',
            items: [
                { label: 'Entrance Exam Prep', detail: `Target: ${topColleges[0] ?? 'top college'} or similar`, completed: false },
                { label: `Build a ${category} project`, detail: `Apply ${requiredSkills[1] ?? 'skills'} practically`, completed: false },
            ],
        },
        {
            title: 'Higher Education',
            items: [
                { label: educationPath[1] ?? "Bachelor's Degree", detail: `Top Colleges: ${topColleges.slice(0, 2).join(', ') || 'TBD'}`, completed: false },
                { label: 'Internships & Projects', detail: 'Gain real-world industry experience', completed: false },
            ],
        },
    ];
};

// ──────────────────────────────────────────────
// Composite / Public API
// ──────────────────────────────────────────────

/** Get sorted career recommendations for a profile */
export const getCareerRecommendations = (profile: StudentProfile | null | undefined): CareerRecommendation[] => {
    return CAREER_DATABASE.map(career => {
        const matchScore = calculateMatchScore(career, profile);
        return {
            title: career.title,
            matchScore,
            status: getStatusLabel(matchScore),
            description: career.description,
            subjects: toSafeArray(career.matchingSubjects),
            explanation: generateExplanation(career, profile),
            careerInfo: career,
            roadmapPhases: generateRoadmap(career),
        };
    }).sort((a, b) => b.matchScore - a.matchScore);
};

/** Backward-compatible single-recommendation helper */
export const mapProfileToCareer = (profile: StudentProfile | null | undefined): CareerRecommendation => {
    const recommendations = getCareerRecommendations(profile);
    return recommendations[0];
};

/** What-If simulator: recalculate with modified profile */
export const simulateCareerChange = (
    baseProfile: StudentProfile | null | undefined,
    overrides: { interests?: string[]; aptitude?: string[]; subjects?: string[] },
): CareerRecommendation[] => {
    const modifiedProfile: StudentProfile = {
        ...(baseProfile ?? {}),
        ...overrides,
    };
    return getCareerRecommendations(modifiedProfile);
};

/** Compare specific careers by ID */
export const compareCareers = (careerIds: string[]): CareerInfo[] => {
    if (!Array.isArray(careerIds)) return [];
    return CAREER_DATABASE.filter(c => careerIds.includes(c.id));
};
