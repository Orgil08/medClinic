import React, { useState } from 'react';
import { X, ExternalLink, Phone, Calendar, Clock, MapPin, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { HOSPITAL_INFO, BRANCHES } from '../utils/hospitalData.ts';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
  defaultServiceSlug?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultBranchId = 'central',
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState(defaultBranchId);

  if (!isOpen) return null;

  const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
                <Calendar className="w-3.5 h-3.5" />
                Албан ёсны цаг захиалга
              </div>
              <h2 id="appointment-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                Эмчид үзүүлэх цаг захиалах
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Та манай эмнэлгийн албан ёсны Medsoft цахим системээр эсвэл лавлах утсаар шууд цаг авах боломжтой.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Хаах"
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Branch Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Үзүүлэх салбараа сонгоно уу:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {BRANCHES.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-medium ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1">
                      <span>{branch.name.split(' (')[0]}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">{branch.district}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Branch Summary */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                  {selectedBranch.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {selectedBranch.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Даваа-Баасан: {selectedBranch.hours.weekdays}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="font-medium text-slate-800">{selectedBranch.phones.join(' / ')}</span>
              </div>
            </div>
          </div>

          {/* Primary Action: Go to Medsoft */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-5 sm:p-6 text-center">
            <h3 className="font-bold text-teal-950 text-lg mb-1">
              Цахим бүртгэлийн систем (Medsoft)
            </h3>
            <p className="text-sm text-slate-600 mb-4 max-w-lg mx-auto">
              Та доорх товч дээр даран эмчийн сул цагийг бодитоор харан цагаа шууд баталгаажуулна уу.
            </p>
            <a
              href={HOSPITAL_INFO.onlineBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md shadow-teal-700/20 hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <span>Medsoft системээр цаг захиалах</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="text-xs text-slate-500 mt-2.5">
              Таныг албан ёсны захиалгын холбоос (solongo.medsoft.care) руу найдвартай шилжүүлнэ.
            </div>
          </div>

          {/* Secondary Action: Call direct */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Утсаар захиалах бол
                </div>
                <div className="text-base font-bold text-slate-900">
                  {selectedBranch.phones[0]}
                </div>
              </div>
            </div>
            <a
              href={`tel:${selectedBranch.phones[0].replace(/[^\d]/g, '')}`}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors w-full sm:w-auto text-center"
            >
              Шууд залгах
            </a>
          </div>

          {/* Preparation notice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-900">Үзлэгт ирэхдээ анхаарах зүйлс:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                <li>Иргэний үнэмлэх болон Эрүүл мэндийн даатгалын шимтгэлээ шалгасан байх</li>
                <li>Нүдний уг дурандах тохиолдолд ойрын хараа 2-4 цаг бүрэлзэх тул өөрөө машин барихгүй ирэх</li>
                <li>Хэрэв контакт линз зүүдэг бол үзлэгээс өмнө тайлах</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FileText className="w-4 h-4" />
            <span>ЭМД-ын 75% хүртэлх хөнгөлөлттэй</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
};
