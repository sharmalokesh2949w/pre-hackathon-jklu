import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Target, 
  ArrowRight, 
  CheckCircle2,
  Heart,
  Zap,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Primary Interests",
    subtitle: "What fields excite you the most?",
    icon: Heart,
    color: "sky"
  },
  {
    title: "Self-Aptitude",
    subtitle: "Where do you think your natural strengths lie?",
    icon: Target,
    color: "indigo"
  },
  {
    title: "Academic Focus",
    subtitle: "Which subjects do you excel in at school?",
    icon: GraduationCap,
    color: "amber"
  },
  {
    title: "Learning Style",
    subtitle: "How do you learn most effectively?",
    icon: Zap,
    color: "emerald"
  }
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
  const { updateProfile } = useAuth();
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
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Progress */}
      <div className="w-full md:w-80 bg-slate-900/50 border-r border-white/5 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Compass className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Edu<span className="gradient-text">Path</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Onboarding</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-4 transition-all ${idx === currentStep ? 'opacity-100 translate-x-1' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                idx <= currentStep ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-700 text-slate-500'
              }`}>
                {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <div>
                <p className="text-sm font-bold">{step.title}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{idx === currentStep ? 'In Progress' : idx < currentStep ? 'Completed' : 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 glass-card rounded-2xl bg-sky-500/5 border-sky-500/10">
          <p className="text-[10px] text-sky-400 font-bold uppercase mb-2">Pro Tip</p>
          <p className="text-xs text-slate-400 leading-relaxed">Be honest! Our AI uses this to build your Career Twin profile.</p>
        </div>
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
              <div className={`inline-flex p-3 rounded-2xl bg-${currentStepData.color}-500/10 mb-6`}>
                <currentStepData.icon className={`w-8 h-8 text-${currentStepData.color}-400`} />
              </div>
              <h2 className="text-4xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-lg text-slate-400">{currentStepData.subtitle}</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStep === 0 && interestsOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleToggle('interests', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    formData.interests.includes(opt) 
                    ? 'bg-sky-500/10 border-sky-500 text-sky-400' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold">{opt}</span>
                  {formData.interests.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}

              {currentStep === 1 && aptitudeOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleToggle('aptitude', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    formData.aptitude.includes(opt) 
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold">{opt}</span>
                  {formData.aptitude.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}

              {currentStep === 2 && subjectsOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleToggle('subjects', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    formData.subjects.includes(opt) 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold">{opt}</span>
                  {formData.subjects.includes(opt) && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              ))}

              {currentStep === 3 && learningOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleToggle('learningStyle', opt)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    formData.learningStyle === opt 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
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
            className={`px-6 py-3 rounded-xl font-bold transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 text-slate-400 hover:text-slate-200'}`}
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
            className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Finalizing Profile...' : currentStep === steps.length - 1 ? 'Finish & Build Career Twin' : 'Next Question'}
            {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
