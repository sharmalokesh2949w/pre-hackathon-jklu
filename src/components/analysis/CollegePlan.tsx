import React from 'react';
import { GraduationCap, MapPin, Globe, CalendarCheck, Lightbulb } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const CollegePlan: React.FC = () => {
    const { state } = useAnalysis();
    const { roadmap } = state;

    if (!roadmap) return null;

    const indiaColleges = roadmap.colleges.filter((c) => c.type === 'India');
    const globalColleges = roadmap.colleges.filter((c) => c.type === 'Global');

    return (
        <section id="college-plan" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-500" />
                        College & Entrance Exam Plan
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Best colleges and target exams for your recommended stream</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">Section 7–9</span>
            </div>

            {/* Colleges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* India */}
                <div className="data-card p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Top Colleges — India
                    </h4>
                    <div className="space-y-2">
                        {indiaColleges.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{c.name}</p>
                                        <p className="text-[10px] text-slate-400">{c.location}</p>
                                    </div>
                                </div>
                                {c.ranking && (
                                    <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{c.ranking}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global */}
                <div className="data-card p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Top Colleges — Global
                    </h4>
                    <div className="space-y-2">
                        {globalColleges.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-md bg-teal-50 text-teal-600 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{c.name}</p>
                                        <p className="text-[10px] text-slate-400">{c.location}</p>
                                    </div>
                                </div>
                                {c.ranking && (
                                    <span className="text-[9px] font-bold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-md">{c.ranking}</span>
                                )}
                            </div>
                        ))}
                        {globalColleges.length === 0 && (
                            <p className="text-xs text-slate-400">No global recommendations for this stream.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Entrance Exams */}
            <div className="data-card p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5" /> Target Entrance Exams
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roadmap.entranceExams.map((exam, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-bold text-slate-800">{exam.name}</h5>
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">{exam.targetYear}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">Stream: {exam.stream}</p>
                            <div className="flex items-start gap-1.5 bg-amber-50 p-2 rounded-md">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-[10px] text-amber-700 font-medium">{exam.prepTip}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollegePlan;
