import React from 'react';
import { 
  Clock, 
  BookOpen, 
  Star,
  ChevronRight,
  Link as LinkIcon
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { mapProfileToCareer } from '../utils/careerUtils';

const Roadmap: React.FC = () => {
  const { user } = useAuth();
  const career = mapProfileToCareer(user?.profile);
  const steps = career.roadmapPhases.map((phase, idx) => ({
    ...phase,
    status: idx === 0 ? 'Current' : 'Coming Soon'
  }));

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Your <span className="gradient-text">Success Roadmap</span></h2>
          <p className="text-slate-400">Personalized path for <span className="text-sky-400 italic">{career.title}</span></p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Estimated: 6 Years (To Career)</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-800 rounded-full"></div>
        
        <div className="space-y-12">
          {steps.map((phase, i) => (
            <div key={i} className="relative pl-16">
              <div className={`absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-slate-900 z-10 ${
                phase.status === 'Current' ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]' : 'bg-slate-700'
              }`}></div>
              
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold">{phase.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  phase.status === 'Current' ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {phase.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.items.map((item, j) => (
                  <div key={j} className="glass-card p-5 rounded-2xl group hover:border-sky-500/30 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${item.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      {item.completed && (
                        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-lg uppercase">
                          Done
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold mb-1 group-hover:text-sky-400 transition-colors uppercase text-sm tracking-tight">{item.label}</h4>
                    <p className="text-xs text-slate-400 mb-4">{item.detail}</p>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                      Learn More <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-white/5">
        <div className="glass-card p-6 rounded-3xl bg-amber-500/5 border-amber-500/10">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-amber-400 w-6 h-6" />
            <h3 className="text-lg font-bold text-amber-100 uppercase tracking-tight">Alternative Paths</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">Not just IITs—here are other high-growth routes for your profile:</p>
          <div className="space-y-3">
            {[
              { title: 'Global Bachelor Programs', desc: 'Tech Universities in Germany/USA' },
              { title: 'Fullstack Specialization', desc: 'Accelerated bootcamp + startup internship' },
              { title: 'Vocational AI Training', desc: 'Certified data analyst roles (Age 18+)' },
            ].map((path, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors">{path.title}</h4>
                  <p className="text-xs text-slate-500">{path.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <LinkIcon className="text-sky-400 w-6 h-6" />
            <h3 className="text-lg font-bold uppercase tracking-tight">Micro-Skills Radar</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">Master these to stay ahead of the curve:</p>
          <div className="flex flex-wrap gap-2">
            {['Critical Thinking', 'Public Speaking', 'Financial Literacy', 'Basic UI/UX', 'Prompt Engineering', 'Git/Github', 'Project Mgmt'].map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-medium text-slate-300 hover:border-sky-500/30 transition-all cursor-default uppercase tracking-tight">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase">Skill Gap: Logic vs Industry</span>
              <span className="text-xs font-bold text-slate-400">12% Remaining</span>
            </div>
            <div className="mt-2 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-[88%] h-full bg-sky-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
