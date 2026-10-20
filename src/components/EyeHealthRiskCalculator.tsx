import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  CALCULATOR_QUESTIONS,
  calculateWellnessScore,
  AssessmentResult
} from '../utils/eyeRiskCalculator.ts';

interface EyeHealthRiskCalculatorProps {
  onOpenAppointment?: () => void;
}

export const EyeHealthRiskCalculator: React.FC<EyeHealthRiskCalculatorProps> = ({
  onOpenAppointment
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = CALCULATOR_QUESTIONS.length;
  const currentQuestion = CALCULATOR_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    const updated = { ...answers, [questionId]: optionIndex };
    setAnswers(updated);

    // If answering the last question, show the results
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const assessment: AssessmentResult = calculateWellnessScore(answers);

  const getTierBadgeStyle = (tierColor: string) => {
    switch (tierColor) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-300';
    }
  };

  const getScoreCircleColor = (tierColor: string) => {
    switch (tierColor) {
      case 'emerald':
        return 'text-emerald-500';
      case 'amber':
        return 'text-amber-500';
      case 'rose':
        return 'text-rose-500';
      default:
        return 'text-[#1769AA]';
    }
  };

  return (
    <section
      aria-label="Нүдний эрүүл мэндийн эрсдэлийн үнэлгээний тооцоолуур"
      className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-sm space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-semibold border border-blue-200/60">
            <Activity className="w-3.5 h-3.5" />
            <span>Интерактив сорил & Эрсдэлийн оноо</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Нүдний эрүүл мэндийн эрсдэл тооцоолуур
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Таны өдөр тутмын дэлгэцийн хэрэглээ, амралтын горим, харааны зовуурь болон урьдчилан сэргийлэх дадал дээр үндэслэн эрүүл мэндийн оноо (0-100) тооцож, хувийн зөвлөмж өгнө.
          </p>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#1769AA] text-white flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">1 минутын сорил</div>
            <div className="text-[11px] text-slate-500">5 энгийн асуулт</div>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        /* Questionnaire View */
        <div className="space-y-8">
          {/* Progress bar & Step indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1769AA] text-white inline-flex items-center justify-center text-xs font-bold">
                  {currentStep + 1}
                </span>
                <span>Асуулт {currentStep + 1} / {totalQuestions}</span>
              </span>
              <span className="text-[#1769AA] font-bold">{progressPercent}% гүйцэтгэл</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1769AA] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question Card */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQuestion.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options list */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, idx)}
                    className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 flex items-start justify-between gap-4 cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50 border-[#1769AA] ring-2 ring-[#1769AA]/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/90'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-[#1769AA] bg-[#1769AA] text-white'
                            : 'border-slate-300 group-hover:border-blue-400'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className={`text-sm sm:text-base font-medium ${isSelected ? 'text-[#123B63] font-bold' : 'text-slate-800'}`}>
                          {option.label}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-[#1769AA] translate-x-1' : 'text-slate-300 group-hover:text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Өмнөх</span>
            </button>

            <div className="flex items-center gap-2">
              {currentStep < totalQuestions - 1 ? (
                <button
                  type="button"
                  disabled={answers[currentQuestion.id] === undefined}
                  onClick={() => setCurrentStep((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                    answers[currentQuestion.id] === undefined
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#1769AA] hover:bg-[#123B63] text-white shadow-sm cursor-pointer'
                  }`}
                >
                  <span>Дараах</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={answers[currentQuestion.id] === undefined}
                  onClick={() => setIsCompleted(true)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                    answers[currentQuestion.id] === undefined
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#1769AA] hover:bg-[#123B63] text-white shadow-md cursor-pointer'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Үр дүнг харах</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Score Meter Ring */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-800"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * assessment.score) / 100}
                      strokeLinecap="round"
                      className={`${getScoreCircleColor(assessment.tierColor)} transition-all duration-1000 ease-out`}
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-5xl font-black text-white font-mono">
                      {assessment.score}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">100 онооноос</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border ${getTierBadgeStyle(
                      assessment.tierColor
                    )}`}
                  >
                    {assessment.tierLabel}
                  </span>
                </div>
              </div>

              {/* Assessment Summary & Recommendations */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Таны нүдний эрүүл мэндийн үнэлгээ
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {assessment.summary}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Эмнэлгийн мэргэжлийн зөвлөмж:
                  </div>
                  <ul className="space-y-2">
                    {assessment.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Callout Box */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[#123B63] font-bold text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 text-[#1769AA]" />
                <span>Эрт илрүүлэг нь харааг 100% хамгаалах түлхүүр</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Солонго нүдний эмнэлэгт иж бүрэн дижитал оношилгоо, хараа шалгах үзлэгт цаг аван хамрагдаарай.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Дахин тооцоолох</span>
              </button>

              <Link
                to="/advice"
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-[#1769AA] font-semibold text-xs sm:text-sm rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5"
              >
                <span>Эрүүл мэндийн зөвлөгөө</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {onOpenAppointment && (
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Цаг захиалах (Medsoft)</span>
                </button>
              )}
            </div>
          </div>

          {/* Medical Notice */}
          <div className="flex items-start gap-2.5 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Санамж:</strong> Энэхүү эрсдэлийн үнэлгээ нь зөвхөн эрүүл мэндийн ерөнхий боловсрол олгох, зуршлыг үнэлэх зориулалттай бөгөөд эмчийн оношийг орлохгүй. Нүдэнд зовуурь илэрсэн тохиолдолд мэргэжлийн нүдний эмчид үзүүлнэ үү.
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
