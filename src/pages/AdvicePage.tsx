import React, { useState } from 'react';
import { HEALTH_ADVICE_LIST } from '../utils/hospitalData.ts';
import { EyeCheckReminder } from '../components/EyeCheckReminder.tsx';
import { EyeHealthRiskCalculator } from '../components/EyeHealthRiskCalculator.tsx';
import { FAQ } from '../components/FAQ.tsx';
import { HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface AdvicePageProps {
  onOpenAppointment?: () => void;
}

export const AdvicePage: React.FC<AdvicePageProps> = ({ onOpenAppointment }) => {
  const [expandedId, setExpandedId] = useState<string | null>(HEALTH_ADVICE_LIST[0].id);

  return (
    <div className="py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 text-xs font-semibold">
          <HeartPulse className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
          <span>Урьдчилан сэргийлэлт</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Эрүүл мэндийн зөвлөгөө
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Нүд бол хүний ертөнцийг харах хамгийн эрхэм эрхтэн билээ. Хараагаа хамгаалах энгийн боловч амьдралд хэрэгтэй эмчийн зөвлөмжүүдтэй танилцана уу.
        </p>
      </div>

      {/* Interactive 20-20-20 Timer Widget */}
      <EyeCheckReminder />

      {/* Advice Articles List */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Эмчийн санамж, зөвлөмжүүд
        </h2>

        <div className="space-y-4">
          {HEALTH_ADVICE_LIST.map((advice) => {
            const isExpanded = expandedId === advice.id;
            return (
              <div
                key={advice.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : advice.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider">
                      {advice.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {advice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {advice.summary}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <strong className="text-slate-900 dark:text-white block font-semibold">Гол анхаарах алхмууд:</strong>
                      <div className="grid grid-cols-1 gap-2">
                        {advice.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                      {advice.detailedContent}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Eye Health Risk Questionnaire & Wellness Score */}
      <section className="pt-6 border-t border-slate-200">
        <EyeHealthRiskCalculator onOpenAppointment={onOpenAppointment} />
      </section>

      {/* Common FAQ Section */}
      <section className="pt-4">
        <FAQ onOpenAppointment={onOpenAppointment} />
      </section>

      {/* Medical Disclaimer */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-900">Эрүүл мэндийн санамж:</div>
          <p className="text-amber-800 leading-relaxed">
            Энэхүү цахим хуудсанд байрлуулсан мэдээлэл, зөвлөгөө нь зөвхөн танин мэдэхүйн болон урьдчилан сэргийлэх зориулалттай бөгөөд эмчийн бодит үзлэг, оношилгоог орлохгүй. Хэрэв таны нүд өвдөх, хараа огцом муудах зэрэг шинж илэрвэл цаг алдалгүй нарийн мэргэжлийн нүдний эмчид хандана уу.
          </p>
        </div>
      </div>
    </div>
  );
};
