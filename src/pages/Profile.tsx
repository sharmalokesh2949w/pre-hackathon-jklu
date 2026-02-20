import React from 'react';
import { 
  User, 
  Target, 
  Zap, 
  Heart, 
  Award, 
  ShieldCheck, 
  FileText,
  Share2
} from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Avatar Section */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-1 shadow-xl shadow-sky-500/20">
            <div className="w-full h-full rounded-[20px] bg-slate-900 flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-sky-400" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Alex Jenkins</h2>
            <p className="text-slate-400 text-sm">Class 11-A | Science</p>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex flex-col items-center px-3 py-2 glass-card rounded-xl">
              <span className="text-xs font-bold text-sky-400">12</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Streak</span>
            </div>
            <div className="flex flex-col items-center px-3 py-2 glass-card rounded-xl">
              <span className="text-xs font-bold text-sky-400">Level 4</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Rank</span>
            </div>
          </div>
        </div>

        {/* AI Career Twin Stats */}
        <div className="flex-1 space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Target className="text-sky-400 w-5 h-5" />
                Multi-Dimensional Profile
              </h3>
              <span className="text-xs text-slate-500 italic">Last Sync: 2 hours ago</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Aptitude', value: 'Logical-Mathematical', score: 92, icon: Target },
                { label: 'Interests', value: 'Technology & Design', score: 85, icon: Heart },
                { label: 'Learning Style', value: 'Visual-Kinesthetic', score: 78, icon: Zap },
                { label: 'Personality', value: 'Architect (INTJ-T)', score: 88, icon: User },
              ].map((trait, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <trait.icon className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-bold text-slate-300">{trait.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xs font-medium text-slate-400">{trait.value}</span>
                    <span className="text-xs font-bold text-sky-400">{trait.score}% Match</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: `${trait.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl bg-indigo-500/5 border-indigo-500/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="text-indigo-400 w-5 h-5" />
              Achievements & Digital Badges
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Fast Learner', desc: 'Completed SQL basics in 2 days' },
                { name: 'Clarity Seeker', desc: 'Interacted with 5+ career paths' },
                { name: 'Logic Master', desc: 'Top 5% in regional aptitude' },
              ].map((badge, i) => (
                <div key={i} className="flex-1 min-w-[150px] p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2">
                    <Award className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{badge.name}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{badge.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="text-emerald-400 w-5 h-5" />
              Privacy & Data Control
            </h3>
            <button className="text-xs text-sky-400 font-bold hover:underline">Manage Settings</button>
          </div>
          <p className="text-sm text-slate-400 mb-6">Your data is secured with end-to-end encryption. Only counselors you approve can view your full assessment.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm text-slate-300">Share Report with Parents</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm text-slate-300">Allow Teacher Feedback</span>
              <div className="w-10 h-5 bg-slate-700 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="text-amber-400 w-5 h-5" />
            Parent-Friendly Summary
          </h3>
          <p className="text-sm text-slate-400 mb-6">AI-generated non-technical insights to help your parents understand your strengths.</p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 italic text-sm text-slate-300">
            "Alex shows exceptional logical reasoning and a natural affinity for complex problem-solving. While academic marks in Math are high, the AI detects a 'Creativity-Logic' hybrid which is perfect for modern roles like Generative AI Design or Robotics Engineering."
          </div>
          <button className="w-full mt-4 py-3 rounded-2xl bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Email Report to Parents
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
