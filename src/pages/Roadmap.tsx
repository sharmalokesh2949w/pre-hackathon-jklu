import React from 'react';
import { Clock, BookOpen, Star, ChevronRight, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mapProfileToCareer } from '../utils/careerUtils';
import { motion } from 'framer-motion';

const Roadmap: React.FC = () => {
  const { user } = useAuth();
  const career = mapProfileToCareer(user?.profile);
  const steps = career.roadmapPhases.map((phase, idx) => ({
    ...phase,
    status: idx === 0 ? 'Current' : 'Coming Soon'
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Your <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Success Roadmap</span></h2>
          <p className="text-slate-500">Personalized path for <span className="text-indigo-500 italic font-semibold">{career.title}</span></p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Estimated: 6 Years</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 rounded-full"></div>

        <div className="space-y-12">
          {steps.map((phase, i) => (
            <div key={i} className="relative pl-16">
              <div className={`absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-white z-10 shadow-md ${phase.status === 'Current' ? 'bg-indigo-500' : 'bg-slate-300'
                }`}></div>

              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-slate-800">{phase.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${phase.status === 'Current' ? 'bg-indigo-50 text-indigo-500 border border-indigo-200' : 'bg-slate-100 text-slate-400'
                  }`}>
                  {phase.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.items.map((item, j) => (
                  <div key={j} className="card p-5 group hover:border-indigo-200 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${item.completed ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      {item.completed && (
                        <div className="px-2 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold rounded-lg uppercase border border-emerald-200">
                          Done
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold mb-1 group-hover:text-indigo-500 transition-colors text-sm text-slate-700">{item.label}</h4>
                    <p className="text-xs text-slate-400 mb-4">{item.detail}</p>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">
                      Learn More <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-slate-200">
        <div className="card p-6 bg-amber-50/50 border-amber-100">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-amber-500 w-6 h-6" />
            <h3 className="text-lg font-bold text-slate-800">Alternative Paths</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Not just IITs—here are other high-growth routes for your profile:</p>
          <div className="space-y-3">
            {[
              { title: 'Global Bachelor Programs', desc: 'Tech Universities in Germany/USA' },
              { title: 'Fullstack Specialization', desc: 'Bootcamp + startup internship' },
              { title: 'Vocational AI Training', desc: 'Certified data analyst roles (Age 18+)' },
            ].map((path, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-amber-100/50 transition-colors cursor-pointer group">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                <div>
                  <h4 className="font-bold text-sm text-slate-700 group-hover:text-amber-600 transition-colors">{path.title}</h4>
                  <p className="text-xs text-slate-500">{path.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <LinkIcon className="text-indigo-500 w-6 h-6" />
            <h3 className="text-lg font-bold text-slate-800">Micro-Skills Radar</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6">Master these to stay ahead of the curve:</p>
          <div className="flex flex-wrap gap-2">
            {['Critical Thinking', 'Public Speaking', 'Financial Literacy', 'Basic UI/UX', 'Prompt Engineering', 'Git/Github', 'Project Mgmt'].map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-300 transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-500 uppercase">Skill Gap: Logic vs Industry</span>
              <span className="text-xs font-bold text-slate-500">12% Remaining</span>
            </div>
            <div className="mt-2 w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div className="w-[88%] h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Roadmap;
