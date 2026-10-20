import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Home, Calendar, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onOpenAppointment: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 mx-auto flex items-center justify-center border border-blue-200/60 dark:border-blue-900/60">
        <Eye className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Хуудас олдсонгүй
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Уучлаарай, таны хандсан хуудас байхгүй эсвэл хаяг шилжсэн байна.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1769AA] hover:bg-[#123B63] text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Нүүр хуудас</span>
        </Link>
        <button
          type="button"
          onClick={onOpenAppointment}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
          <span>Цаг захиалах</span>
        </button>
      </div>
    </div>
  );
};
