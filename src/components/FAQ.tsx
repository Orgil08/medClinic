import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  Search,
  ShieldCheck,
  Scissors,
  Eye,
  Smile,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles
} from 'lucide-react';
import { FAQ_ITEMS } from '../utils/hospitalData.ts';
import { filterFaqItems } from '../utils/faq.ts';
import type { FAQCategory } from '../types/index.ts';

interface FAQProps {
  onOpenAppointment?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenAppointment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0]?.id || null);

  const categories = [
    { id: 'all', label: 'Бүх асуулт', icon: HelpCircle },
    { id: 'insurance', label: 'ЭМД ба төлбөр', icon: ShieldCheck },
    { id: 'surgery', label: 'Мэс заслын бэлтгэл', icon: Scissors },
    { id: 'eye-care', label: 'Үзлэг & Зөвлөгөө', icon: Eye },
    { id: 'pediatric', label: 'Хүүхдийн нүд', icon: Smile },
  ];

  const filteredItems = filterFaqItems(FAQ_ITEMS, selectedCategory, searchQuery);

  const toggleAccordion = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-label="Түгээмэл асуулт хариулт"
      className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 shadow-sm space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-[#1769AA] dark:text-sky-400" />
            <span>Түгээмэл асуулт, хариулт</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Нүдний эмчилгээ, мэс засал ба даатгалын талаарх асуултууд
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Эрүүл мэндийн даатгалын 75% хөнгөлөлт, болор солих мэс заслын бэлтгэл болон үзлэгийн хуваарийн талаар иргэдийн хамгийн их тодруулдаг асуултуудын нэгдсэн хариулт.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex items-center gap-3 bg-blue-50/80 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 px-4 py-3 rounded-2xl shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#1769AA] text-white flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5 text-sky-200" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#123B63] dark:text-white">ЭМД-ын 75% хөнгөлөлттэй</div>
            <div className="text-[11px] text-[#1769AA] dark:text-sky-300">13А маягт шаардлагагүй</div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                data-category={cat.id}
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1769AA] text-white shadow-sm'
                    : 'bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-200' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Асуултаас хайх (жишээ: даатгал, шинжилгээ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5">
        {filteredItems.length > 0 ? (
          filteredItems.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#1769AA]/50 bg-blue-50/30 dark:bg-slate-800/80 dark:border-blue-500/50 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30 rounded-2xl"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1769AA] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full">
                          {faq.categoryLabel}
                        </span>
                        {faq.highlightTag && (
                          <span className="text-[11px] font-semibold text-[#123B63] dark:text-sky-200 bg-sky-100/80 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200/60">
                            {faq.highlightTag}
                          </span>
                        )}
                      </div>
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white block leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#1769AA] text-white rotate-180'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 dark:border-slate-800 animate-in fade-in duration-150"
                  >
                    <div className="bg-white/80 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-3">
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              "{searchQuery}" хайлтад тохирох асуулт олдсонгүй.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:underline cursor-pointer"
            >
              Бүх асуултыг харах
            </button>
          </div>
        )}
      </div>

      {/* Bottom Help Banner */}
      <div className="bg-gradient-to-r from-[#123B63] to-[#1769AA] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-white">
            Таны асуултад хариулт олдсонгүй юу?
          </h3>
          <p className="text-xs sm:text-sm text-sky-100">
            Манай лавлах утсаар шууд холбогдох эсвэл санал хүсэлтийн маягтаар тодруулгаа илгээнэ үү.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href="tel:77056699"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-sky-200" />
            <span>7705-6699 залгах</span>
          </a>

          <Link
            to="/contact"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-sky-200" />
            <span>Асуулт илгээх</span>
          </Link>

          {onOpenAppointment && (
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-5 py-2.5 bg-white hover:bg-sky-50 text-[#1769AA] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#1769AA]" />
              <span>Цаг захиалах</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
