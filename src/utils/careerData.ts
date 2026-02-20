// Rich career database for EduPath AI
export interface CareerInfo {
    id: string;
    title: string;
    category: string;
    description: string;
    salaryRange: { min: number; max: number; currency: string };
    growthOutlook: 'High' | 'Very High' | 'Moderate' | 'Emerging';
    requiredSkills: string[];
    educationPath: string[];
    topColleges: string[];
    matchingInterests: string[];
    matchingAptitudes: string[];
    matchingSubjects: string[];
    industryDemand: number; // 0-100
    emergingTech: boolean;
    icon: string;
    color: string;
}

export const CAREER_DATABASE: CareerInfo[] = [
    {
        id: 'ai-scientist',
        title: 'AI Research Scientist',
        category: 'Technology',
        description: 'Design and develop cutting-edge artificial intelligence models and systems that solve real-world problems.',
        salaryRange: { min: 800000, max: 4500000, currency: 'INR' },
        growthOutlook: 'Very High',
        requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Mathematics', 'Research', 'Data Analysis'],
        educationPath: ['PCM in Class 11-12', 'B.Tech CS/AI', 'M.Tech/MS in AI/ML', 'PhD (optional)'],
        topColleges: ['IIT Bombay', 'IIT Delhi', 'IISc Bangalore', 'IIIT Hyderabad', 'CMU', 'Stanford'],
        matchingInterests: ['Computer Science', 'Pure Sciences'],
        matchingAptitudes: ['Logical Reasoning', 'Analytical Skills'],
        matchingSubjects: ['Mathematics', 'Physics', 'Computer Applications'],
        industryDemand: 95,
        emergingTech: true,
        icon: 'Brain',
        color: 'sky'
    },
    {
        id: 'full-stack-dev',
        title: 'Full Stack Developer',
        category: 'Technology',
        description: 'Build complete web applications from frontend interfaces to backend systems and databases.',
        salaryRange: { min: 600000, max: 3500000, currency: 'INR' },
        growthOutlook: 'High',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'Databases', 'API Design', 'DevOps'],
        educationPath: ['PCM in Class 11-12', 'B.Tech CS/IT', 'Bootcamps', 'Self-learning'],
        topColleges: ['IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'IIIT Hyderabad'],
        matchingInterests: ['Computer Science', 'Engineering'],
        matchingAptitudes: ['Logical Reasoning', 'Creative Thinking', 'Hands-on Practical'],
        matchingSubjects: ['Mathematics', 'Computer Applications'],
        industryDemand: 90,
        emergingTech: false,
        icon: 'Code',
        color: 'indigo'
    },
    {
        id: 'ux-designer',
        title: 'UX/UI Product Designer',
        category: 'Design',
        description: 'Create intuitive, beautiful digital experiences that delight users and solve complex problems.',
        salaryRange: { min: 500000, max: 2800000, currency: 'INR' },
        growthOutlook: 'High',
        requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Visual Design', 'Psychology', 'HTML/CSS'],
        educationPath: ['Arts/Science in 11-12', 'B.Des/BFA', 'NID/NIFT', 'Online certifications'],
        topColleges: ['NID Ahmedabad', 'NIFT Delhi', 'IDC IIT Bombay', 'Srishti Manipal'],
        matchingInterests: ['Arts & Design', 'Computer Science'],
        matchingAptitudes: ['Creative Thinking', 'Communication'],
        matchingSubjects: ['Computer Applications', 'Literature'],
        industryDemand: 82,
        emergingTech: false,
        icon: 'Palette',
        color: 'purple'
    },
    {
        id: 'biotech',
        title: 'Molecular Biotechnologist',
        category: 'Life Sciences',
        description: 'Research molecular and genetic technologies to create breakthroughs in medicine and agriculture.',
        salaryRange: { min: 500000, max: 2500000, currency: 'INR' },
        growthOutlook: 'Very High',
        requiredSkills: ['Molecular Biology', 'Genetics', 'Lab Techniques', 'Bioinformatics', 'Research'],
        educationPath: ['PCB in Class 11-12', 'B.Tech Biotech/B.Sc Biology', 'M.Sc/M.Tech', 'PhD'],
        topColleges: ['IIT Kharagpur', 'JNU Delhi', 'AIIMS', 'IISc Bangalore'],
        matchingInterests: ['Medical / Biology', 'Pure Sciences'],
        matchingAptitudes: ['Analytical Skills', 'Hands-on Practical'],
        matchingSubjects: ['Biology', 'Chemistry', 'Physics'],
        industryDemand: 78,
        emergingTech: true,
        icon: 'Microscope',
        color: 'emerald'
    },
    {
        id: 'data-analyst',
        title: 'Data Analyst',
        category: 'Technology',
        description: 'Transform raw data into actionable insights that drive critical business decisions.',
        salaryRange: { min: 400000, max: 2000000, currency: 'INR' },
        growthOutlook: 'High',
        requiredSkills: ['SQL', 'Python', 'Excel', 'Statistics', 'Data Visualization', 'Tableau'],
        educationPath: ['PCM in Class 11-12', 'B.Tech/B.Sc Stats/Math', 'MBA Analytics'],
        topColleges: ['ISI Kolkata', 'IIT Madras', 'BITS Pilani', 'Christ University'],
        matchingInterests: ['Computer Science', 'Business & Finance'],
        matchingAptitudes: ['Analytical Skills', 'Logical Reasoning'],
        matchingSubjects: ['Mathematics', 'Economics', 'Computer Applications'],
        industryDemand: 88,
        emergingTech: false,
        icon: 'BarChart',
        color: 'amber'
    },
    {
        id: 'sports-mgmt',
        title: 'Sports Manager / Athlete Coach',
        category: 'Sports & Fitness',
        description: 'Manage sports teams, coach athletes, and build careers in the booming Indian sports industry.',
        salaryRange: { min: 400000, max: 2500000, currency: 'INR' },
        growthOutlook: 'Emerging',
        requiredSkills: ['Sports Science', 'Leadership', 'Communication', 'Nutrition', 'Strategy', 'Analytics'],
        educationPath: ['Any stream 11-12', 'B.Sc Sports Science', 'MBA Sports Management', 'Coaching certifications'],
        topColleges: ['LNIPE Gwalior', 'Symbiosis Pune', 'TISS Mumbai', 'NIS Patiala'],
        matchingInterests: ['Social Sciences', 'Business & Finance'],
        matchingAptitudes: ['Leadership', 'Communication', 'Hands-on Practical'],
        matchingSubjects: ['Biology', 'Economics'],
        industryDemand: 65,
        emergingTech: false,
        icon: 'Trophy',
        color: 'orange'
    },
    {
        id: 'climate-tech',
        title: 'Climate Tech Engineer',
        category: 'Green Technology',
        description: 'Build technologies to combat climate change — from renewable energy systems to carbon capture.',
        salaryRange: { min: 600000, max: 3000000, currency: 'INR' },
        growthOutlook: 'Very High',
        requiredSkills: ['Environmental Science', 'Engineering', 'Data Modeling', 'Renewable Energy', 'Policy'],
        educationPath: ['PCM in Class 11-12', 'B.Tech Environmental/Energy', 'M.Tech', 'Research'],
        topColleges: ['IIT Bombay', 'IIT Madras', 'TERI University', 'IIFM Bhopal'],
        matchingInterests: ['Engineering', 'Pure Sciences'],
        matchingAptitudes: ['Analytical Skills', 'Hands-on Practical'],
        matchingSubjects: ['Physics', 'Chemistry', 'Mathematics'],
        industryDemand: 82,
        emergingTech: true,
        icon: 'Leaf',
        color: 'green'
    },
    {
        id: 'lawyer',
        title: 'Corporate Lawyer',
        category: 'Law & Governance',
        description: 'Navigate complex legal landscapes for corporations, specializing in mergers, IP, or international law.',
        salaryRange: { min: 600000, max: 4000000, currency: 'INR' },
        growthOutlook: 'Moderate',
        requiredSkills: ['Legal Research', 'Argumentation', 'Writing', 'Critical Thinking', 'Negotiation'],
        educationPath: ['Any stream 11-12', 'BA LLB (5-year)', 'LLM Specialization'],
        topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'NUJS Kolkata'],
        matchingInterests: ['Law & Politics', 'Social Sciences'],
        matchingAptitudes: ['Communication', 'Analytical Skills', 'Leadership'],
        matchingSubjects: ['History / Civics', 'Economics', 'Literature'],
        industryDemand: 72,
        emergingTech: false,
        icon: 'Scale',
        color: 'rose'
    },
    {
        id: 'content-creator',
        title: 'Digital Content Creator',
        category: 'Creative & Media',
        description: 'Build a personal brand through video, writing, or design content across digital platforms.',
        salaryRange: { min: 300000, max: 5000000, currency: 'INR' },
        growthOutlook: 'High',
        requiredSkills: ['Video Editing', 'Storytelling', 'Social Media', 'Branding', 'Photography', 'SEO'],
        educationPath: ['Any stream 11-12', 'Mass Communication', 'Film School', 'Self-taught'],
        topColleges: ['IIMC Delhi', 'Symbiosis Pune', 'Xavier ICM Mumbai', 'FTII Pune'],
        matchingInterests: ['Arts & Design', 'Business & Finance'],
        matchingAptitudes: ['Creative Thinking', 'Communication'],
        matchingSubjects: ['Literature', 'Computer Applications'],
        industryDemand: 80,
        emergingTech: false,
        icon: 'Video',
        color: 'pink'
    },
    {
        id: 'space-tech',
        title: 'Space Technology Engineer',
        category: 'Aerospace',
        description: 'Design satellites, rockets, and space systems for ISRO and the booming private space industry in India.',
        salaryRange: { min: 700000, max: 3500000, currency: 'INR' },
        growthOutlook: 'Emerging',
        requiredSkills: ['Aerospace Engineering', 'Physics', 'CAD', 'Orbital Mechanics', 'Embedded Systems'],
        educationPath: ['PCM in Class 11-12', 'B.Tech Aerospace/Mechanical', 'M.Tech', 'ISRO/SpaceX'],
        topColleges: ['IIT Bombay', 'IIT Madras', 'IISc Bangalore', 'IIST Trivandrum'],
        matchingInterests: ['Engineering', 'Pure Sciences'],
        matchingAptitudes: ['Logical Reasoning', 'Analytical Skills', 'Hands-on Practical'],
        matchingSubjects: ['Physics', 'Mathematics', 'Chemistry'],
        industryDemand: 70,
        emergingTech: true,
        icon: 'Rocket',
        color: 'cyan'
    },
    {
        id: 'health-tech',
        title: 'Health-Tech Product Manager',
        category: 'Healthcare Technology',
        description: 'Bridge healthcare and technology by building digital health products that improve patient outcomes.',
        salaryRange: { min: 800000, max: 4000000, currency: 'INR' },
        growthOutlook: 'Very High',
        requiredSkills: ['Product Management', 'Healthcare Domain', 'Data Analytics', 'UX Design', 'Business Strategy'],
        educationPath: ['PCB/PCM in 11-12', 'B.Tech/MBBS', 'MBA Healthcare', 'Product certifications'],
        topColleges: ['IIM Ahmedabad', 'ISB Hyderabad', 'IIT Delhi', 'AIIMS + MBA'],
        matchingInterests: ['Medical / Biology', 'Computer Science', 'Business & Finance'],
        matchingAptitudes: ['Leadership', 'Analytical Skills', 'Communication'],
        matchingSubjects: ['Biology', 'Mathematics', 'Economics'],
        industryDemand: 85,
        emergingTech: true,
        icon: 'HeartPulse',
        color: 'red'
    },
    {
        id: 'agri-tech',
        title: 'Agri-Tech Innovator',
        category: 'Agriculture Technology',
        description: 'Use technology to revolutionize Indian agriculture — from precision farming to AI-powered crop management.',
        salaryRange: { min: 400000, max: 2500000, currency: 'INR' },
        growthOutlook: 'Emerging',
        requiredSkills: ['Agriculture Science', 'IoT', 'Data Science', 'Drone Tech', 'Business Development'],
        educationPath: ['PCB/PCM in 11-12', 'B.Tech Agricultural Eng.', 'M.Tech', 'Agri-startups'],
        topColleges: ['IARI Delhi', 'TNAU Coimbatore', 'GBPUAT Pantnagar', 'IIT Kharagpur'],
        matchingInterests: ['Engineering', 'Pure Sciences', 'Business & Finance'],
        matchingAptitudes: ['Hands-on Practical', 'Analytical Skills', 'Leadership'],
        matchingSubjects: ['Biology', 'Chemistry', 'Economics'],
        industryDemand: 68,
        emergingTech: true,
        icon: 'Sprout',
        color: 'lime'
    }
];

// Salary formatter for Indian format
export const formatSalary = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};
