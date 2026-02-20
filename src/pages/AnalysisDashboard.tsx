import React from 'react';
import { RotateCcw, ChevronRight } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import InterestSection from '../components/analysis/InterestSection';
import AptitudeSection from '../components/analysis/AptitudeSection';
import AcademicSection from '../components/analysis/AcademicSection';
import CareerDecisionSection from '../components/analysis/CareerDecision';
import RoadmapSection from '../components/analysis/RoadmapSection';
import StreamRecommend from '../components/analysis/StreamRecommend';
import CollegePlan from '../components/analysis/CollegePlan';

const SECTIONS = [
    { id: 'interest-analysis', label: 'Interests', num: 1 },
    { id: 'aptitude-eval', label: 'Aptitude', num: 2 },
    { id: 'academic-analysis', label: 'Academic', num: 3 },
    { id: 'career-decision', label: 'Careers', num: 4 },
    { id: 'career-roadmap', label: 'Roadmap', num: 5 },
    { id: 'stream-recommend', label: 'Stream', num: 6 },
    { id: 'college-plan', label: 'College', num: 7 },
];

const AnalysisDashboard: React.FC = () => {
    const { state, resetAll } = useAnalysis();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const completedSections = [
        state.interestResult ? 1 : 0,
        state.aptitudeResult ? 1 : 0,
        state.academicResult ? 1 : 0,
        state.decisionResult ? 1 : 0,
        state.roadmap ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    return (
        <div className="min-h-screen">
            {/* Sticky Section Nav */}
            <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6">
                <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
                    {SECTIONS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => scrollTo(s.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors whitespace-nowrap"
                        >
                            <span className="w-4 h-4 rounded text-[9px] bg-slate-100 text-slate-500 flex items-center justify-center font-bold">{s.num}</span>
                            {s.label}
                            <ChevronRight className="w-3 h-3 text-slate-300" />
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] font-bold text-slate-400">{completedSections}/5 complete</span>
                        <button onClick={resetAll} className="text-[10px] font-bold text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="px-6 lg:px-10 pt-8 pb-6">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    AI Career <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Analysis Engine</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">Complete each section to generate your personalized career intelligence report</p>

                {/* Progress */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${(completedSections / 5) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{Math.round((completedSections / 5) * 100)}%</span>
                </div>
            </div>

            {/* All Sections */}
            <div className="px-6 lg:px-10 pb-16 space-y-12">
                <div className="section-divider" />
                <InterestSection />

                <div className="section-divider" />
                <AptitudeSection />

                <div className="section-divider" />
                <AcademicSection />

                <div className="section-divider" />
                <CareerDecisionSection />

                {state.roadmap && (
                    <>
                        <div className="section-divider" />
                        <RoadmapSection />

                        <div className="section-divider" />
                        <StreamRecommend />

                        <div className="section-divider" />
                        <CollegePlan />
                    </>
                )}
            </div>
        </div>
    );
};

export default AnalysisDashboard;
