import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-14 max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Эмнэлгийн ёс зүй & Нууцлал</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Нууцлалын бодлого
        </h1>
        <p className="text-slate-600 text-sm">
          Сүүлд шинэчлэгдсэн огноо: 2025 оны 1-р сар
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-600" />
            <span>1. Ерөнхий үндэслэл</span>
          </h2>
          <p>
            Солонго нүдний эмнэлэг нь Монгол Улсын "Хүний хувийн мэдээлэл хамгаалах тухай хууль", "Эрүүл мэндийн тухай хууль" болон холбогдох салбарын стандартыг чанд мөрдөн ажилладаг. Бид үйлчлүүлэгч бүрийн эрүүл мэндийн болон хувийн мэдээллийн нууцлалыг чандлан хамгаална.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>2. Цуглуулах мэдээллийн төрөл</span>
          </h2>
          <p>
            Манай цахим хуудас болон цаг захиалгын систем (Medsoft)-ээр дамжуулан дараах мэдээллийг зөвхөн үйлчилгээ үзүүлэх зорилгоор цуглуулна:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
            <li>Үйлчлүүлэгчийн овог, нэр, регистрийн дугаар (үзлэгийн карт нээх, ЭМД шалгах зорилгоор)</li>
            <li>Холбоо барих утасны дугаар, и-мэйл хаяг (цаг баталгаажуулах, сануулга илгээх)</li>
            <li>Эрүүл мэндийн даатгалын шимтгэл төлөлтийн төлөв</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>3. Мэдээллийн аюулгүй байдал</span>
          </h2>
          <p>
            Үйлчлүүлэгчийн үзлэг, оношилгооны түүх, өвчний түүхийг зөвхөн эмчлэгч эмч болон эрх бүхий эмнэлгийн ажилтнууд хуульд заасан журмын дагуу хэрэглэх бөгөөд гуравдагч этгээдэд ямар ч тохиолдолд худалдах, задруулахгүй.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>4. Холбоо барих</span>
          </h2>
          <p>
            Нууцлалын бодлоготой холбоотой асуулт, санал байвал манай contact@solongohospital.mn хаягаар болон 7705-6699 дугаарын утсаар хандана уу.
          </p>
        </section>
      </div>
    </div>
  );
};
