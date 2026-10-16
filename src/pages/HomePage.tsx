import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Eye,
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  ChevronRight,
  Activity,
  Smile,
  Glasses,
  ShieldAlert,
  Zap,
  Scissors,
  Building2,
  ExternalLink
} from 'lucide-react';
import { HOSPITAL_INFO, SERVICES, DOCTORS, BRANCHES, NEWS_ITEMS } from '../utils/hospitalData.ts';
import { EyeCheckReminder } from '../components/EyeCheckReminder.tsx';
import { Testimonials } from '../components/Testimonials.tsx';

interface HomePageProps {
  onOpenAppointment: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointment }) => {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Eye': return <Eye className="w-6 h-6 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-cyan-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-emerald-600" />;
      case 'Glasses': return <Glasses className="w-6 h-6 text-indigo-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-violet-600" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-sky-600" />;
      default: return <Eye className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs sm:text-sm font-semibold border border-teal-500/30 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>ЭМД-аар 75% хөнгөлөлттэй тусламж үйлчилгээ</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                {HOSPITAL_INFO.slogan}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Нүдний иж бүрэн үзлэг, оношилгоо, болор солих бичил мэс засал болон хараа засах орчин үеийн тусламж үйлчилгээг олон улсын стандартаар үзүүлж байна.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base rounded-xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Цаг захиалах (Medsoft)</span>
                </button>

                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/15 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Үйлчилгээтэй танилцах</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Direct Call & Emergency Quick Info */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Лавлах утас: <strong className="text-white">7705-6699</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Даваа-Баасан: 08:30 - 16:30</span>
                </div>
              </div>
            </div>

            {/* Right Card / Trust Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-base">Мэргэжлийн түвшин</h2>
                      <div className="text-xs text-slate-400">Дэвшилтэт технологи, олон жилийн туршлага</div>
                    </div>
                  </div>
                </div>

                {/* Key feature list */}
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-100 block">Болрын мэс засал ЭМД-аар 75% хөнгөлөлттэй</strong>
                      <span className="text-xs text-slate-400">Хэт авианы бичил зүслэгтэй фако аргаар өдрөөр хийгдэнэ.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-100 block">БНЭУ-ын зөвлөх эмч Dr. R.P. Singh</strong>
                      <span className="text-xs text-slate-400">Олон улсын нүдний мэс заслын 30 гаруй жилийн арвин туршлага.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-100 block">Улаанбаатар хотод 3 салбар</strong>
                      <span className="text-xs text-slate-400">Төв эмнэлэг (Санрайс хотхон), UBH салбар, Хараа заслын төв.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-slate-100 block">Medsoft онлайн цаг захиалга</strong>
                      <span className="text-xs text-slate-400">Цахим системээр эмчийн сул цагийг харж шууд захиалах боломжтой.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={HOSPITAL_INFO.onlineBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-teal-600/30 hover:bg-teal-600/40 text-teal-300 font-semibold text-xs sm:text-sm rounded-xl border border-teal-500/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Цахимаар цаг захиалах (solongo.medsoft.care)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Pillars & Strategic Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
              Алсын хараа 2023-2034
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Монгол хүний эрүүл нүдний төлөө
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Монгол хүний эрүүл харааг хамгаалах, урьдчилан сэргийлэх, дэлхийн дэвшилтэт бичил мэс заслын технологиор тэргүүлэгч байна.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
              Бидний уриа
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Энэрэнгүй хамт олон
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Тогтвортой хөгжлийг хангасан, энэрэнгүй хамт олон байж ажилтан, үйлчлүүлэгчийн номер нэг сонголт байна.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
              Баримтлах стратеги
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Салбартаа технологиор тэргүүлэх
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Салбартаа дэвшилтэт технологи, эмнэлгийн менежмент, хүний нөөцийн бодлогоор ямагт тэргүүлэх чиглэлийг баримталдаг.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
              Үндсэн чиглэл
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Эмнэлгийн тусламж, үйлчилгээ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Солонго нүдний эмнэлэгт насанд хүрэгчид болон хүүхдийн нүдний бүх төрлийн нарийн мэргэжлийн үзлэг, оношилгоо, мэс засал хийгдэж байна.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors shrink-0"
          >
            <span>Бүх 8 үйлчилгээг харах</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-teal-500 hover:shadow-xl transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-teal-50 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>Дэлгэрэнгүй</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Цаг авах
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner: Cataract 75% EMD Discount */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Эрүүл мэндийн даатгалын хөнгөлөлт
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Болор солих мэс засал ЭМД-аар 75% хөнгөлөгдөнө
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Нүдний болор цайх өвчнийг хэт авианы бичил зүслэгтэй (фако) аргаар өдрөөр эмчилж байна. Олон улсын жишигт нийцсэн өндөр технологийн уян хиймэл болор суулгана.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Мэс заслын үзлэгийн цаг захиалах</span>
              </button>
              <Link
                to="/services/cataract-surgery"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
              >
                Мэс заслын талаар дэлгэрэнгүй
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
              Мэргэшсэн баг
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Эмч, мэргэжилтнүүд
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Олон улсын зөвлөх профессор, нарийн мэргэжлийн туршлагатай нүдний эмч нарын баг таны харааг хамгаалан ажиллаж байна.
            </p>
          </div>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Бүх эмч нарыг харах</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.slice(0, 3).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{doctor.name}</h3>
                    <p className="text-xs font-medium text-teal-700">{doctor.role}</p>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Туршлага: {doctor.experienceYears} жил
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1.5">
                  <div className="font-semibold text-slate-800">Мэргэшил чиглэл:</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    {doctor.specialties.slice(0, 2).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{doctor.branches.join(', ')}</span>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="font-semibold text-teal-700 hover:text-teal-800"
                >
                  Цаг авах →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Testimonials Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <Testimonials onOpenAppointment={onOpenAppointment} />
      </section>

      {/* Interactive 20-20-20 Eye Strain Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <EyeCheckReminder />
      </section>

      {/* Branches & Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            Байршил & Холбоо барих
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Салбар эмнэлгүүд
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Та өөрт хамгийн ойр салбарыг сонгон мэргэжлийн эмчид үзүүлээрэй.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between ${
                branch.isMain
                  ? 'bg-gradient-to-br from-teal-50/70 to-white border-teal-300 ring-2 ring-teal-500/20'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    {branch.isMain ? '★ Төв эмнэлэг' : 'Салбар'}
                  </span>
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>

                <h3 className="font-bold text-slate-900 text-lg">{branch.name}</h3>
                <p className="text-xs text-slate-600">{branch.address}</p>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Даваа-Баасан: {branch.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-semibold text-slate-800">{branch.phones.join(' / ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between gap-2">
                <a
                  href={`tel:${branch.phones[0].replace(/[^\d]/g, '')}`}
                  className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                >
                  Шууд залгах
                </a>
                <Link
                  to="/branches"
                  className="text-xs font-semibold text-teal-700 hover:underline"
                >
                  Байршил харах →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
              Сүүлийн үеийн мэдээ
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Мэдээ, мэдээлэл
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Бүх мэдээг унших</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-semibold bg-teal-50 text-teal-700">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-mono">{item.publishedDate}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base hover:text-teal-700 transition-colors">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Унших хугацаа: {item.readTime}</span>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <span>Унших</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Online Booking Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Эмчид үзүүлэх цагаа онлайнаар захиалаарай
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Хүлээгдэлгүй, найдвартай үйлчилгээ авахын тулд манай цахим захиалгын систем (Medsoft)-ийг ашиглана уу. Мөн утсаар холбогдож зөвлөгөө авах боломжтой.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-teal-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Цаг захиалах (Medsoft)</span>
            </button>
            <a
              href="tel:77056699"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Лавлах утас: 7705-6699</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
