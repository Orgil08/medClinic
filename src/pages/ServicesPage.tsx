import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Sparkles,
  Activity,
  Smile,
  Glasses,
  ShieldAlert,
  Zap,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { SERVICES } from '../utils/hospitalData.ts';
import type { ServiceCategory } from '../types/index.ts';
import { InsurancePartners } from '../components/InsurancePartners.tsx';
import { Testimonials } from '../components/Testimonials.tsx';

interface ServicesPageProps {
  onOpenAppointment: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAppointment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Бүх үйлчилгээ' },
    { id: 'diagnostic', label: 'Үзлэг, оношилгоо' },
    { id: 'surgery', label: 'Нүдний мэс засал' },
    { id: 'treatment', label: 'Эмчилгээ, шинжилгээ' },
    { id: 'pediatric', label: 'Хүүхдийн нүд' },
    { id: 'refraction', label: 'Хараа зүй' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Eye': return <Eye className="w-6 h-6 text-[#1769AA]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-sky-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-[#1769AA]" />;
      case 'Glasses': return <Glasses className="w-6 h-6 text-blue-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-indigo-600" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-sky-600" />;
      default: return <Eye className="w-6 h-6 text-[#1769AA]" />;
    }
  };

  return (
    <div className="py-10 sm:py-14 site-container space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 text-xs font-semibold">
          <Eye className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
          <span>Мэргэжлийн тусламж үйлчилгээ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Эмнэлгийн үйлчилгээ
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Солонго нүдний эмнэлэг нь урьдчилан сэргийлэх үзлэгээс эхлээд өндөр технологийн бичил мэс засал хүртэлх бүх шатны тусламж үйлчилгээг олон улсын стандартын дагуу үзүүлдэг.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1769AA] text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Үйлчилгээ хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#1769AA] dark:hover:border-sky-500 hover:shadow-xl transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.emdCovered && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/60 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#1769AA] dark:text-sky-400" />
                      <span>{service.badge || 'ЭМД-аар хөнгөлөлттэй'}</span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider mb-1">
                    {service.categoryLabel}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    <Link to={`/services/${service.slug}`} className="hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors">
                      {service.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Үргэлжлэх хугацаа:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{service.estimatedDuration}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-4">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs sm:text-sm font-semibold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63] dark:hover:text-sky-300 flex items-center gap-1 hover:underline"
                >
                  <span>Дэлгэрэнгүй</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Цаг авах</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <p className="text-slate-500 dark:text-slate-400 text-base">"{searchQuery}" хайлтад тохирох үйлчилгээ олдсонгүй.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:underline cursor-pointer"
          >
            Бүх үйлчилгээг харах
          </button>
        </div>
      )}

      {/* Insurance Partners & Billing Information */}
      <section className="pt-8 border-t border-slate-200">
        <InsurancePartners onOpenAppointment={onOpenAppointment} />
      </section>

      {/* Patient Testimonials */}
      <section className="pt-4">
        <Testimonials onOpenAppointment={onOpenAppointment} />
      </section>
    </div>
  );
};
