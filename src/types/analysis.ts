// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CareerCube AI — Analysis Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Interest Analysis ──────────────────────────

export type InterestCategory =
  | 'Technology'
  | 'Business'
  | 'Arts'
  | 'Medical'
  | 'Government'
  | 'Design'
  | 'Research'
  | 'Engineering'
  | 'Law'
  | 'Media';

export interface InterestEntry {
  category: InterestCategory;
  weight: number; // 1–10
}

export interface InterestCluster {
  name: string;
  categories: InterestCategory[];
  strength: number; // 0–100
}

export interface InterestAnalysisResult {
  entries: InterestEntry[];
  top3: InterestEntry[];
  clusters: InterestCluster[];
  dominantCluster: string;
  chartData: { category: string; strength: number }[];
}

// ── Aptitude Evaluation ────────────────────────

export type AptitudeDimension =
  | 'Logical Reasoning'
  | 'Numerical Ability'
  | 'Communication'
  | 'Creativity'
  | 'Leadership'
  | 'Analytical Ability';

export type AptitudeLevel = 'Strong' | 'Moderate' | 'Weak';

export interface AptitudeScore {
  dimension: AptitudeDimension;
  score: number; // 1–10
  level: AptitudeLevel;
}

export interface AptitudeResult {
  scores: AptitudeScore[];
  careerDomainMap: { domain: string; matchingAptitudes: AptitudeDimension[] }[];
  radarData: { dimension: string; value: number }[];
}

// ── Academic Performance ───────────────────────

export interface SubjectMark {
  subject: string;
  marks: number; // 0–100
}

export interface SubjectYear {
  year: number; // 1, 2, 3
  label: string; // e.g. "Class 8"
  subjects: SubjectMark[];
}

export interface SubjectTrend {
  subject: string;
  averageMarks: number;
  trend: 'improving' | 'declining' | 'stable';
  yearWise: { year: number; marks: number }[];
}

export interface AcademicResult {
  years: SubjectYear[];
  trends: SubjectTrend[];
  strongSubjects: string[];
  weakSubjects: string[];
  dominantArea: string;
  comparisonChartData: { subject: string; [key: string]: string | number }[];
  trendChartData: { year: string; [key: string]: string | number }[];
}

// ── Career Decision ────────────────────────────

export interface CareerRanking {
  rank: number;
  careerId: string;
  title: string;
  matchScore: number; // 0–100
  interestScore: number;
  aptitudeScore: number;
  academicScore: number;
  reasoning: string;
  stream: string;
  category: string;
  salaryRange: string;
  demand: number;
  icon: string;
  color: string;
}

export interface CareerDecisionResult {
  rankings: CareerRanking[];
  recommendedStream: string;
  streamConfidence: Record<string, number>;
}

// ── Career Roadmap ─────────────────────────────

export interface RoadmapItem {
  title: string;
  detail: string;
  type: 'focus' | 'improve' | 'exam' | 'college' | 'skill' | 'intern' | 'cert';
}

export interface RoadmapPhase {
  phase: string;
  timeframe: string;
  items: RoadmapItem[];
}

export interface CollegeSuggestion {
  name: string;
  location: string;
  type: 'India' | 'Global';
  stream: string;
  ranking?: string;
}

export interface EntranceExam {
  name: string;
  targetYear: string;
  stream: string;
  prepTip: string;
}

export interface CareerRoadmap {
  stream: string;
  phases: RoadmapPhase[];
  colleges: CollegeSuggestion[];
  entranceExams: EntranceExam[];
  certifications: string[];
  internshipSuggestions: string[];
  subjectStrategy: {
    focus: string[];
    improve: string[];
  };
}

// ── Combined Output ────────────────────────────

export interface FullAnalysisOutput {
  primaryInterestAnalysis: InterestAnalysisResult;
  aptitudeSummary: AptitudeResult;
  academicTrendAnalysis: AcademicResult;
  recommendedStreams: string[];
  careerRankings: CareerRanking[];
  careerRoadmap: CareerRoadmap;
}

// ── Analysis State ─────────────────────────────

export interface AnalysisState {
  interests: InterestEntry[];
  aptitudes: AptitudeScore[];
  academics: SubjectYear[];
  interestResult: InterestAnalysisResult | null;
  aptitudeResult: AptitudeResult | null;
  academicResult: AcademicResult | null;
  decisionResult: CareerDecisionResult | null;
  roadmap: CareerRoadmap | null;
  currentStep: number;
  isComplete: boolean;
}
