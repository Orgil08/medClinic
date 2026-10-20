import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: string;
  quote: string;
  patientName: string;
  ageInfo: string;
  serviceCategory: string;
  branch: string;
  date: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Сүүлийн 10 жил хасах 4.5 шил зүүсэн. Хараа заслын төвд лазераар хараагаа тэглүүлээд одоо 100% тод харж байна. Мэс засал өвдөлтгүй, маш хурдан болсон.',
    patientName: 'М. Тэмүүлэн',
    ageInfo: '28 настай, Программист',
    serviceCategory: 'Хараа тэглэх лазер (LASIK)',
    branch: 'MPM Center салбар',
    date: '2025.02.14',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'Аавынхаа хоёр нүдний болорыг ЭМД-ын 75% хөнгөлөлттэйгөөр тус эмнэлэгт солиулсан. Доктор Сингх эмч болон хамт олонд маш их баярлалаа, аав маань маш тод харж байна.',
    patientName: 'Б. Энхтуяа',
    ageInfo: 'Үйлчлүүлэгчийн охин',
    serviceCategory: 'Болор солих бичил мэс засал (Фако)',
    branch: 'Төв эмнэлэг (Санрайс)',
    date: '2025.01.28',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'Сургуульд орохын өмнөх үзлэгээр хүүгээ үзүүлсэн. Хүүхдийн эмч нар нь маш энэрэнгүй, хүүг минь айлгахгүй тайван үзэж, дэлгэцийн харааны ачааллыг зөв тодорхойлж өгсөн.',
    patientName: 'О. Батцэцэг',
    ageInfo: '6 настай хүүгийн ээж',
    serviceCategory: 'Хүүхдийн нүдний цогц үзлэг',
    branch: 'UBH салбар эмнэлэг',
    date: '2025.02.20',
    rating: 5,
  },
];

export const PatientSuccessStories: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors" aria-labelledby="testimonials-heading">
      <div className="site-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-[#1769AA] dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-blue-100/60 dark:border-slate-700">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Бодит сэтгэгдэл</span>
          </div>
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#123B63] dark:text-sky-300 tracking-tight"
          >
            Бидэнд итгэсэн үйлчлүүлэгчдийн үнэлгээ
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
            Солонго нүдний эмнэлгээр үйлчлүүлж хараагаа сайжруулсан болон эмчилгээ авсан иргэдийн туршлага
          </p>
        </div>

        {/* Minimalist 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F5F9FD]/60 dark:bg-slate-800/80 hover:bg-[#F5F9FD] dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-sm group"
            >
              <div className="space-y-4">
                {/* Top Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#1769AA] dark:text-sky-300 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-700 px-2.5 py-0.5 rounded-md">
                    {t.serviceCategory}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#263747] dark:text-slate-200 leading-relaxed italic relative">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom Patient Details */}
              <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#123B63] dark:text-sky-200">
                    {t.patientName}
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-slate-400">
                    {t.ageInfo}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-[11px] text-[#1769AA] dark:text-sky-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Баталгаажсан</span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    {t.branch}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="bg-[#F5F9FD] dark:bg-slate-800/90 rounded-2xl border border-blue-100/80 dark:border-slate-700 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-[#1769AA] dark:text-sky-400 border border-blue-100 dark:border-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#123B63] dark:text-sky-200">
                4.9 / 5.0 Дундаж сэтгэл ханамжийн үнэлгээ
              </h4>
              <p className="text-xs text-[#64748B] dark:text-slate-400">
                Нийт 10,000+ үзлэг, оношилгоо, бичил мэс заслын бодит үр дүн
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-[#1769AA] dark:text-sky-300 border border-blue-200 dark:border-slate-600 text-xs font-bold rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <span>Санал сэтгэгдэл илгээх</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
