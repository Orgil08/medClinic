import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  CheckCircle2,
  BellRing,
} from 'lucide-react';
import {
  EyeExerciseState,
  WORK_SECONDS,
  REST_SECONDS,
  DEMO_WORK_SECONDS,
  formatTimer,
  calculateProgress,
  calculateRemainingFromTarget,
  getNextCycleState,
  loadPersistedState,
  persistState,
  clearPersistedState,
} from '../utils/eyeExerciseTimer.ts';

export interface EyeExerciseProps {
  className?: string;
  onModeChange?: (mode: 'work' | 'rest') => void;
}

export const EyeExercise: React.FC<EyeExerciseProps> = ({ className = '', onModeChange }) => {
  // Initialize state from persisted lifecycle storage if available
  const [timerState, setTimerState] = useState<EyeExerciseState>(() => loadPersistedState());
  const intervalRef = useRef<number | null>(null);

  const { secondsLeft, isRunning, mode, targetEndTime, soundEnabled, demoMode } = timerState;

  // Gentle Web Audio API synthesizer for reminder bells without external network dependencies
  const playChime = (chimeType: 'rest' | 'resume') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (chimeType === 'rest') {
        // Two-tone bell notifying it is time to rest eyes
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.15); // E5
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        osc.start(now);
        osc.stop(now + 0.85);
      } else {
        // Ascending harmonic chime notifying return to work
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.start(now);
        osc.stop(now + 0.65);
      }
    } catch {
      // AudioContext blocked or unsupported in preview frame
    }
  };

  // Helper to safely clear active interval
  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Lifecycle & Interval Engine: handles tick, background recalculation, and guaranteed cleanup
  useEffect(() => {
    if (isRunning && targetEndTime) {
      stopInterval();

      intervalRef.current = window.setInterval(() => {
        const remaining = calculateRemainingFromTarget(targetEndTime);

        if (remaining <= 0) {
          // Time expired: cycle to next mode (work -> rest or rest -> work)
          const next = getNextCycleState(mode, demoMode);
          const nextTarget = Date.now() + next.nextSeconds * 1000;

          if (mode === 'work') {
            playChime('rest');
            onModeChange?.('rest');
            // Auto start rest 20s
            const nextState: EyeExerciseState = {
              ...timerState,
              mode: 'rest',
              secondsLeft: next.nextSeconds,
              targetEndTime: nextTarget,
              isRunning: true,
              lastUpdated: Date.now(),
            };
            setTimerState(nextState);
            persistState(nextState);
          } else {
            playChime('resume');
            onModeChange?.('work');
            // Rest ended: switch back to work
            const nextState: EyeExerciseState = {
              ...timerState,
              mode: 'work',
              secondsLeft: next.nextSeconds,
              targetEndTime: nextTarget,
              isRunning: true,
              lastUpdated: Date.now(),
            };
            setTimerState(nextState);
            persistState(nextState);
          }
        } else {
          setTimerState((prev) => {
            const updated = {
              ...prev,
              secondsLeft: remaining,
              lastUpdated: Date.now(),
            };
            persistState(updated);
            return updated;
          });
        }
      }, 1000);
    } else {
      stopInterval();
    }

    // Crucial lifecycle cleanup: prevents memory leaks and overlapping countdown intervals
    return () => {
      stopInterval();
    };
  }, [isRunning, targetEndTime, mode, demoMode, soundEnabled]);

  // Handle Play / Pause with accurate timestamp preservation
  const handleTogglePlay = () => {
    if (isRunning) {
      // Pause: retain current secondsLeft, clear targetEndTime
      stopInterval();
      const pausedState: EyeExerciseState = {
        ...timerState,
        isRunning: false,
        targetEndTime: null,
        lastUpdated: Date.now(),
      };
      setTimerState(pausedState);
      persistState(pausedState);
    } else {
      // Start: compute target end timestamp based on current secondsLeft
      const newTarget = Date.now() + secondsLeft * 1000;
      const runningState: EyeExerciseState = {
        ...timerState,
        isRunning: true,
        targetEndTime: newTarget,
        lastUpdated: Date.now(),
      };
      setTimerState(runningState);
      persistState(runningState);
    }
  };

  // Handle Reset: reset back to work 20:00 (or 10s if demoMode)
  const handleReset = () => {
    stopInterval();
    const resetSeconds = demoMode ? DEMO_WORK_SECONDS : WORK_SECONDS;
    const resetState: EyeExerciseState = {
      secondsLeft: resetSeconds,
      isRunning: false,
      mode: 'work',
      targetEndTime: null,
      soundEnabled,
      demoMode,
      lastUpdated: Date.now(),
    };
    setTimerState(resetState);
    persistState(resetState);
  };

  // Toggle quick demo mode for testing without waiting 20 minutes
  const handleToggleDemoMode = () => {
    stopInterval();
    const nextDemo = !demoMode;
    const initialSeconds = nextDemo ? DEMO_WORK_SECONDS : WORK_SECONDS;
    const updated: EyeExerciseState = {
      secondsLeft: initialSeconds,
      isRunning: false,
      mode: 'work',
      targetEndTime: null,
      soundEnabled,
      demoMode: nextDemo,
      lastUpdated: Date.now(),
    };
    setTimerState(updated);
    persistState(updated);
  };

  const handleToggleSound = () => {
    const updated: EyeExerciseState = {
      ...timerState,
      soundEnabled: !soundEnabled,
    };
    setTimerState(updated);
    persistState(updated);
  };

  const totalCycleSeconds = mode === 'work' ? (demoMode ? DEMO_WORK_SECONDS : WORK_SECONDS) : REST_SECONDS;
  const progressPct = calculateProgress(secondsLeft, totalCycleSeconds);

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 relative overflow-hidden transition-all ${className}`}
      aria-label="20-20-20 Нүдний дасгалын хэсэг"
    >
      {/* Background Ambient Glow */}
      <div
        className={`absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          mode === 'rest' ? 'bg-amber-100/70 dark:bg-amber-950/20' : 'bg-blue-50/70 dark:bg-blue-950/20'
        }`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
        {/* Left Column: Heading, Badge, Description & Advice */}
        <div className="max-w-xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                mode === 'rest'
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                  : 'bg-blue-50 dark:bg-slate-800 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 dark:border-slate-700'
              }`}
            >
              {mode === 'rest' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin" />
                  <span>Амрах 20 секунд явагдаж байна!</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-[#1769AA] dark:text-sky-400" />
                  <span>20-20-20 Цахим туслах</span>
                </>
              )}
            </span>

            {/* Fast Demo Mode Toggle */}
            <button
              type="button"
              onClick={handleToggleDemoMode}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                demoMode
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#1769AA] dark:hover:text-sky-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              title="Шалгахад зориулсан 10 секундийн горим"
            >
              {demoMode ? 'Хурдан горим (10с)' : 'Хурдан шалгах горим'}
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#123B63] dark:text-sky-200 tracking-tight">
            Дэлгэцийн нүдний ядаргааг тайлах дасгал
          </h3>

          <p className="text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
            20 минут тутамд 20 секундын турш 6 метрийн зайд буй зүйлийг харж, нүдээ амраахыг сануулна. Энэхүү дасгал нь комьпютер болон ухаалаг утас тогтмол ашигладаг хүмүүсийн нүдний хуурайшилт, харааны ядаргаанаас сэргийлдэг дэлхийн нүдний эмч нарын зөвлөдөг алтан дүрэм юм.
          </p>

          {/* Active Rest Mode Banner with Guidance */}
          {mode === 'rest' && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-pulse">
              <Eye className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Нүдээ амраана уу!</strong> Дэлгэцээс харцаа салгаж, 6 метр (20 фут) зайд буй цонх эсвэл алсын зүйл рүү 20 секунд тогтоон хараарай.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Timer Display & Action Buttons */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-[#F5F9FD] dark:bg-slate-800/80 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-2xs">
          {/* Time Digits & Live Progress */}
          <div className="text-center sm:text-left min-w-[130px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <span>{mode === 'rest' ? 'Амрах хугацаа' : 'Ажлын хугацаа'}</span>
              {isRunning && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              )}
            </div>

            <div
              className={`text-4xl sm:text-5xl font-mono font-black tracking-tight mt-1 transition-colors ${
                mode === 'rest' ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-[#123B63] dark:text-sky-300'
              }`}
            >
              {formatTimer(secondsLeft)}
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2.5">
              <div
                className={`h-full transition-all duration-1000 ${
                  mode === 'rest' ? 'bg-amber-500' : 'bg-[#1769AA] dark:bg-sky-500'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Controls: Play/Pause, Reset, Mute/Unmute */}
          <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isRunning
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700'
                  : 'bg-[#1769AA] dark:bg-sky-600 text-white hover:bg-[#123B63] dark:hover:bg-sky-500'
              }`}
              aria-label={isRunning ? 'Түр зогсоох' : 'Эхлүүлэх'}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Түр зогсоох</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Эхлүүлэх</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-3 rounded-xl text-[#263747] dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#123B63] dark:hover:text-sky-300 transition-all cursor-pointer shadow-2xs"
              aria-label="Таймерыг анхны төлөвт буцаах"
              title="Таймерыг анхны төлөвт буцаах"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-3 rounded-xl transition-all cursor-pointer border shadow-2xs ${
                soundEnabled
                  ? 'bg-white dark:bg-slate-800 text-[#1769AA] dark:text-sky-400 border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700'
                  : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              aria-label={soundEnabled ? 'Дуут дохио асаалттай' : 'Дуут дохио унтраастай'}
              title={soundEnabled ? 'Дуут дохио асаалттай' : 'Дуут дохио унтраастай'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeExercise;
