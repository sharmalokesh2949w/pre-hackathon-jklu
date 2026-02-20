import React from 'react';
import { Map, BookOpen, Award, Briefcase, Code, GraduationCap, Target, FileCheck } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const TYPE_ICONS: Record<string, React.ElementType> = {
    focus: BookOpen,
    improve: Target,
    exam: FileCheck,
    college: GraduationCap,
    skill: Code,
    intern: Briefcase,
    cert: Award,
};

const TYPE_COLORS: Record<string, string> = {
    focus: 'bg-indigo-50 text-indigo-600',
    improve: 'bg-amber-50 text-amber-600',
    exam: 'bg-red-50 text-red-600',
    college: 'bg-teal-50 text-teal-600',
    skill: 'bg-purple-50 text-purple-600',
    intern: 'bg-emerald-50 text-emerald-600',
    cert: 'bg-cyan-50 text-cyan-600',
};

const RoadmapSection: React.FC = () => {
    const { state } = useAnalysis();
    const { roadmap } = state;

    if (!roadmap) return null;

    return (
        <section id="career-roadmap" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Map className="w-5 h-5 text-indigo-500" />
                        AI-Generated Career Roadmap
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Your personalized 5-phase strategic career plan</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">Section 5</span>
            </div>

            {/* Stream Badge */}
            <div className="data-card p-5 flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Stream</h4>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{roadmap.stream}</p>
                </div>
                <div className="text-right">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject Strategy</h4>
                    <div className="flex gap-2 mt-1.5">
                        {roadmap.subjectStrategy.focus.slice(0, 3).map((s) => (
                            <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-semibold">{s}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Phases */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

                <div className="space-y-6">
                    {roadmap.phases.map((phase, pi) => (
                        <div key={pi} className="relative pl-14">
                            {/* Phase marker */}
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md z-10">
                                {pi + 1}
                            </div>

                            <div className="data-card p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-extrabold text-slate-800">{phase.phase}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{phase.timeframe}</span>
                                </div>

                                <div className="space-y-2">
                                    {phase.items.map((item, ii) => {
                                        const IconComp = TYPE_ICONS[item.type] ?? BookOpen;
                                        const colorClass = TYPE_COLORS[item.type] ?? 'bg-slate-50 text-slate-600';
                                        return (
                                            <div key={ii} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                                <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                                                    <IconComp className="w-3.5 h-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certifications & Internships */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="data-card p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Certifications</h4>
                    <div className="space-y-2">
                        {roadmap.certifications.map((c, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 bg-cyan-50 rounded-lg">
                                <Award className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                                <span className="text-xs font-medium text-cyan-800">{c}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="data-card p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Internship Suggestions</h4>
                    <div className="space-y-2">
                        {roadmap.internshipSuggestions.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg">
                                <Briefcase className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <span className="text-xs font-medium text-emerald-800">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;
