import type { SubjectYear, SubjectTrend, AcademicResult } from '../types/analysis';

// ── Subject → Academic Area Map ───────────────

const AREA_MAP: Record<string, string[]> = {
    'Science (PCM)': ['Mathematics', 'Physics', 'Chemistry'],
    'Science (PCB)': ['Physics', 'Chemistry', 'Biology'],
    'Commerce': ['Mathematics', 'Economics', 'Accountancy', 'Business Studies'],
    'Humanities': ['History', 'Geography', 'Political Science', 'Sociology', 'Literature', 'Hindi', 'English'],
    'Computer Science': ['Computer Science', 'Computer Applications', 'Information Technology'],
};

// ── Core Analysis ─────────────────────────────

export const analyzeAcademics = (years: SubjectYear[]): AcademicResult => {
    if (!years || years.length === 0) {
        return {
            years: [],
            trends: [],
            strongSubjects: [],
            weakSubjects: [],
            dominantArea: 'Undetermined',
            comparisonChartData: [],
            trendChartData: [],
        };
    }

    // Collect all unique subjects
    const allSubjects = new Set<string>();
    years.forEach((y) => y.subjects.forEach((s) => allSubjects.add(s.subject)));

    // Calculate trends per subject
    const trends: SubjectTrend[] = Array.from(allSubjects).map((subject) => {
        const yearWise: { year: number; marks: number }[] = [];

        years.forEach((y) => {
            const found = y.subjects.find((s) => s.subject === subject);
            if (found) {
                yearWise.push({ year: y.year, marks: found.marks });
            }
        });

        const avgMarks =
            yearWise.length > 0
                ? Math.round(yearWise.reduce((sum, yw) => sum + yw.marks, 0) / yearWise.length)
                : 0;

        // Determine trend
        let trend: 'improving' | 'declining' | 'stable' = 'stable';
        if (yearWise.length >= 2) {
            const first = yearWise[0].marks;
            const last = yearWise[yearWise.length - 1].marks;
            const diff = last - first;
            if (diff > 5) trend = 'improving';
            else if (diff < -5) trend = 'declining';
        }

        return { subject, averageMarks: avgMarks, trend, yearWise };
    });

    // Sort by average
    const sorted = [...trends].sort((a, b) => b.averageMarks - a.averageMarks);
    const strongSubjects = sorted.filter((t) => t.averageMarks >= 70).map((t) => t.subject);
    const weakSubjects = sorted.filter((t) => t.averageMarks < 50).map((t) => t.subject);

    // Find dominant area
    let dominantArea = 'General';
    let bestAreaScore = 0;

    Object.entries(AREA_MAP).forEach(([area, subjects]) => {
        const areaSubjects = trends.filter((t) => subjects.includes(t.subject));
        if (areaSubjects.length > 0) {
            const areaAvg =
                areaSubjects.reduce((sum, s) => sum + s.averageMarks, 0) / areaSubjects.length;
            if (areaAvg > bestAreaScore && areaSubjects.length >= 2) {
                bestAreaScore = areaAvg;
                dominantArea = area;
            }
        }
    });

    // Build comparison chart data (bar chart — subject per year)
    const comparisonChartData = Array.from(allSubjects).map((subject) => {
        const row: Record<string, string | number> = { subject };
        years.forEach((y) => {
            const found = y.subjects.find((s) => s.subject === subject);
            row[y.label] = found ? found.marks : 0;
        });
        return row;
    });

    // Build trend chart data (line chart — year as x, subjects as lines)
    const trendChartData = years.map((y) => {
        const row: Record<string, string | number> = { year: y.label };
        y.subjects.forEach((s) => {
            row[s.subject] = s.marks;
        });
        return row;
    });

    return {
        years,
        trends,
        strongSubjects,
        weakSubjects,
        dominantArea,
        comparisonChartData,
        trendChartData,
    };
};

// ── Common Subjects ───────────────────────────

export const COMMON_SUBJECTS = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Hindi',
    'History',
    'Geography',
    'Economics',
    'Computer Science',
    'Political Science',
    'Accountancy',
    'Business Studies',
];
