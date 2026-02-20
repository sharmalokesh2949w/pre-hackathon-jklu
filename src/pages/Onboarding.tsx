import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Target, ArrowRight, CheckCircle2, Heart, Zap, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { title: "Primary Interests", subtitle: "What fields excite you the most?", icon: Heart, color: "indigo" },
  { title: "Self-Aptitude", subtitle: "Where do your natural strengths lie?", icon: Target, color: "teal" },
  { title: "Academic Focus", subtitle: "Which subjects do you excel in?", icon: GraduationCap, color: "amber" },
  { title: "Learning Style", subtitle: "How do you learn most effectively?", icon: Zap, color: "emerald" }
];

const interestsOptions = ["Computer Science", "Medical / Biology", "Arts & Design", "Business & Finance", "Social Sciences", "Pure Sciences", "Law & Politics", "Engineering"];
const aptitudeOptions = ["Logical Reasoning", "Creative Thinking", "Leadership", "Hands-on Practical", "Analytical Skills", "Communication"];
const subjectsOptions = ["Mathematics", "Physics", "Chemistry", "Biology", "Literature", "History / Civics", "Economics", "Computer Applications"];
const learningOptions = ["Visual (Diagrams)", "Auditory (Listening)", "Practical (Hands-on)", "Reading/Writing"];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    aptitude: [] as string[],
    subjects: [] as string[],
    learningStyle: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (field: keyof typeof formData, value: string) => {
    if (field === 'learningStyle') {
      setFormData({ ...formData, learningStyle: value });
    } else {
      const current = formData[field] as string[];
      if (current.includes(value)) {
        setFormData({ ...formData, [field]: current.filter(i => i !== value) });
      } else {
        setFormData({ ...formData, [field]: [...current, value] });
      }
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      const success = await updateProfile(formData);
      if (success) {
        navigate('/');
      } else {
        setIsSubmitting(false);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-700 flex flex-col md:flex-row">
      {/* Sidebar Progress */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 p-8 flex flex-col shadow-sm">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Compass className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Career<span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Cube</span></h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Onboarding</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-4 transition-all ${idx === currentStep ? 'opacity-100 translate-x-1' : idx < currentStep ? 'opacity-70' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${idx < currentStep ? 'bg-indigo-500 border-indigo-500 text-white' :
                idx === currentStep ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 text-slate-400'
                }`}>
                {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{step.title}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{idx === currentStep ? 'In Progress' : idx < currentStep ? 'Completed' : 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <p className="text-[10px] text-indigo-500 font-bold uppercase mb-2">Pro Tip</p>
          <p className="text-xs text-slate-500 leading-relaxed">Be honest! Our AI uses this to build your career profile.</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 mt-4 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-6 md:p-12 lg:p-24 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <header>
              <div className={`inline-flex p-3 rounded-2xl bg-${currentStepData.color}-50 mb-6`}>
                <currentStepData.icon className={`w-8 h-8 text-${currentStepData.color}-500`} />
              </div>
              <h2 className="text-4xl font-bold mb-2 text-slate-800">{currentStepData.title}</h2>
              <p className="text-lg text-slate-500">{currentStepData.subtitle}</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStep === 0 && interestsOptions.map(opt => (
                <button key={opt} onClick={() => handleToggle('interests', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${formData.interests.includes(opt) ? 'bg-indigo-50 border-indigo-400 text-indigo-600' : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-600'
                    }`}>
                  <span className="font-bold">{opt}</span>
                  {formData.interests.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}
              {currentStep === 1 && aptitudeOptions.map(opt => (
                <button key={opt} onClick={() => handleToggle('aptitude', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${formData.aptitude.includes(opt) ? 'bg-teal-50 border-teal-400 text-teal-600' : 'bg-white border-slate-200 hover:border-teal-300 text-slate-600'
                    }`}>
                  <span className="font-bold">{opt}</span>
                  {formData.aptitude.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}
              {currentStep === 2 && subjectsOptions.map(opt => (
                <button key={opt} onClick={() => handleToggle('subjects', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${formData.subjects.includes(opt) ? 'bg-amber-50 border-amber-400 text-amber-600' : 'bg-white border-slate-200 hover:border-amber-300 text-slate-600'
                    }`}>
                  <span className="font-bold">{opt}</span>
                  {formData.subjects.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}
              {currentStep === 3 && learningOptions.map(opt => (
                <button key={opt} onClick={() => handleToggle('learningStyle', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${formData.learningStyle === opt ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-600'
                    }`}>
                  <span className="font-bold">{opt}</span>
                  {formData.learningStyle === opt && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`px-6 py-3 rounded-xl font-bold transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 text-slate-400 hover:text-slate-700'}`}
          >
            Go Back
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting || (
              (currentStep === 0 && formData.interests.length === 0) ||
              (currentStep === 1 && formData.aptitude.length === 0) ||
              (currentStep === 2 && formData.subjects.length === 0) ||
              (currentStep === 3 && !formData.learningStyle)
            )}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold flex items-center gap-2 group disabled:opacity-50 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
          >
            {isSubmitting ? 'Finalizing Profile...' : currentStep === steps.length - 1 ? 'Finish & Build Profile' : 'Next Question'}
            {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
