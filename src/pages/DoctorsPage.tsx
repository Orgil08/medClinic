import React, { useState } from 'react';
import { DOCTORS } from '../utils/hospitalData.ts';
import { Award, GraduationCap, Calendar, Clock, MapPin, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

interface DoctorsPageProps {
  onOpenAppointment: () => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenAppointment }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const branches = [
    { id: 'all', label: 'Бүх салбар' },
    { id: 'Төв эмнэлэг', label: 'Төв эмнэлэг (Санрайс хотхон)' },
    { id: 'UBH салбар', label: 'UBH салбар эмнэлэг' },
    { id: 'Солонго хараа заслын төв', label: 'Хараа заслын төв' },
  ];

  const filteredDoctors = DOCTORS.filter((d) => {
    if (selectedBranch === 'all') return true;
    return d.branches.includes(selectedBranch);
  });

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>Мэргэшсэн эмч нар</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Эмч, мэргэжилтнүүд
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Солонго нүдний эмнэлгийн эмч нар олон жилийн туршлага, олон улсын зөвлөх мэргэжилтнүүдийн дэмжлэгтэйгээр өндөр нарийвчлалтай үзлэг, хагалгааг хийдэг.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {branches.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedBranch(b.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedBranch === b.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
              doc.isConsultant
                ? 'border-teal-300 bg-gradient-to-br from-teal-50/50 via-white to-white ring-2 ring-teal-500/20'
                : 'border-slate-200/80'
            }`}
          >
            <div className="space-y-6">
              {/* Doctor Head */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md shrink-0 ${
                    doc.isConsultant
                      ? 'bg-gradient-to-tr from-teal-700 to-cyan-600 text-white ring-4 ring-teal-100'
                      : 'bg-gradient-to-tr from-slate-700 to-slate-900 text-white'
                  }`}
                >
                  {doc.name.charAt(0)}
                </div>

                <div className="space-y-1">
                  {doc.isConsultant && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      <Star className="w-3 h-3 fill-teal-700" />
                      Олон улсын зөвлөх эмч
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {doc.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-teal-700">{doc.role}</p>
                  <p className="text-xs text-slate-500">{doc.department}</p>
                </div>
              </div>

              {/* Badges / Experience */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium font-mono">
                  Туршлага: {doc.experienceYears}+ жил
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  <span>{doc.branches.join(', ')}</span>
                </span>
              </div>

              {/* Specialties */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-slate-900">Мэргэшсэн чиглэл:</div>
                <div className="grid grid-cols-1 gap-1.5 text-slate-600">
                  {doc.specialties.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  <span>Боловсрол & Гишүүнчлэл:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                  {doc.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>

              {/* Schedule note */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Үзлэгийн хуваарь: <strong className="text-slate-800">{doc.scheduleNote}</strong></span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
              <span className="text-xs text-slate-500">Цагийг Medsoft-оор баталгаажуулна</span>
              <button
                type="button"
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Цаг захиалах</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
