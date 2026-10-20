import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Search,
  Clock,
  Sun,
  Moon,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../utils/hospitalData.ts';
import { GlobalSearchBar } from './GlobalSearchBar.tsx';
import { SolongoLogo } from './SolongoLogo.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

interface HeaderProps {
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    {
      name: 'БИДНИЙ ТУХАЙ',
      path: '/about',
      hasDropdown: true,
      children: [
        { name: 'Танилцуулга & Үнэт зүйл', path: '/about' },
        { name: 'Түүхэн замнал', path: '/about/history' },
        { name: 'Эмч, мэргэжилтнүүд', path: '/doctors' },
      ],
    },
    { name: 'ҮЙЛЧИЛГЭЭ', path: '/services' },
    { name: 'ЗӨВЛӨГӨӨ', path: '/advice' },
    { name: 'МЭДЭЭ МЭДЭЭЛЭЛ', path: '/news' },
    { name: 'ХОЛБОО БАРИХ', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 shadow-2xs border-b border-slate-100 dark:border-slate-800 transition-colors duration-250">
      {/* 1. Top Solid Royal Blue Utility Bar */}
      <div className="bg-[#1769AA] dark:bg-[#0f4570] text-white text-xs py-2 border-b border-[#125688] dark:border-[#0a3150] transition-colors">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Social Media Icons (Facebook, YouTube, Mail) */}
          <div className="flex items-center gap-3.5">
            <a
              href={HOSPITAL_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook хуудас"
              className="text-white/90 hover:text-white transition-opacity"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={HOSPITAL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube суваг"
              className="text-white/90 hover:text-white transition-opacity"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <span className="hidden md:inline-block w-px h-3 bg-white/30" />
            <div className="hidden md:flex items-center gap-1.5 text-white/90 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-sky-200" />
              <span>Даваа-Баасан 08:30 - 16:30</span>
            </div>
          </div>

          {/* Right: Contact Email and Multiple Phone Lines */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-1 text-[11px] sm:text-xs">
            <a
              href="mailto:contact@solongohospital.mn"
              className="hidden lg:flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-200" />
              <span>contact@solongohospital.mn</span>
            </a>
            <div className="flex items-center gap-1.5 text-white">
              <Phone className="w-3.5 h-3.5 text-sky-200 shrink-0" />
              <a href="tel:77056699" className="font-semibold tracking-wide hover:underline">
                7705-6699 / 7706-6699
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main White Minimalist Navigation Header with 1280px container & balanced spacing */}
      <div className="site-container py-3 sm:py-3.5 flex items-center justify-between">
        {/* Solongo Eye Hospital Official Brand Logo */}
        <Link
          to="/"
          className="flex items-center group focus:outline-none shrink-0 py-1 mr-4 lg:mr-8"
          aria-label="Солонго эмнэлэг нүүр хуудас"
        >
          <SolongoLogo className="h-9 sm:h-10 md:h-11 w-auto" />
        </Link>

        {/* Desktop Minimalist Navigation Bar with clean spacing */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold tracking-wider text-[#263747] uppercase"
          aria-label="Үндсэн цэс"
        >
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
                    className={`inline-flex items-center gap-1 py-1 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors ${
                      isActive('/about') ? 'text-[#1769AA] dark:text-sky-400' : 'text-[#263747] dark:text-slate-200'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 w-56 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {link.children?.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`block px-4 py-2.5 text-xs font-semibold ${
                            location.pathname === child.path
                              ? 'text-[#1769AA] dark:text-sky-400 bg-blue-50 dark:bg-slate-700/60 font-bold'
                              : 'text-slate-700 dark:text-slate-200 hover:text-[#1769AA] dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-700'
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
                className={`py-1 hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors ${
                  isActive(link.path) ? 'text-[#1769AA] dark:text-sky-400 font-extrabold' : 'text-[#263747] dark:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button, Theme Toggle, Global Search & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* User-Controlled Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#1769AA] dark:hover:text-amber-200 transition-all cursor-pointer shadow-2xs focus:outline-none flex items-center justify-center shrink-0"
            aria-label={isDark ? 'Гэрэлтэй горимд шилжих' : 'Харанхуй горимд шилжих'}
            title={isDark ? 'Гэрэлтэй горимд шилжих' : 'Харанхуй горимд шилжих'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            )}
          </button>

          {/* Desktop Global Search Bar */}
          <div className="hidden md:block">
            <GlobalSearchBar />
          </div>

          {/* Appointment CTA button */}
          <button
            type="button"
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Цаг захиалах</span>
          </button>

          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label={mobileSearchOpen ? 'Хайлт хаах' : 'Хайлт нээх'}
            aria-expanded={mobileSearchOpen}
          >
            <Search className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (mobileSearchOpen) setMobileSearchOpen(false);
            }}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Цэс хаах' : 'Цэс нээх'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown Drawer */}
      {mobileSearchOpen && (
        <div className="md:hidden p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 animate-in fade-in duration-200">
          <GlobalSearchBar />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                className={`block px-3 py-2.5 rounded-lg text-sm font-bold uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#1769AA] dark:text-sky-400 bg-blue-50 dark:bg-slate-800'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="pl-6 space-y-1 py-1">
                  {link.children?.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className="block px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:text-[#1769AA] dark:hover:text-sky-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 bg-[#1769AA] dark:bg-sky-600 hover:bg-[#123B63] dark:hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Цаг захиалах (Medsoft)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
