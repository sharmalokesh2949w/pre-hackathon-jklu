import React from 'react';
import { Compass, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-white/5 bg-slate-900/50 flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Compass className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Edu<span className="gradient-text">Path AI</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">{user?.role || 'Guest'}</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Assessment</a>
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Roadmaps</a>
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Mentor</a>
        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Resources</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 p-1.5 glass-card rounded-full border border-white/10 pr-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="text-white w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-300">{user?.name || 'User'}</span>
          </button>
          
          <button 
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
