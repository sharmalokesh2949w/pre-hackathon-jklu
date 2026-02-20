import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type {
    AnalysisState,
    InterestEntry,
    AptitudeScore,
    SubjectYear,
    InterestAnalysisResult,
    AptitudeResult,
    AcademicResult,
    CareerDecisionResult,
    CareerRoadmap,
} from '../types/analysis';
import { analyzeInterests } from '../engine/interestAnalysis';
import { evaluateAptitude } from '../engine/aptitudeEngine';
import { analyzeAcademics } from '../engine/academicEngine';
import { generateCareerDecision } from '../engine/careerDecision';
import { generateFullRoadmap } from '../engine/roadmapGenerator';

// ── Context Type ──────────────────────────────

interface AnalysisContextType {
    state: AnalysisState;
    setInterests: (entries: InterestEntry[]) => void;
    setAptitudes: (scores: AptitudeScore[]) => void;
    setAcademics: (years: SubjectYear[]) => void;
    runInterestAnalysis: () => InterestAnalysisResult;
    runAptitudeAnalysis: () => AptitudeResult;
    runAcademicAnalysis: () => AcademicResult;
    runFullAnalysis: () => void;
    setStep: (step: number) => void;
    resetAll: () => void;
}

const INITIAL_STATE: AnalysisState = {
    interests: [],
    aptitudes: [],
    academics: [],
    interestResult: null,
    aptitudeResult: null,
    academicResult: null,
    decisionResult: null,
    roadmap: null,
    currentStep: 0,
    isComplete: false,
};

// ── Persistence ───────────────────────────────

const STORAGE_KEY = 'careercube_analysis';

const loadState = (): AnalysisState => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return { ...INITIAL_STATE, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return INITIAL_STATE;
};

const saveState = (state: AnalysisState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
};

// ── Provider ──────────────────────────────────

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AnalysisState>(loadState);

    const update = useCallback((patch: Partial<AnalysisState>) => {
        setState((prev) => {
            const next = { ...prev, ...patch };
            saveState(next);
            return next;
        });
    }, []);

    const setInterests = useCallback((entries: InterestEntry[]) => {
        update({ interests: entries });
    }, [update]);

    const setAptitudes = useCallback((scores: AptitudeScore[]) => {
        update({ aptitudes: scores });
    }, [update]);

    const setAcademics = useCallback((years: SubjectYear[]) => {
        update({ academics: years });
    }, [update]);

    const runInterestAnalysis = useCallback((): InterestAnalysisResult => {
        const result = analyzeInterests(state.interests);
        update({ interestResult: result });
        return result;
    }, [state.interests, update]);

    const runAptitudeAnalysis = useCallback((): AptitudeResult => {
        const result = evaluateAptitude(state.aptitudes);
        update({ aptitudeResult: result });
        return result;
    }, [state.aptitudes, update]);

    const runAcademicAnalysis = useCallback((): AcademicResult => {
        const result = analyzeAcademics(state.academics);
        update({ academicResult: result });
        return result;
    }, [state.academics, update]);

    const runFullAnalysis = useCallback(() => {
        const interestResult = analyzeInterests(state.interests);
        const aptitudeResult = evaluateAptitude(state.aptitudes);
        const academicResult = analyzeAcademics(state.academics);
        const decisionResult = generateCareerDecision(interestResult, aptitudeResult, academicResult);
        const roadmap = generateFullRoadmap(
            decisionResult.rankings[0] ?? null,
            decisionResult.recommendedStream,
            academicResult
        );

        update({
            interestResult,
            aptitudeResult,
            academicResult,
            decisionResult,
            roadmap,
            isComplete: true,
        });
    }, [state.interests, state.aptitudes, state.academics, update]);

    const setStep = useCallback((step: number) => {
        update({ currentStep: step });
    }, [update]);

    const resetAll = useCallback(() => {
        setState(INITIAL_STATE);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const value = useMemo(
        () => ({
            state,
            setInterests,
            setAptitudes,
            setAcademics,
            runInterestAnalysis,
            runAptitudeAnalysis,
            runAcademicAnalysis,
            runFullAnalysis,
            setStep,
            resetAll,
        }),
        [state, setInterests, setAptitudes, setAcademics, runInterestAnalysis, runAptitudeAnalysis, runAcademicAnalysis, runFullAnalysis, setStep, resetAll]
    );

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = (): AnalysisContextType => {
    const ctx = useContext(AnalysisContext);
    if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
    return ctx;
};
