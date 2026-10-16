import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const EyeCheckReminder: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(20 * 60); // 20 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (!isResting) {
        setIsResting(true);
        setSecondsLeft(20); // 20 second rest
      } else {
        setIsResting(false);
        setSecondsLeft(20 * 60);
        setIsRunning(false);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, isResting]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsResting(false);
    setSecondsLeft(20 * 60);
  };

  return (
    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 sm:p-8 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200/50">
            <Clock className="w-3.5 h-3.5" />
            <span>20-20-20 Цахим туслах</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Дэлгэцийн нүдний ядаргааг тайлах дасгал
          </h3>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            20 минут тутамд 20 секундийн турш 6 метрийн зайд буй зүйлийг харж нүдээ анивчин амраагаарай. Энэхүү таймер нь таны нүд хуурайшиж, хараа муудахаас найдвартай сэргийлнэ.
          </p>
        </div>

        {/* Timer Card */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-center sm:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {isResting ? '✨ Амрах 20 секунд!' : 'Ажлын цаг'}
            </div>
            <div
              className={`text-3xl sm:text-4xl font-mono font-bold ${
                isResting ? 'text-amber-600 animate-pulse' : 'text-slate-900'
              }`}
            >
              {formatTime(secondsLeft)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Түр зогсоох</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Эхлүүлэх</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Дахин эхлүүлэх"
              title="Дахин эхлүүлэх"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
