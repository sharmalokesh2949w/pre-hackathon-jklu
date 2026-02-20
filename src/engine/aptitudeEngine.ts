import type {
    AptitudeScore,
    AptitudeDimension,
    AptitudeLevel,
    AptitudeResult,
} from '../types/analysis';

// ── Aptitude → Career Domain Map ──────────────

const DOMAIN_APTITUDE_MAP: { domain: string; aptitudes: AptitudeDimension[] }[] = [
    { domain: 'Technology & Engineering', aptitudes: ['Logical Reasoning', 'Analytical Ability', 'Numerical Ability'] },
    { domain: 'Medical & Life Sciences', aptitudes: ['Analytical Ability', 'Numerical Ability'] },
    { domain: 'Business & Finance', aptitudes: ['Numerical Ability', 'Leadership', 'Communication'] },
    { domain: 'Creative & Design', aptitudes: ['Creativity', 'Communication'] },
    { domain: 'Legal & Government', aptitudes: ['Communication', 'Logical Reasoning', 'Leadership'] },
    { domain: 'Research & Academia', aptitudes: ['Analytical Ability', 'Logical Reasoning'] },
    { domain: 'Media & Communication', aptitudes: ['Communication', 'Creativity', 'Leadership'] },
    { domain: 'Management & Consulting', aptitudes: ['Leadership', 'Analytical Ability', 'Communication'] },
];

// ── Helpers ───────────────────────────────────

export const getLevel = (score: number): AptitudeLevel => {
    if (score >= 7) return 'Strong';
    if (score >= 4) return 'Moderate';
    return 'Weak';
};

// ── Core Analysis ─────────────────────────────

export const evaluateAptitude = (scores: AptitudeScore[]): AptitudeResult => {
    if (!scores || scores.length === 0) {
        return {
            scores: [],
            careerDomainMap: [],
            radarData: [],
        };
    }

    // Ensure levels are calculated
    const enriched: AptitudeScore[] = scores.map((s) => ({
        ...s,
        level: getLevel(s.score),
    }));

    // Radar data for chart
    const radarData = enriched.map((s) => ({
        dimension: s.dimension.replace(' Ability', '').replace(' Reasoning', ''),
        value: s.score * 10, // scale to 0–100
    }));

    // Match domains
    const careerDomainMap = DOMAIN_APTITUDE_MAP.map(({ domain, aptitudes }) => {
        const strongAptitudes = aptitudes.filter((apt) => {
            const found = enriched.find((s) => s.dimension === apt);
            return found && found.score >= 5;
        });
        return {
            domain,
            matchingAptitudes: strongAptitudes,
            matchStrength: aptitudes.length > 0
                ? Math.round((strongAptitudes.length / aptitudes.length) * 100)
                : 0,
        };
    })
        .filter((d) => d.matchStrength > 0)
        .sort((a, b) => b.matchStrength - a.matchStrength)
        .map(({ domain, matchingAptitudes }) => ({ domain, matchingAptitudes }));

    return { scores: enriched, careerDomainMap, radarData };
};

// ── All Dimensions ────────────────────────────

export const ALL_APTITUDE_DIMENSIONS: AptitudeDimension[] = [
    'Logical Reasoning',
    'Numerical Ability',
    'Communication',
    'Creativity',
    'Leadership',
    'Analytical Ability',
];
