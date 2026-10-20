import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Play,
  Pause,
  MapPin,
  Heart
} from 'lucide-react';
import { TESTIMONIALS } from '../utils/hospitalData.ts';
import { getNextIndex, getPrevIndex } from '../utils/carousel.ts';

interface TestimonialsProps {
  onOpenAppointment?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenAppointment }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const total = TESTIMONIALS.length;

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isAutoPlay && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => getNextIndex(prev, total));
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, isHovered, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => getNextIndex(prev, total));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getPrevIndex(prev, total));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      aria-label="Үйлчлүүлэгчдийн сэтгэгдэл"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl space-y-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header and trust stats */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-semibold border border-blue-500/30">
            <Heart className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>Үйлчлүүлэгчийн үнэлгээ & Талархал</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Бидэнд итгэсэн үйлчлүүлэгчдийн сэтгэгдэл
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Солонго нүдний эмнэлэгт болор солих, хараа засах, хүүхдийн үзлэг болон оношилгоонд хамрагдаж эрүүл хараагаа хамгаалсан иргэдийн бодит үнэлгээ.
          </p>
        </div>

        {/* Aggregate Ratings Counter */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              <strong className="text-white text-sm font-bold">4.9 / 5.0</strong> дундаж үнэлгээ
            </div>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <div className="text-base font-extrabold text-sky-400">98%</div>
            <div className="text-[11px] text-slate-400">Сэтгэл ханамж</div>
          </div>
        </div>
      </div>

      {/* Carousel Main Stage */}
      <div className="relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-700/80 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Quote & Patient Bio */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              {/* Highlight Headline */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-sky-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    "{current.highlight}"
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5 text-amber-400">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs text-slate-400 ml-2 font-mono">
                      {current.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-200 text-xs sm:text-base leading-relaxed italic">
                "{current.content}"
              </p>

              {/* Patient Profile Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white font-bold text-base sm:text-lg flex items-center justify-center shadow-md shrink-0">
                    {current.patientName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {current.patientName}
                      </h4>
                      {current.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-sky-300 bg-blue-950/70 px-2 py-0.5 rounded-full border border-blue-700/50">
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>Баталгаажсан</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      {current.ageOrContext}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col sm:items-end justify-between items-center gap-1 text-xs">
                  <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-sky-300 font-semibold border border-blue-500/30 text-[11px] sm:text-xs">
                    {current.serviceReceived}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{current.branch}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mini Action / Hospital Assurance */}
            <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Таны хараа бидний хариуцлага</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Манай нарийн мэргэжлийн эмч нарт үзүүлж, өөрт тохирсон эмчилгээ, цаг захиалгын мэдээллийг хурдан аваарай.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>ЭМД-аар 75% хөнгөлөлттэй</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {onOpenAppointment && (
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="w-full py-2.5 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Цаг захиалах (Medsoft)</span>
                  </button>
                )}
                <Link
                  to="/contact"
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Сэтгэгдэл илгээх</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls & Pagination Dots */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Slide Counter & Autoplay toggle */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="font-mono text-slate-300">
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
            aria-label={isAutoPlay ? 'Автомат эргэлтийг зогсоох' : 'Автомат эргэлтийг асаах'}
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3 h-3 text-sky-400" />
                <span>Автомат</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span>Зогссон</span>
              </>
            )}
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Сэтгэгдлийн хуудас сонгох">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Сэтгэгдэл ${idx + 1}: ${t.patientName}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-[#1769AA]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA] cursor-pointer"
            aria-label="Өмнөх сэтгэгдэл"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769AA] cursor-pointer"
            aria-label="Дараагийн сэтгэгдэл"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
