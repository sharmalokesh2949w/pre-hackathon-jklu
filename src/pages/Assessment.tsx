import React, { useState } from 'react';
import { Brain, ChevronRight, Timer, HelpCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Assessment: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1, type: 'Logic',
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then are all Bloops definitely Lazzies?",
      options: ["Yes, definitely", "No, not necessarily", "Depends on the size of Bloops", "I don't know"],
      aiInsight: "Adaptive Engine: Detecting Logical Syllogism Strength..."
    },
    {
      id: 2, type: 'Interest',
      question: "Which of these tasks would you find most engaging on a Saturday afternoon?",
      options: ["Solving a complex puzzle or code", "Sketching a new character/interface", "Leading a team in a strategy game", "Watching a documentary on space"],
      aiInsight: "Adaptive Engine: Mapping interests to Industry Skill Demand..."
    },
    {
      id: 3, type: 'Aptitude',
      question: "Which of these patterns comes next in the sequence? [AI would show image here]",
      options: ["Pattern A", "Pattern B", "Pattern C", "Pattern D"],
      aiInsight: "Adaptive Engine: Calculating Spatial Reasoning index..."
    }
  ];

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Assessment <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Complete!</span></h2>
        <p className="text-slate-500 max-w-md mb-8">
          Our AI Adaptive Engine has analyzed your responses. Your profile has been updated with new insights on <span className="text-indigo-500 font-semibold">Logic</span> and <span className="text-indigo-500 font-semibold">Creative Strategy</span>.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200" onClick={() => navigate('/')}>
          View Updated Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Adaptive <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Skill Assessment</span></h2>
          <p className="text-sm text-slate-500">Step {step + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-500 border border-slate-200">
          <Timer className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">12:45 remaining</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
        />
      </div>

      <div className="card p-8 relative overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
          <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">{currentQ.aiInsight}</span>
        </div>

        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Brain className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md mb-2 inline-block">
              {currentQ.type}
            </span>
            <h3 className="text-xl font-bold text-slate-700 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(option)}
              className="group p-5 text-left rounded-2xl bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-between"
            >
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">{option}</span>
              <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-slate-500">
          <span className="font-bold text-amber-600 uppercase">Tip:</span> AI is tracking your response time and confidence to detect hidden strengths beyond just correct answers.
        </p>
      </div>
    </motion.div>
  );
};

export default Assessment;
