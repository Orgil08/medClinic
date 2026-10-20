import React from 'react';
import { Link } from 'react-router-dom';
import { HISTORY_MILESTONES } from '../utils/hospitalData.ts';
import { Calendar, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

interface HistoryPageProps {
  onOpenAppointment: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Back button & Header */}
      <div>
        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Бидний тухай хуудас руу буцах</span>
        </Link>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Түүхэн замнал
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
          Солонго нүдний эмнэлгийн үүсгэн байгуулагдсан цагаас өнөөг хүртэлх хөгжил, ололт амжилт.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {HISTORY_MILESTONES.map((milestone, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-[#1769AA] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm" />

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 dark:border-blue-900/60 text-xs font-bold font-mono">
                {milestone.year}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {milestone.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {milestone.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-[#123B63] to-[#1769AA] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h3 className="text-xl font-bold">Та манай эмнэлэгт үзүүлэхээр төлөвлөж байна уу?</h3>
          <p className="text-xs sm:text-sm text-sky-100 mt-1">
            Өөрт ойр байрлах салбарт цаг захиалан үзүүлэх боломжтой.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAppointment}
          className="px-6 py-3 bg-white text-[#123B63] hover:bg-sky-50 font-bold text-sm rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-2 shadow-md"
        >
          <Calendar className="w-4 h-4 text-[#1769AA]" />
          <span>Цаг захиалах (Medsoft)</span>
        </button>
      </div>
    </div>
  );
};
