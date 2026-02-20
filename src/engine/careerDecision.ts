import type {
    InterestAnalysisResult,
    AptitudeResult,
    AcademicResult,
    CareerRanking,
    CareerDecisionResult,
} from '../types/analysis';
import { CAREER_DATABASE, formatSalary } from '../utils/careerData';

// ── Interest Category → careerData mapping ────

const INTEREST_TO_CAREER: Record<string, string[]> = {
    Technology: ['Computer Science', 'Engineering'],
    Business: ['Business & Finance'],
    Arts: ['Arts & Design'],
    Medical: ['Medical / Biology'],
    Government: ['Law & Politics', 'Social Sciences'],
    Design: ['Arts & Design'],
    Research: ['Pure Sciences'],
    Engineering: ['Engineering'],
    Law: ['Law & Politics'],
    Media: ['Arts & Design', 'Business & Finance'],
};

// ── Aptitude Dimension → careerData mapping ───

const APTITUDE_TO_CAREER: Record<string, string[]> = {
    'Logical Reasoning': ['Logical Reasoning'],
    'Numerical Ability': ['Analytical Skills', 'Logical Reasoning'],
    Communication: ['Communication'],
    Creativity: ['Creative Thinking'],
    Leadership: ['Leadership'],
    'Analytical Ability': ['Analytical Skills'],
};

// ── Academic Subject → careerData subjects ─────

const SUBJECT_TO_CAREER: Record<string, string[]> = {
    Mathematics: ['Mathematics'],
    Physics: ['Physics'],
    Chemistry: ['Chemistry'],
    Biology: ['Biology'],
    English: ['Literature'],
    Hindi: ['Literature'],
    History: ['History / Civics'],
    Geography: ['History / Civics'],
    Economics: ['Economics'],
    'Computer Science': ['Computer Applications'],
    'Political Science': ['History / Civics'],
    Accountancy: ['Economics'],
    'Business Studies': ['Economics'],
};

// ── Stream inference from career ──────────────

const CAREER_STREAM: Record<string, string> = {
    Technology: 'Science (PCM)',
    'Life Sciences': 'Science (PCB)',
    'Healthcare Technology': 'Science (PCB/PCM)',
    Aerospace: 'Science (PCM)',
    'Green Technology': 'Science (PCM)',
    'Agriculture Technology': 'Science (PCB)',
    Design: 'Arts / Science',
    'Creative & Media': 'Arts',
    'Law & Governance': 'Any Stream',
    'Sports & Fitness': 'Any Stream',
};

// ── Core Decision Engine ──────────────────────

export const generateCareerDecision = (
    interestResult: InterestAnalysisResult | null,
    aptitudeResult: AptitudeResult | null,
    academicResult: AcademicResult | null
): CareerDecisionResult => {
    const rankings: CareerRanking[] = CAREER_DATABASE.map((career, _idx) => {
        // ── Interest Score (40%) ──
        let interestScore = 0;
        if (interestResult && interestResult.entries.length > 0) {
            const careerInterests = career.matchingInterests ?? [];
            const matchingEntries = interestResult.entries.filter((e) => {
                const mapped = INTEREST_TO_CAREER[e.category] ?? [];
                return careerInterests.some((ci) => mapped.includes(ci));
            });
            const totalWeight = matchingEntries.reduce((s, e) => s + e.weight, 0);
            const maxWeight = interestResult.entries.length * 10;
            interestScore = maxWeight > 0 ? (totalWeight / maxWeight) * 100 : 30;
        } else {
            interestScore = 30;
        }

        // ── Aptitude Score (30%) ──
        let aptitudeScore = 0;
        if (aptitudeResult && aptitudeResult.scores.length > 0) {
            const careerAptitudes = career.matchingAptitudes ?? [];
            const matchingScores = aptitudeResult.scores.filter((s) => {
                const mapped = APTITUDE_TO_CAREER[s.dimension] ?? [];
                return careerAptitudes.some((ca) => mapped.includes(ca));
            });
            const totalScore = matchingScores.reduce((sum, s) => sum + s.score, 0);
            const maxScore = matchingScores.length * 10;
            aptitudeScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 30;
        } else {
            aptitudeScore = 30;
        }

        // ── Academic Score (30%) ──
        let academicScore = 0;
        if (academicResult && academicResult.trends.length > 0) {
            const careerSubjects = career.matchingSubjects ?? [];
            const matchingTrends = academicResult.trends.filter((t) => {
                const mapped = SUBJECT_TO_CAREER[t.subject] ?? [];
                return careerSubjects.some((cs) => mapped.includes(cs));
            });
            if (matchingTrends.length > 0) {
                academicScore =
                    matchingTrends.reduce((sum, t) => sum + t.averageMarks, 0) / matchingTrends.length;
            } else {
                academicScore = 30;
            }
        } else {
            academicScore = 30;
        }

        // ── Combined Score (40/30/30) ──
        const matchScore = Math.round(
            interestScore * 0.4 + aptitudeScore * 0.3 + academicScore * 0.3
        );

        // ── Reasoning ──
        const reasons: string[] = [];
        if (interestScore >= 60) reasons.push(`Strong interest alignment (${Math.round(interestScore)}%)`);
        if (aptitudeScore >= 60) reasons.push(`Aptitude match in key areas (${Math.round(aptitudeScore)}%)`);
        if (academicScore >= 60) reasons.push(`Academic strength in relevant subjects (${Math.round(academicScore)}%)`);
        if (career.emergingTech) reasons.push('High-growth emerging field');
        if (career.industryDemand >= 80) reasons.push(`Strong industry demand (${career.industryDemand}%)`);
        if (reasons.length === 0) reasons.push('Explore this career path to discover new opportunities');

        const stream = CAREER_STREAM[career.category] ?? 'Any Stream';
        const salaryRange = `${formatSalary(career.salaryRange.min)} – ${formatSalary(career.salaryRange.max)}`;

        return {
            rank: 0,
            careerId: career.id,
            title: career.title,
            matchScore: Math.max(20, Math.min(100, matchScore)),
            interestScore: Math.round(interestScore),
            aptitudeScore: Math.round(aptitudeScore),
            academicScore: Math.round(academicScore),
            reasoning: reasons.join('. ') + '.',
            stream,
            category: career.category,
            salaryRange,
            demand: career.industryDemand,
            icon: career.icon,
            color: career.color,
        };
    });

    // Sort and rank
    rankings.sort((a, b) => b.matchScore - a.matchScore);
    rankings.forEach((r, i) => (r.rank = i + 1));

    // Determine recommended stream
    const streamVotes: Record<string, number> = {};
    rankings.slice(0, 5).forEach((r) => {
        streamVotes[r.stream] = (streamVotes[r.stream] ?? 0) + (6 - r.rank);
    });

    const streamEntries = Object.entries(streamVotes).sort((a, b) => b[1] - a[1]);
    const recommendedStream = streamEntries[0]?.[0] ?? 'Science (PCM)';

    // Stream confidence
    const totalVotes = streamEntries.reduce((s, [, v]) => s + v, 0);
    const streamConfidence: Record<string, number> = {};
    streamEntries.forEach(([stream, votes]) => {
        streamConfidence[stream] = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    });

    return { rankings: rankings.slice(0, 5), recommendedStream, streamConfidence };
};
