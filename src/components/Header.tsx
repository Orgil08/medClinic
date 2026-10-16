import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, Calendar, Menu, X, ChevronDown, Eye, ShieldCheck } from 'lucide-react';
import { HOSPITAL_INFO } from '../utils/hospitalData.ts';

interface HeaderProps {
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Нүүр', path: '/' },
    {
      name: 'Бидний тухай',
      path: '/about',
      hasDropdown: true,
      children: [
        { name: 'Танилцуулга & Үнэт зүйл', path: '/about' },
        { name: 'Түүхэн замнал', path: '/about/history' },
      ],
    },
    { name: 'Үйлчилгээ', path: '/services' },
    { name: 'Эмч нар', path: '/doctors' },
    { name: 'Мэдээлэл', path: '/news' },
    { name: 'Зөвлөгөө', path: '/advice' },
    { name: 'Салбарууд', path: '/branches' },
    { name: 'Холбоо барих', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top utility contact bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left phone & hours */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="tel:77056699"
              className="flex items-center gap-1.5 hover:text-teal-400 transition-colors"
              title="Шууд залгах"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-white">7705-6699</span>
              <span className="text-slate-400">/ 7706-6699</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="mailto:contact@solongohospital.mn"
              className="hidden md:flex items-center gap-1.5 hover:text-teal-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>contact@solongohospital.mn</span>
            </a>
            <span className="hidden lg:inline text-slate-600">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Даваа-Баасан 08:30 - 16:30</span>
            </div>
          </div>

          {/* Right badge & booking link */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
              <ShieldCheck className="w-3 h-3" />
              ЭМД-аар 75% хөнгөлөлттэй
            </span>
            <a
              href={HOSPITAL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 text-slate-400 transition-colors"
              aria-label="Facebook хуудас"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Солонго эмнэлэг нүүр хуудас">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
            <Eye className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">
                СОЛОНГО
              </span>
              <span className="font-semibold text-teal-700 text-xs sm:text-sm tracking-wide uppercase">
                НҮДНИЙ ЭМНЭЛЭГ
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block tracking-normal font-normal">
              Монгол хүний эрүүл нүдний төлөө
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Үндсэн цэс">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive('/about')
                        ? 'text-teal-700 bg-teal-50'
                        : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 w-52 py-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {link.children?.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`block px-4 py-2 text-xs font-medium ${
                            location.pathname === child.path
                              ? 'text-teal-700 bg-teal-50/80 font-semibold'
                              : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                          }`}
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Цаг захиалах</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Цэс хаах' : 'Цэс нээх'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.name} className="space-y-1 py-1">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {link.name}
                  </div>
                  {link.children?.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm rounded-lg ${
                        location.pathname === child.path
                          ? 'bg-teal-50 text-teal-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white font-semibold rounded-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>Цаг захиалах (Medsoft)</span>
            </button>
            <a
              href="tel:77056699"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-800 font-medium rounded-xl text-sm"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Утсаар холбогдох: 7705-6699</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
