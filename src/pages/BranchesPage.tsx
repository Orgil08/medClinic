import React, { useState } from 'react';
import { BRANCHES } from '../utils/hospitalData.ts';
import { MapPin, Phone, Mail, Clock, Bus, ExternalLink, Calendar, Building2, CheckCircle2 } from 'lucide-react';

interface BranchesPageProps {
  onOpenAppointment: () => void;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({ onOpenAppointment }) => {
  const [activeBranchId, setActiveBranchId] = useState<string>(BRANCHES[0].id);

  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  return (
    <div className="py-10 sm:py-14 site-container space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
          <Building2 className="w-4 h-4" />
          <span>Байршлууд</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Салбар эмнэлгүүд
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Солонго нүдний эмнэлэг нь Улаанбаатар хотын 3 тохиромжтой байршилд иргэдэд үйлчилж байна.
        </p>
      </div>

      {/* Interactive Branch Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {BRANCHES.map((b) => {
          const isActive = b.id === activeBranchId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBranchId(b.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#1769AA] text-white shadow-md ring-4 ring-blue-700/10'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              <span>{b.name}</span>
              {b.isMain && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#123B63] text-sky-200' : 'bg-blue-50 text-[#1769AA]'}`}>
                  Төв
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Branch Detail Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
        {/* Left Info Column */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1769AA] dark:text-sky-400 mb-1">
              {activeBranch.district}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeBranch.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
              {activeBranch.tagline}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Бүрэн хаяг:</strong>
                <span>{activeBranch.address}</span>
                <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">({activeBranch.landmark})</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Холбогдох утас:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeBranch.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/[^\d]/g, '')}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 text-[#1769AA] dark:text-sky-300 font-mono font-bold rounded-lg transition-colors"
                    >
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Ажиллах цагийн хуваарь:</strong>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 mt-1">
                  <li>• Даваа - Баасан: <strong className="text-slate-800 dark:text-slate-200">{activeBranch.hours.weekdays}</strong></li>
                  <li>• Бямба: <strong className="text-slate-800 dark:text-slate-200">{activeBranch.hours.saturday}</strong></li>
                  <li>• Ням: <strong className="text-slate-800 dark:text-slate-200">{activeBranch.hours.sunday}</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Bus className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white">Нийтийн тээврийн буудал:</strong>
                <p className="text-slate-600 dark:text-slate-300">{activeBranch.busRoutes}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-6 py-3.5 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Энэ салбарт цаг захиалах (Medsoft)</span>
            </button>
            <a
              href={activeBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Google Maps-ээр чиглэл авах</span>
              <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right Map Visual / Simulated Location Pin */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#123B63] via-[#1769AA] to-[#0A2540] p-8 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Газрын зураг & Байршил</span>
            </div>
            <h3 className="text-xl font-bold">{activeBranch.name}</h3>
            <p className="text-slate-200 text-xs leading-relaxed">
              {activeBranch.address}
            </p>
          </div>

          {/* Interactive Directions Card */}
          <div className="my-8 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <div className="flex items-center gap-2 text-sky-200 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Зогсоол ба хүртээмж:</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">
              Хотхоны гадна зогсоолтой, тэргэнцэртэй иргэд нэвтрэх пандус болон цахилгаан шаттай.
            </p>
          </div>

          <div>
            <a
              href={activeBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white hover:bg-slate-100 text-[#123B63] font-bold rounded-xl text-center block transition-colors text-xs sm:text-sm shadow-md"
            >
              Google Maps дээр нээх →
            </a>
          </div>
        </div>
      </div>

      {/* All 3 branches quick grid */}
      <div className="space-y-4 pt-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">Бүх 3 салбарын харьцуулалт</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              onClick={() => setActiveBranchId(b.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                b.id === activeBranchId
                  ? 'border-[#1769AA] bg-blue-50/50 dark:bg-blue-950/40 shadow-md ring-2 ring-[#1769AA]/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{b.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{b.district}</p>
              <div className="text-xs text-[#1769AA] dark:text-sky-400 font-semibold font-mono">
                {b.phones[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
