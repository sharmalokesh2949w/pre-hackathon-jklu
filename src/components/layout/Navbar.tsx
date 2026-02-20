import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-6 lg:px-10 h-14">
        <div className="flex items-center gap-5">
          <h1 className="lg:hidden text-lg font-extrabold text-slate-800">
            Career<span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Cube</span>
          </h1>
          <nav className="hidden md:flex items-center gap-0.5">
            {user?.role === 'counsellor' ? (
              <NavLink to="/" end className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                Dashboard
              </NavLink>
            ) : (
              [
                { path: '/', label: 'AI Analysis' },
                { path: '/dashboard', label: 'Dashboard' },
                { path: '/mentor', label: 'AI Mentor' },
                { path: '/roadmap', label: 'Roadmap' },
              ].map(({ path, label }) => (
                <NavLink key={path} to={path} end={path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                  {label}
                </NavLink>
              ))
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors relative">
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-700">{user?.name || 'Student'}</p>
              <p className="text-[9px] text-slate-400 font-medium">{user?.role || 'student'}</p>
            </div>
          </div>

          <button onClick={logout} className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors group" title="Logout">
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
