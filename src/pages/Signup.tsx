import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Briefcase, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'student' | 'counsellor'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('All fields are required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    const result = await signup(name, email, password, role);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-teal-50/30 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-200 mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">
            Career<span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Cube</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">AI Career Intelligence Platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Create your account</h2>
            <p className="text-slate-400 text-sm mt-1">Start your AI-powered career journey</p>
          </div>

          {/* Role Selection */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">I am a</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { r: 'student' as const, icon: GraduationCap, label: 'Student', desc: 'Career guidance & tools' },
                { r: 'counsellor' as const, icon: Briefcase, label: 'Counsellor', desc: 'Manage & guide students' },
              ].map(({ r, icon: Icon, label, desc }) => (
                <motion.button key={r} type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setRole(r)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${role === r ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-200'}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${role === r ? 'bg-indigo-500' : 'bg-slate-100'}`}>
                    <Icon className={`w-5 h-5 ${role === r ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                  <p className={`font-bold text-sm ${role === r ? 'text-indigo-700' : 'text-slate-700'}`}>{label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {showPass ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
              </motion.div>
            )}

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
                : <><ArrowRight className="w-4 h-4" /> Create Account as {role === 'student' ? 'Student' : 'Counsellor'}</>}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
