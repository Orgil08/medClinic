import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Award, Heart, CheckCircle2, Users, Building, ArrowRight, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../utils/hospitalData.ts';

interface AboutPageProps {
  onOpenAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="space-y-16 py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
          <Eye className="w-4 h-4" />
          <span>Танилцуулга</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Солонго нүдний эмнэлэг
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {HOSPITAL_INFO.slogan} — Бид тогтвортой хөгжлийг хангасан, энэрэнгүй хамт олон байж ажилтан, үйлчлүүлэгчийн номер нэг сонголт байна.
        </p>
      </div>

      {/* Main Intro Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Монголын нүд судлалын дэвшилтэт тусламж
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Солонго нүдний эмнэлэг нь анх байгуулагдсан цагаасаа хойш ард иргэдийнхээ харааны эрүүл мэндийг хамгаалах, сохролоос сэргийлэх, орчин үеийн оношилгоо, бичил мэс заслын технологиор тэргүүлэн үйлчилж ирлээ.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Бид өнөөдөр Улаанбаатар хотод Төв эмнэлэг (Санрайс хотхон), UBH салбар эмнэлэг болон Солонго хараа заслын төв гэсэн 3 үндсэн цэгээр насанд хүрэгчид болон хүүхдийн нүдний тусламж үйлчилгээг стандартын өндөр түвшинд хүргэж байна.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/about/history"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
            >
              <span>Түүхэн замналтай танилцах</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Цаг захиалах</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-teal-100 space-y-4">
          <h3 className="font-bold text-teal-950 text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Гол зарчмууд</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Олон улсын стандартад нийцсэн өндөр нарийвчлалтай тоног төхөөрөмж</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Эрүүл мэндийн даатгалын 75% хүртэлх албан ёсны хөнгөлөлт</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>БНЭУ-ын зөвлөх профессортой хийх хамтарсан нарийн мэс засал</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Ариутгал, халдвар хамгааллын олон улсын 1 удаагийн хэрэгслийн систем</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Алсын хараа</h3>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider">2023 - 2034 он</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Монгол хүний эрүүл нүдний төлөө — Салбартаа дэвшилтэт технологи, эмнэлгийн менежмент, хүний нөөцийн бодлогоор ямагт тэргүүлэх.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Эрхэм зорилго</h3>
          <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">Үйлчлүүлэгч төвтэй</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Үйлчлүүлэгч бүрт энэрэнгүй, хүндэтгэлтэй хандаж, нүдний тусламж үйлчилгээний аюулгүй байдал, чанарын дээд стандартыг хангана.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Үнэт зүйлс</h3>
          <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Итгэлцэл ба Мэргэжлийн ёс зүй</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Мэргэжлийн ёс зүй, дэвшилтэт технологийн инноваци, багийн тасралтгүй суралцах соёл болон нийгмийн хариуцлагыг эрхэмлэнэ.
          </p>
        </div>
      </div>

      {/* Safety & Sterilization Standards */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
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
            <strong className="text-teal-400 block text-base">HEPA агаарын шүүлтүүр</strong>
            <p className="text-slate-300">
              Мэс заслын өрөөнд агаарыг 99.97% шүүдэг даралтат агааржуулалтын систем ажилладаг.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <strong className="text-teal-400 block text-base">Нэг удаагийн хэрэгсэл</strong>
            <p className="text-slate-300">
              Мэс заслын фако зүү, талбай, халат, хутга зэрэгт зөвхөн олон улсын баталгаажсан нэг удаагийн хэрэгслийг ашигладаг.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <strong className="text-teal-400 block text-base">Автоклавын дижитал хяналт</strong>
            <p className="text-slate-300">
              Мэс заслын төмөр багаж бүрийг өндөр даралт, температурт ариутгаж тусгай индикатороор баталгаажуулдаг.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
