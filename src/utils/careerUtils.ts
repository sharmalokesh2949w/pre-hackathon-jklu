export interface CareerRecommendation {
    title: string;
    matchScore: number;
    status: string;
    description: string;
    subjects: string[];
    roadmapPhases: {
        title: string;
        items: { label: string; detail: string; completed: boolean }[];
    }[];
}

export const mapProfileToCareer = (profile: any): CareerRecommendation => {
    const interests = profile?.interests || [];

    // Default recommendation if no matches found
    let career: CareerRecommendation = {
        title: 'General Excellence',
        matchScore: 75,
        status: 'High Fit',
        description: 'Explore broad fields across technology and management.',
        subjects: ['Mathematics', 'English', 'Social Sciences'],
        roadmapPhases: [
            {
                title: 'Phase 1: Exploration',
                items: [
                    { label: 'Skill Discovery', detail: 'Identify your key strengths through varied projects', completed: false },
                    { label: 'Foundation Building', detail: 'Strengthen core academic performance', completed: true },
                ]
            }
        ]
    };

    if (interests.includes('Computer Science')) {
        career = {
            title: 'AI Research Scientist',
            matchScore: 92,
            status: 'Great Match',
            description: 'Fits your strong logic and interest in technology.',
            subjects: ['Mathematics', 'Physics', 'Computer Applications'],
            roadmapPhases: [
                {
                    title: 'Foundation (Class 10-11)',
                    items: [
                        { label: 'Master PCM Basics', detail: 'Focus on Calculus & Kinematics', completed: false },
                        { label: 'Python foundations', detail: 'Logic building for AI', completed: true },
                    ]
                },
                {
                    title: 'Specialization (Class 12)',
                    items: [
                        { label: 'JEE & SAT Prep', detail: 'Target top global tech universities', completed: false },
                        { label: 'AI Project', detail: 'Build a small LLM based tool', completed: false },
                    ]
                }
            ]
        };
    } else if (interests.includes('Medical / Biology')) {
        career = {
            title: 'Molecular Biotechnologist',
            matchScore: 88,
            status: 'High Fit',
            description: 'Perfect for your affinity towards life sciences and research.',
            subjects: ['Biology', 'Chemistry', 'Physics'],
            roadmapPhases: [
                {
                    title: 'Core Science (Class 10-11)',
                    items: [
                        { label: 'Organic Chemistry', detail: 'Master the basics of molecules', completed: false },
                        { label: 'Laboratory Basics', detail: 'Participate in school labs', completed: true },
                    ]
                },
                {
                    title: 'Medical Prep (Class 12)',
                    items: [
                        { label: 'NEET/MCAT Prep', detail: 'Systematic study for medical entry', completed: false },
                        { label: 'Bio-Informatics', detail: 'Intro to computational biology', completed: false },
                    ]
                }
            ]
        };
    } else if (interests.includes('Arts & Design')) {
        career = {
            title: 'UX/UI Product Designer',
            matchScore: 85,
            status: 'Great Match',
            description: 'Combines your creative mindset with digital trends.',
            subjects: ['Design', 'Fine Arts', 'Social Sciences'],
            roadmapPhases: [
                {
                    title: 'Design Fundamentals',
                    items: [
                        { label: 'Visual Hierarchy', detail: 'Learn about layout and spacing', completed: true },
                        { label: 'Color Theory', detail: 'Psychology of colors in design', completed: false },
                    ]
                },
                {
                    title: 'Digital Portfolio',
                    items: [
                        { label: 'Figma Mastery', detail: 'Industry-standard design tools', completed: false },
                        { label: 'Personal Project', detail: 'Design a mobile app prototype', completed: false },
                    ]
                }
            ]
        };
    }

    return career;
};
