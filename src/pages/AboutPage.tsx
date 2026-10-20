import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Award, Heart, CheckCircle2, Users, Building, ArrowRight, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../utils/hospitalData.ts';

interface AboutPageProps {
  onOpenAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="space-y-16 py-10 sm:py-14 site-container">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
          <Eye className="w-4 h-4" />
          <span>Танилцуулга</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Солонго нүдний эмнэлэг
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {HOSPITAL_INFO.slogan} — Бид тогтвортой хөгжлийг хангасан, энэрэнгүй хамт олон байж ажилтан, үйлчлүүлэгчийн номер нэг сонголт байна.
        </p>
      </div>

      {/* Main Intro Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Монголын нүд судлалын дэвшилтэт тусламж
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Солонго нүдний эмнэлэг нь анх байгуулагдсан цагаасаа хойш ард иргэдийнхээ харааны эрүүл мэндийг хамгаалах, сохролоос сэргийлэх, орчин үеийн оношилгоо, бичил мэс заслын технологиор тэргүүлэн үйлчилж ирлээ.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Бид өнөөдөр Улаанбаатар хотод Төв эмнэлэг (Санрайс хотхон), UBH салбар эмнэлэг болон Солонго хараа заслын төв гэсэн 3 үндсэн цэгээр насанд хүрэгчид болон хүүхдийн нүдний тусламж үйлчилгээг стандартын өндөр түвшинд хүргэж байна.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/about/history"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors"
            >
              <span>Түүхэн замналтай танилцах</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1769AA] hover:bg-[#123B63] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Цаг захиалах</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-blue-950/40 rounded-2xl p-6 sm:p-8 border border-blue-100 dark:border-blue-900/60 space-y-4">
          <h3 className="font-bold text-[#123B63] dark:text-sky-300 text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1769AA] dark:text-sky-400" />
            <span>Гол зарчмууд</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <span>Олон улсын стандартад нийцсэн өндөр нарийвчлалтай тоног төхөөрөмж</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <span>Эрүүл мэндийн даатгалын 75% хүртэлх албан ёсны хөнгөлөлт</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <span>БНСУ-ын зөвлөх профессортой хийх хамтарсан нарийн мэс засал</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
              <span>Ариутгал, халдвар хамгааллын олон улсын 1 удаагийн хэрэгслийн систем</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#1769AA] dark:text-sky-300 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Алсын хараа</h3>
          <p className="text-xs font-semibold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider">2023 - 2034 он</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Монгол хүний эрүүл нүдний төлөө — Салбартаа дэвшилтэт технологи, эмнэлгийн менежмент, хүний нөөцийн бодлогоор ямагт тэргүүлэх.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Эрхэм зорилго</h3>
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Үйлчлүүлэгч төвтэй</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Үйлчлүүлэгч бүрт энэрэнгүй, хүндэтгэлтэй хандаж, нүдний тусламж үйлчилгээний аюулгүй байдал, чанарын дээд стандартыг хангана.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Үнэт зүйлс</h3>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Итгэлцэл ба Мэргэжлийн ёс зүй</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Мэргэжлийн ёс зүй, дэвшилтэт технологийн инноваци, багийн тасралтгүй суралцах соёл болон нийгмийн хариуцлагыг эрхэмлэнэ.
          </p>
        </div>
      </div>

      {/* Safety & Sterilization Standards */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-semibold mb-2">
            Чанарын баталгаа
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Аюулгүй байдал ба Ариутгалын стандарт
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Нүдний бичил мэс засалд халдваргүйтгэл, ариутгал хамгийн шийдвэрлэх үүрэгтэй байдаг.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 text-xs sm:text-sm">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <strong className="text-sky-400 block text-base">HEPA агаарын шүүлтүүр</strong>
            <p className="text-slate-300">
              Мэс заслын өрөөнд агаарыг 99.97% шүүдэг даралтат агааржуулалтын систем ажилладаг.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <strong className="text-sky-400 block text-base">Нэг удаагийн хэрэгсэл</strong>
            <p className="text-slate-300">
              Мэс заслын фако зүү, талбай, халат, хутга зэрэгт зөвхөн олон улсын баталгаажсан нэг удаагийн хэрэгслийг ашигладаг.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <strong className="text-sky-400 block text-base">Автоклавын дижитал хяналт</strong>
            <p className="text-slate-300">
              Мэс заслын төмөр багаж бүрийг өндөр даралт, температурт ариутгаж тусгай индикатороор баталгаажуулдаг.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
