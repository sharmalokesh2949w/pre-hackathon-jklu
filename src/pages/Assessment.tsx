import React, { useState } from 'react';
import { 
  Brain, 
  ChevronRight, 
  Timer, 
  HelpCircle, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Assessment: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'Logic',
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then are all Bloops definitely Lazzies?",
      options: ["Yes, definitely", "No, not necessarily", "Depends on the size of Bloops", "I don't know"],
      aiInsight: "Adaptive Engine: Detecting Logical Syllogism Strength..."
    },
    {
      id: 2,
      type: 'Interest',
      question: "Which of these tasks would you find most engaging on a Saturday afternoon?",
      options: ["Solving a complex puzzle or code", "Sketching a new character/interface", "Leading a team in a strategy game", "Watching a documentary on space"],
      aiInsight: "Adaptive Engine: Mapping interests to Industry Skill Demand..."
    },
    {
      id: 3,
      type: 'Aptitude',
      question: "Which of these patterns comes next in the sequence? [AI would show image here]",
      options: ["Pattern A", "Pattern B", "Pattern C", "Pattern D"],
      aiInsight: "Adaptive Engine: Calculating Spatial Reasoning index..."
    }
  ];

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
    if (step < questions.length - 1) {
      // Trigger "Adaptive Change" animation
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Assessment <span className="gradient-text">Complete!</span></h2>
        <p className="text-slate-400 max-w-md mb-8">
          Our AI Adaptive Engine has analyzed your responses. Your profile has been updated with new insights on <span className="text-sky-400">Logic</span> and <span className="text-sky-400">Creative Strategy</span>.
        </p>
        <button className="btn-primary flex items-center gap-2" onClick={() => window.location.href = '/'}>
          View Updated Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Adaptive <span className="gradient-text">Skill Assessment</span></h2>
          <p className="text-sm text-slate-500">Step {step + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg text-slate-400">
          <Timer className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">12:45 remaining</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-sky-500" 
        />
      </div>

      <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
        {/* AI Insight Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full">
          <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-tighter">{currentQ.aiInsight}</span>
        </div>

        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-sky-500/20 rounded-2xl">
            <Brain className="w-6 h-6 text-sky-400" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded-md mb-2 inline-block">
              {currentQ.type}
            </span>
            <h3 className="text-xl font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(option)}
              className="group p-5 text-left rounded-2xl bg-white/5 border border-white/5 hover:bg-sky-500/5 hover:border-sky-500/30 transition-all flex items-center justify-between"
            >
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{option}</span>
              <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-sky-500 transition-colors">
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
        <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-slate-400">
          <span className="font-bold text-amber-200 uppercase">Tip:</span> AI is tracking your response time and confidence (mouse movement) to detect hidden strengths beyond just correct answers.
        </p>
      </div>
    </div>
  );
};

export default Assessment;
