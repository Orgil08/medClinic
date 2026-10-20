import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { HOSPITAL_INFO, BRANCHES, SERVICES } from '../utils/hospitalData.ts';
import { NewsletterSubscribe } from './NewsletterSubscribe';
import { SolongoLogo } from './SolongoLogo';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  return (
    <footer className="bg-[#F5F9FD] dark:bg-slate-950 text-[#263747] dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* 1. Newsletter Integration Block at Top of Footer */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 py-10 sm:py-12 transition-colors">
        <div className="site-container">
          <NewsletterSubscribe variant="footer" />
        </div>
      </div>

      {/* 2. Main 4-Column Footer Content */}
      <div className="site-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Column 1 — Байгууллагын мэдээлэл */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center group focus:outline-none"
              aria-label="Солонго нүдний эмнэлэг"
            >
              <SolongoLogo className="h-11 sm:h-12 w-auto" />
            </Link>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
              2012 оноос хойш 12+ жилийн турш олон улсын стандартад нийцсэн үзлэг, оношилгоо, бичил мэс заслын дэвшилтэт тусламж үйлчилгээ үзүүлж буй мэргэшсэн эмнэлэг.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1769AA] dark:text-sky-300 bg-blue-50 dark:bg-slate-800 border border-blue-200/70 dark:border-slate-700 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#1769AA] dark:bg-sky-400" />
                ЭМД-ын 75% хөнгөлөлттэй тусламж
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={HOSPITAL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Солонго эмнэлгийн Facebook хуудас"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1769AA] dark:text-sky-400 hover:bg-[#1769AA] dark:hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={HOSPITAL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Солонго эмнэлгийн YouTube суваг"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1769AA] dark:text-sky-400 hover:bg-[#1769AA] dark:hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="mailto:contact@solongohospital.mn"
                aria-label="И-мэйл бичих"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1769AA] dark:text-sky-400 hover:bg-[#1769AA] dark:hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Үйлчилгээ */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#123B63] dark:text-sky-300 mb-4 tracking-tight">
              Үйлчилгээ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    <span className="line-clamp-1">{service.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63] dark:hover:text-sky-300 transition-colors"
                >
                  <span>Бүх үйлчилгээ үзэх</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Мэдээлэл */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#123B63] dark:text-sky-300 mb-4 tracking-tight">
              Мэдээлэл
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Бидний тухай & Үнэт зүйл</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Эмч, мэргэжилтнүүд</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/advice"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Эрүүл мэндийн зөвлөгөө</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about/history"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Түүхэн замнал</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Салбар эмнэлгүүд</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  <span>Нууцлалын бодлого</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Холбоо барих */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-[#123B63] dark:text-sky-300 mb-4 tracking-tight">
              Холбоо барих
            </h4>

            {/* Phone */}
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <a
                  href="tel:77056699"
                  className="font-bold text-[#123B63] dark:text-sky-200 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors block"
                >
                  7705-6699 / 7706-6699
                </a>
                <span className="text-[#64748B] dark:text-slate-400 text-xs">7709-6699 / 7701-6699</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <a
                href="mailto:contact@solongohospital.mn"
                className="text-[#263747] dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors break-all"
              >
                contact@solongohospital.mn
              </a>
            </div>

            {/* Addresses */}
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-[#263747] dark:text-slate-300">
                <p>
                  <strong className="text-[#123B63] dark:text-sky-300">Төв эмнэлэг:</strong> Дүнжингарав худалдааны төвийн урд, Санрайс (Sunrise) хотхон
                </p>
                <p>
                  <strong className="text-[#123B63] dark:text-sky-300">UBH салбар:</strong> Багшийн дээдийн урд UBH center 4 давхар 415 тоот
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-[#64748B] dark:text-slate-400">
                <p>Даваа - Баасан: 08:30 - 16:30</p>
                <p>Бямба: 10:00 - 14:00 (Ням: Амарна)</p>
              </div>
            </div>

            {/* Online Booking Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-2.5 px-4 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Цаг захиалах (Medsoft)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sub-footer / Copyright */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-xs text-[#64748B] dark:text-slate-400 transition-colors">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Солонго нүдний эмнэлэг (Solongo Eye Hospital). Бүх эрх хуулиар хамгаалагдсан.
          </div>
          <div className="flex items-center gap-5 font-medium">
            <Link to="/privacy" className="hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors">
              Нууцлалын бодлого
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link to="/contact" className="hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors">
              Санал хүсэлт
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={HOSPITAL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
