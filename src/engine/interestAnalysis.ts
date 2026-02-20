import type {
    InterestEntry,
    InterestCategory,
    InterestCluster,
    InterestAnalysisResult,
} from '../types/analysis';

// ── Cluster Definitions ───────────────────────

const CLUSTER_MAP: Record<string, InterestCategory[]> = {
    'STEM & Innovation': ['Technology', 'Engineering', 'Research'],
    'Healthcare & Life Sciences': ['Medical', 'Research'],
    'Business & Management': ['Business', 'Government'],
    'Creative & Design': ['Arts', 'Design', 'Media'],
    'Legal & Public Service': ['Law', 'Government'],
};

// ── Core Analysis ─────────────────────────────

export const analyzeInterests = (entries: InterestEntry[]): InterestAnalysisResult => {
    if (!entries || entries.length === 0) {
        return {
            entries: [],
            top3: [],
            clusters: [],
            dominantCluster: 'None',
            chartData: [],
        };
    }

    // Sort by weight descending
    const sorted = [...entries].sort((a, b) => b.weight - a.weight);
    const top3 = sorted.slice(0, 3);

    // Build chart data
    const chartData = sorted.map((e) => ({
        category: e.category,
        strength: Math.round((e.weight / 10) * 100),
    }));

    // Calculate cluster strengths
    const clusters: InterestCluster[] = Object.entries(CLUSTER_MAP).map(
        ([name, categories]) => {
            const matching = entries.filter((e) => categories.includes(e.category));
            const totalWeight = matching.reduce((sum, e) => sum + e.weight, 0);
            const maxPossible = categories.length * 10;
            const strength = maxPossible > 0 ? Math.round((totalWeight / maxPossible) * 100) : 0;
            return { name, categories, strength };
        }
    );

    clusters.sort((a, b) => b.strength - a.strength);
    const dominantCluster = clusters[0]?.name ?? 'None';

    return { entries: sorted, top3, clusters, dominantCluster, chartData };
};

// ── Available Categories ──────────────────────

export const ALL_INTEREST_CATEGORIES: InterestCategory[] = [
    'Technology',
    'Business',
    'Arts',
    'Medical',
    'Government',
    'Design',
    'Research',
    'Engineering',
    'Law',
    'Media',
];
