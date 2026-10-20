import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Eye,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { HOSPITAL_INFO, SERVICES, NEWS_ITEMS } from '../utils/hospitalData.ts';
import { useToast } from '../context/ToastContext.tsx';
import { PatientSuccessStories } from '../components/PatientSuccessStories.tsx';
import { EyeExercise } from '../components/EyeExercise.tsx';
import { sendFeedbackApi, validateFeedbackInput } from '../utils/feedbackService.ts';

interface HomePageProps {
  onOpenAppointment: () => void;
}

// Professional clinic facilities, examination, and surgical photography for hero slider
const HERO_PHOTOS = [
  {
    id: 1,
    title: 'Хүлээн авах, зөвлөгөө мэдээллийн орчин үеийн танхим',
    subtitle: 'Үйлчлүүлэгч бүрт тав тухтай, найрсаг үйлчилгээ',
    category: 'Харилцагчийн үйлчилгээ',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Солонго эмнэлгийн хүлээн авах хэсэг',
  },
  {
    id: 2,
    title: 'Дэвшилтэт оптометрийн үзлэг, хараа оношилгоо',
    subtitle: 'Компьютер оношилгоо, нүдний хугарлын гажгийг нарийн тодорхойлох',
    category: 'Оптометр, хараа шалгалт',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=85',
    alt: 'Хараа зүйч эмч өвчтөний хараа шалгаж буй нь',
  },
  {
    id: 3,
    title: 'Өндөр нарийвчлалтай биомикроскопийн үзлэг',
    subtitle: 'Нүдний уг, эвэрлэг болон болорын нарийн бүтцийн оношилгоо',
    category: 'Нүдний уг, эвэрлэгийн оношилгоо',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    alt: 'Нүдний эмч биомикроскопоор үзэж буй нь',
  },
  {
    id: 4,
    title: 'Олон улсын стандартын ариутгалтай бичил мэс заслын өрөө',
    subtitle: 'Хэт авианы фако аргаар болор солих болон лазер эмчилгээ',
    category: 'Бичил мэс засал',
    url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Бичил мэс заслын өрөөний тоноглол',
  },
];

// Featured service photo cards
const FEATURED_SERVICES = [
  {
    id: 's1',
    title: 'Үзлэг оношилгоо',
    path: '/services/eye-examination',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    desc: 'Биомикроскопи, авторефракци, нүдний даралт болон угийн нарийн оношилгоо',
  },
  {
    id: 's2',
    title: 'Эмчилгээ шинжилгээ',
    path: '/services',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    desc: 'ОСТ томографи, харааны талбай, хуурай нүдний эмчилгээ, лазер эмчилгээ',
  },
  {
    id: 's3',
    title: 'Мэс засал',
    path: '/services/cataract-surgery',
    imageUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80',
    desc: 'Болор солих (Фако), хараа тэглэх лазер, зовхины бичил мэс засал',
  },
];

// News & Announcements posters matching Reference design
const NEWS_POSTERS = [
  {
    id: 'n1',
    title: 'Олон улсын магадлан итгэмжлэгдсэн нүдний төв',
    badge: 'Магадлан итгэмжлэл',
    date: '2025-01-15',
    path: '/news/international-specialist-visit-rp-singh',
    bgColor: 'from-[#123B63] to-[#1769AA]',
    posterText: 'Олон улсын магадлан итгэмжлэлийн төв\nМонголд анх удаа "Эрүүл мэндийн тусламж үйлчилгээний чанарын гэрчилгээ" гардан авлаа',
  },
  {
    id: 'n2',
    title: 'Сар шинийн өдрүүдээр ажиллах цагийн хуваарь',
    badge: 'Цагийн хуваарь',
    date: '2025-02-10',
    path: '/news/cataract-emd-75-discount',
    bgColor: 'from-[#004e8a] to-[#0284c7]',
    posterText: 'САР ШИНИЙН БАЯРЫН ӨДРҮҮДЭД\nТөв эмнэлэг болон салбаруудын\nажиллах цагийн хуваарь',
  },
  {
    id: 'n3',
    title: 'Глауком сэрэмжлүүлэх 7 хоног',
    badge: 'Урьдчилан сэргийлэлт',
    date: '2025-03-01',
    path: '/news/pediatric-eye-screening-month',
    bgColor: 'from-[#1769AA] to-[#2563eb]',
    posterText: 'ГЛАУКОМ СЭРЭМЖЛҮҮЛЭХ 7 ХОНОГ\nНүдний даралтын үзлэг болон ОСТ шинжилгээ\nЭМД-аар хөнгөлөлттэй хийгдэж байна',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointment }) => {
  const { toast } = useToast();

  // Hero Slider active index
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Quick feedback form state in the blue banner
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackContact, setFeedbackContact] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  // Auto-advance hero carousel every 3 seconds (fast and responsive)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_PHOTOS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_PHOTOS.length);
  };

  // Real feedback submit handler
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateFeedbackInput({
      name: feedbackName,
      contact: feedbackContact,
      message: feedbackMessage,
    });

    if (!validation.valid) {
      toast.error('Маягт дутуу байна', validation.error || 'Мэдээллээ бүрэн оруулна уу.');
      return;
    }

    setIsSendingFeedback(true);
    try {
      await sendFeedbackApi({
        name: feedbackName,
        contact: feedbackContact,
        message: feedbackMessage,
        source: 'home',
      });

      toast.success(
        'Санал хүсэлтийг амжилттай илгээлээ!',
        'Бид таны илгээсэн санал хүсэлттэй танилцан шаардлагатай бол холбоо барих болно.'
      );
      setFeedbackName('');
      setFeedbackContact('');
      setFeedbackMessage('');
    } catch (err: any) {
      const errorMsg =
        err?.message ||
        'Сервертэй холбогдоход алдаа гарлаа. Та дахин оролдоно уу эсвэл 7705-6699 утсаар холбогдоно уу.';
      toast.error('Илгээхэд алдаа гарлаа', errorMsg);
    } finally {
      setIsSendingFeedback(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-[#263747] dark:text-slate-100 space-y-0 overflow-x-hidden transition-colors">
      {/* ===================================================================== */}
      {/* 1. HERO HIGH-QUALITY IMAGE SLIDER                                     */}
      {/* ===================================================================== */}
      <section
        className="relative bg-slate-900 overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Эмнэлгийн зурагт танилцуулга"
      >
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px]">
          {/* Main Slide Images */}
          {HERO_PHOTOS.map((photo, idx) => (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Subtle Gradient Overlays for readable text and medical warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

              {/* Slide Text Content inside strictly aligned 1280px site-container */}
              <div className="absolute inset-0 flex items-center">
                <div className="site-container w-full">
                  <div className="max-w-2xl text-white space-y-3 sm:space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1769AA]/80 backdrop-blur-xs text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                      <span>{photo.category}</span>
                    </span>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                      {photo.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-200 line-clamp-2 max-w-xl font-normal leading-relaxed">
                      {photo.subtitle}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={onOpenAppointment}
                        className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1769AA] hover:bg-[#123B63] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-white" />
                        <span>Цаг захиалах (Medsoft)</span>
                      </button>

                      <Link
                        to="/services"
                        className="px-5 py-2.5 sm:py-3 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-xs transition-colors"
                      >
                        Үйлчилгээ үзэх
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Prev/Next Buttons */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Өмнөх зураг"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer z-20 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Дараагийн зураг"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer z-20 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {HERO_PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Слайд ${i + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. 3 CIRCULAR MISSION & STRATEGY CARDS WITH INCREASED WHITESPACE      */}
      {/* ===================================================================== */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center md:text-left">
            {/* Card 1: Vision */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1769AA] dark:border-sky-400 text-[#1769AA] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Eye className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#123B63] dark:text-sky-300">
                  АЛСЫН ХАРАА 2023-2034 ОН
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Монгол хүний эрүүл нүдний төлөө
                </p>
              </div>
            </div>

            {/* Card 2: Motto */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1769AA] dark:border-sky-400 text-[#1769AA] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#123B63] dark:text-sky-300">
                  БИДНИЙ УРИА
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Бид тогтвортой хөгжлийг хангасан, энэрэнгүй хамт олон байж ажилтан, үйлчлүүлэгчийн номер нэг сонголт байна.
                </p>
              </div>
            </div>

            {/* Card 3: Strategy */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1769AA] dark:border-sky-400 text-[#1769AA] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#123B63] dark:text-sky-300">
                  БАРИМТЛАХ СТРАТЕГИ
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Салбартаа дэвшилтэт технологи, эмнэлгийн менежмент, хүний нөөцийн бодлогоор ямагт тэргүүлнэ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. FEATURED SERVICES PHOTO CARDS                                      */}
      {/* ===================================================================== */}
      {/* ===================================================================== */}
      {/* 3. FEATURED SERVICES PHOTO CARDS                                      */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="site-container space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B63] dark:text-sky-300 tracking-tight uppercase">
              ҮЙЛЧИЛГЭЭ
            </h2>
            <div className="w-12 h-1 bg-[#1769AA] dark:bg-sky-500 mx-auto rounded-full" />
            <p className="text-sm text-[#64748B] dark:text-slate-400 max-w-xl mx-auto pt-1">
              Олон улсын стандартад нийцсэн оношилгоо, эмчилгээ болон бичил мэс засал
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {FEATURED_SERVICES.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] shadow-xs hover:shadow-2xl hover:shadow-[#1769AA]/20 hover:-translate-y-2 hover:scale-[1.025] active:scale-[0.99] transition-all duration-300 ease-out block focus:outline-none transform-gpu will-change-transform border border-slate-100 dark:border-slate-800"
              >
                {/* Background Photo */}
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent group-hover:from-slate-950/90 transition-colors duration-300" />

                {/* Bottom Label and Description */}
                <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90 font-normal">
                    {service.desc}
                  </p>
                  <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1.5 transition-all">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1769AA] dark:border-sky-500 text-[#1769AA] dark:text-sky-400 hover:bg-[#1769AA] dark:hover:bg-sky-600 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Бүх үйлчилгээтэй танилцах</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. PATIENT SUCCESS STORIES (Clean Minimalist Testimonials)             */}
      {/* ===================================================================== */}
      <PatientSuccessStories />

      {/* ===================================================================== */}
      {/* 5. 20-20-20 EYE EXERCISE / DIGITAL HEALTH HELPER                      */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="site-container">
          <EyeExercise />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. SOFT LIGHT BLUE FEEDBACK BANNER "Санал хүсэлт"                     */}
      {/* ===================================================================== */}
      <section className="bg-[#F5F9FD] dark:bg-slate-800/60 py-16 sm:py-24 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="site-container max-w-4xl text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B63] dark:text-sky-300 tracking-tight">
              Санал хүсэлт
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Та Солонго нүдний эмнэлгийн талаар санал хүсэлт илгээх бол доорх мэдээллийг бөглөнө үү. Бид таны санал хүсэлтийн дагуу эргэн холбогдох болно.
            </p>
          </div>

          {/* Clean Quick Feedback Form */}
          <form
            onSubmit={handleFeedbackSubmit}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-xs border border-blue-100 dark:border-slate-700 max-w-2xl mx-auto text-left space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hp-fb-name" className="block text-xs font-bold text-[#123B63] dark:text-sky-200 mb-1">
                  Таны нэр:
                </label>
                <input
                  id="hp-fb-name"
                  type="text"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="Овог нэр"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 bg-white dark:bg-slate-800 transition-all text-[#263747] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div>
                <label htmlFor="hp-fb-contact" className="block text-xs font-bold text-[#123B63] dark:text-sky-200 mb-1">
                  Утас эсвэл И-мэйл:
                </label>
                <input
                  id="hp-fb-contact"
                  type="text"
                  value={feedbackContact}
                  onChange={(e) => setFeedbackContact(e.target.value)}
                  placeholder="88112233 эсвэл user@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 bg-white dark:bg-slate-800 transition-all text-[#263747] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hp-fb-msg" className="block text-xs font-bold text-[#123B63] dark:text-sky-200 mb-1">
                Санал хүсэлтийн утга:
              </label>
              <textarea
                id="hp-fb-msg"
                rows={3}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Таны санал, сэтгэгдэл, хүсэлт..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 bg-white dark:bg-slate-800 transition-all resize-none text-[#263747] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              <span className="text-[11px] text-[#64748B] dark:text-slate-400">
                Бид таны мэдээллийн нууцыг чандлан хадгална.
              </span>
              <button
                type="submit"
                disabled={isSendingFeedback}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSendingFeedback ? (
                  <span>Илгээж байна...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Илгээх</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. NEWS & ANNOUNCEMENTS POSTERS                                       */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="site-container space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B63] dark:text-sky-300 tracking-tight">
              Мэдээ, мэдээлэл
            </h2>
            <div className="w-12 h-1 bg-[#1769AA] dark:bg-sky-500 mx-auto rounded-full" />
            <p className="text-sm text-[#64748B] dark:text-slate-400 max-w-xl mx-auto pt-1">
              Эрүүл мэндийн зөвлөгөө, цагийн хуваарийн шинэчлэл, эмнэлгийн үйл явдал
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {NEWS_POSTERS.map((poster) => (
              <Link
                key={poster.id}
                to={poster.path}
                className="group bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 ease-out flex flex-col focus:outline-none transform-gpu will-change-transform"
              >
                {/* Poster Graphic Header */}
                <div
                  className={`p-6 sm:p-8 bg-gradient-to-br ${poster.bgColor} text-white flex flex-col justify-between min-h-[220px] relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      {poster.badge}
                    </span>
                    <span className="text-xs text-white/80">{poster.date}</span>
                  </div>

                  <div className="z-10 my-auto text-center py-4">
                    <p className="text-sm sm:text-base font-extrabold whitespace-pre-line leading-relaxed tracking-tight group-hover:scale-102 transition-transform">
                      {poster.posterText}
                    </p>
                  </div>

                  <div className="text-right z-10">
                    <span className="text-[11px] text-white/70">Солонго эмнэлэг</span>
                  </div>

                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                </div>

                {/* Card Title & Link */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-800/90">
                  <h3 className="font-bold text-[#123B63] dark:text-slate-100 text-sm group-hover:text-[#1769AA] dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                    {poster.title}
                  </h3>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-[#1769AA] dark:text-sky-400">
                    <span>Дэлгэрэнгүй унших</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA] dark:text-sky-400 hover:underline uppercase tracking-wider"
            >
              <span>Бүх мэдээг харах</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. OFFICIAL PARTNERSHIPS "Хамтын ажиллагаа"                           */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#F5F9FD] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="site-container space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B63] dark:text-sky-300 tracking-tight">
              Хамтын ажиллагаа
            </h2>
            <div className="w-12 h-1 bg-[#1769AA] dark:bg-sky-500 mx-auto rounded-full" />
          </div>

          {/* Official Partner Logos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
            {/* Partner 1: ebarimt */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center text-center space-y-2 h-32 hover:border-[#1769AA] dark:hover:border-sky-500 transition-colors">
              <span className="text-2xl font-black text-rose-500 tracking-tight">
                ebarimt
              </span>
              <span className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                НӨАТ-ын нэгдсэн систем
              </span>
            </div>

            {/* Partner 2: Health Insurance General Office */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center text-center space-y-2 h-32 hover:border-[#1769AA] dark:hover:border-sky-500 transition-colors">
              <div className="flex items-center gap-2 text-[#1769AA] dark:text-sky-400">
                <ShieldCheck className="w-7 h-7 stroke-[2]" />
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#123B63] dark:text-slate-100 text-left leading-tight">
                  Эрүүл мэндийн<br />даатгалын ерөнхий газар
                </span>
              </div>
              <span className="text-[11px] text-[#64748B] dark:text-slate-400 font-medium">
                ЭМД 75% хөнгөлөлт
              </span>
            </div>

            {/* Partner 3: Khan Bank */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center text-center space-y-2 h-32 hover:border-[#1769AA] dark:hover:border-sky-500 transition-colors">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                ХААН БАНК
              </span>
              <span className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                Хамтран ажиллагч байгууллага
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
