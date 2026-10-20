import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  Phone
} from 'lucide-react';
import { SERVICES, HOSPITAL_INFO } from '../utils/hospitalData.ts';

interface ServiceDetailPageProps {
  onOpenAppointment: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenAppointment }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="py-20 max-w-xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Үйлчилгээ олдсонгүй</h1>
        <p className="text-slate-600 text-sm">Таны хайсан үйлчилгээний мэдээлэл олдсонгүй эсвэл шинэчлэгдсэн байна.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1769AA] hover:bg-[#123B63] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Бүх үйлчилгээ рүү буцах</span>
        </Link>
      </div>
    );
  }

  const relatedServices = SERVICES.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 2);

  return (
    <div className="py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Бүх үйлчилгээ рүү буцах</span>
        </Link>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {service.categoryLabel}
        </span>
      </div>

      {/* Main Service Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {service.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
              <span>{service.badge}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Хугацаа: {service.estimatedDuration}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {service.title}
        </h1>

        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {service.fullDesc}
        </p>

        {service.emdNote && (
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs sm:text-sm text-slate-900 dark:text-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#123B63] dark:text-sky-300 font-semibold mb-0.5">Даатгалын хөнгөлөлт:</strong>
              {service.emdNote}
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onOpenAppointment}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Энэ үйлчилгээнд цаг авах (Medsoft)</span>
          </button>

          <a
            href="tel:77056699"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
            <span>Лавлах: 7705-6699</span>
          </a>
        </div>
      </div>

      {/* Grid: Indications & Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Indications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3>Хэзээ үзүүлэх шаардлагатай вэ? (Шинж тэмдэг)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {service.indications.map((ind, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Procedures */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
            <h3>Хийгдэх шинжилгээ, ажилбар</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {service.procedures.map((proc, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                <span>{proc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preparation Tips */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-bold text-amber-950 dark:text-amber-200 text-base sm:text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <span>Үзлэг, ажилбарт ирэхдээ бэлтгэх зүйлс</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-300 list-disc pl-5">
          {service.preparationTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1769AA] dark:text-sky-400" />
            <span>Түгээмэл асуултууд</span>
          </h3>
          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Холбогдох үйлчилгээнүүд</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                to={`/services/${rel.slug}`}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1769AA] hover:shadow-sm transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rel.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{rel.shortDesc}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#1769AA] dark:text-sky-400 rotate-180 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
