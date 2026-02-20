import React from 'react';
import { User, Target, Zap, Heart, Award, ShieldCheck, FileText, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mapProfileToCareer } from '../utils/careerUtils';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const profile = user?.profile || {};
  const career = mapProfileToCareer(profile);

  const profileTraits = [
    { label: 'Aptitude', value: profile.aptitude?.[0] || 'Logical-Mathematical', score: 92, icon: Target },
    { label: 'Interests', value: profile.interests?.[0] || 'Technology & Design', score: 85, icon: Heart },
    { label: 'Learning Style', value: profile.learningStyle || 'Visual-Kinesthetic', score: 78, icon: Zap },
    { label: 'Personality', value: 'Architect (INTJ-T)', score: 88, icon: User },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-teal-500 p-1 shadow-xl shadow-indigo-200">
            <div className="w-full h-full rounded-[20px] bg-white flex items-center justify-center">
              <User className="w-16 h-16 text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-slate-800">{user?.name || 'User'}</h2>
            <p className="text-slate-400 text-sm uppercase font-bold tracking-wider">{user?.role || 'Student'}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex flex-col items-center px-3 py-2 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-indigo-500">12</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Streak</span>
            </div>
            <div className="flex flex-col items-center px-3 py-2 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-indigo-500">Level 4</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Rank</span>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex-1 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Target className="text-indigo-500 w-5 h-5" />
                Multi-Dimensional Profile
              </h3>
              <span className="text-xs text-slate-400 italic">Last Sync: Live</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileTraits.map((trait, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <trait.icon className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-bold text-slate-600">{trait.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xs font-medium text-slate-500">{trait.value}</span>
                    <span className="text-xs font-bold text-indigo-500">{trait.score}% Match</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full" style={{ width: `${trait.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-indigo-50/50 border-indigo-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Award className="text-indigo-500 w-5 h-5" />
              Achievements & Badges
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Fast Learner', desc: 'Completed SQL basics in 2 days' },
                { name: 'Clarity Seeker', desc: 'Explored 5+ career paths' },
                { name: 'Logic Master', desc: 'Top 5% in aptitude' },
              ].map((badge, i) => (
                <div key={i} className="flex-1 min-w-[150px] p-3 rounded-2xl bg-white border border-slate-200 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <Award className="w-6 h-6 text-indigo-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{badge.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{badge.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500 w-5 h-5" />
              Privacy & Data Control
            </h3>
            <button className="text-xs text-indigo-500 font-bold hover:underline">Manage Settings</button>
          </div>
          <p className="text-sm text-slate-500 mb-6">Your data is secured with encryption. Only approved counselors can view your assessment.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-sm text-slate-600">Share Report with Parents</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-sm text-slate-600">Allow Teacher Feedback</span>
              <div className="w-10 h-5 bg-slate-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
            <FileText className="text-amber-500 w-5 h-5" />
            Parent-Friendly Summary
          </h3>
          <p className="text-sm text-slate-500 mb-6">AI-generated insights to help your parents understand your strengths.</p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 italic text-sm text-slate-600">
            "{user?.name?.split(' ')[0] || 'The student'} shows exceptional logical reasoning and a natural affinity for problem-solving. The AI detects a perfect fit for a career in {career.title}."
          </div>
          <button className="w-full mt-4 py-3 rounded-2xl bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-200 flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors">
            <Share2 className="w-4 h-4" />
            Email Report to Parents
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
