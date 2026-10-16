import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Phone, Mail, MapPin, Calendar, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { HOSPITAL_INFO, BRANCHES, SERVICES } from '../utils/hospitalData.ts';

interface FooterProps {
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top CTA banner */}
      <div className="bg-gradient-to-r from-teal-900/50 via-slate-900 to-cyan-950/60 border-b border-slate-800/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Эрүүл нүд — Гэрэлт ирээдүй
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Та цагаа онлайнаар урьдчилан захиалснаар дараалалгүй, хурдан шуурхай үйлчлүүлэх боломжтой.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Цаг захиалах (Medsoft)</span>
            </button>
            <a
              href="tel:77056699"
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>7705-6699</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 shadow-md">
              <Eye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight block">
                СОЛОНГО
              </span>
              <span className="text-teal-400 text-xs font-semibold tracking-wider uppercase block">
                НҮДНИЙ ЭМНЭЛЭГ
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Монгол хүний эрүүл нүдний төлөө олон улсын жишигт нийцсэн нарийн мэргэжлийн үзлэг, оношилгоо, бичил мэс заслын дэвшилтэт тусламж үйлчилгээ үзүүлж байна.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              ЭМД-ын 75% хөнгөлөлттэй
            </span>
          </div>
        </div>

        {/* Col 2: Services Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
            Үйлчилгээ
          </h4>
          <ul className="space-y-2 text-xs">
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.id}>
                <Link
                  to={`/services/${service.slug}`}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600">›</span>
                  <span>{service.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-teal-400 hover:underline font-medium inline-block pt-1">
                Бүх үйлчилгээг харах →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Navigation & Information */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
            Мэдээлэл
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="hover:text-teal-400 transition-colors">
                Бидний тухай & Үнэт зүйл
              </Link>
            </li>
            <li>
              <Link to="/about/history" className="hover:text-teal-400 transition-colors">
                Түүхэн замнал
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-teal-400 transition-colors">
                Эмч, мэргэжилтнүүд
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-teal-400 transition-colors">
                Мэдээ, зарлал
              </Link>
            </li>
            <li>
              <Link to="/advice" className="hover:text-teal-400 transition-colors">
                Эрүүл мэндийн зөвлөгөө
              </Link>
            </li>
            <li>
              <Link to="/branches" className="hover:text-teal-400 transition-colors">
                Салбар эмнэлгүүд
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-teal-400 transition-colors">
                Нууцлалын бодлого
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Branches & Contact */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
            Салбаруудын хаяг
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <div className="font-semibold text-slate-200">Төв эмнэлэг:</div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Дүнжингарав худалдааны төвийн урд Санрайс хотхон, 26-р хороо
              </p>
              <div className="text-teal-400 text-[11px] font-mono mt-0.5">Утас: 7705-6699</div>
            </div>

            <div>
              <div className="font-semibold text-slate-200">UBH Салбар:</div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Багшийн дээдийн урд UBH Center 4 давхар, 415 тоот
              </p>
              <div className="text-teal-400 text-[11px] font-mono mt-0.5">Утас: 7706-6699</div>
            </div>

            <div>
              <div className="font-semibold text-slate-200">Хараа заслын төв:</div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Сүхбаатар дүүрэг, Натурын зам, MPM цогцолбор 2-р давхар
              </p>
              <div className="text-teal-400 text-[11px] font-mono mt-0.5">Утас: 7701-6699</div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href={HOSPITAL_INFO.onlineBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
              >
                <span>Онлайн цаг захиалах (Medsoft)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-8 bg-black/40 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Солонго нүдний эмнэлэг (Solongo Eye Hospital). Бүх эрх хуулиар хамгаалагдсан.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Нууцлалын бодлого
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Санал хүсэлт илгээх
            </Link>
            <a
              href={HOSPITAL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
