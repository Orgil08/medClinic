import React, { useState } from 'react';
import { validateContactForm } from '../utils/validation.ts';
import { HOSPITAL_INFO, BRANCHES } from '../utils/hospitalData.ts';
import type { ContactFormData } from '../types/index.ts';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  onOpenAppointment: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAppointment }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    contact: '',
    category: 'Санал хүсэлт',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate safe client receipt and acknowledgement
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      setFormData({
        fullName: '',
        contact: '',
        category: 'Санал хүсэлт',
        message: '',
        consent: false,
      });
    }, 600);
  };

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>Холбоо барих</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Бидэнтэй холбогдох
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Танд асууж тодруулах зүйл, санал хүсэлт байвал доорх маягтыг бөглөн илгээнэ үү. Манай захиргааны ажилтан тантай ажлын цагаар эргэн холбогдох болно.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Feedback Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Санал хүсэлтийн маягт
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Өвчний онош, түүх зэрэг эмзэг хувийн эрүүл мэндийн мэдээллээ энд бичихгүй байхыг анхаарна уу.
          </p>

          {submittedSuccessfully ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-950">
                Таны санал хүсэлтийг амжилттай хүлээн авлаа!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Бид таны илгээсэн мэдээлэлтэй танилцаж, шаардлагатай тохиолдолд таны холбоо барих дугаар эсвэл и-мэйлээр эргэн хариулах болно.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedSuccessfully(false)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Дахин хүсэлт илгээх
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  Овог, нэр <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Жишээ: Б. Болдбаатар"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Contact (Phone or Email) */}
              <div>
                <label htmlFor="contact" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  Утасны дугаар эсвэл И-мэйл хаяг <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  placeholder="Жишээ: 99112233 эсвэл patient@example.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    errors.contact
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500'
                  }`}
                />
                {errors.contact && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contact}</span>
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  Санал хүсэлтийн төрөл
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                >
                  <option value="Санал хүсэлт">Санал хүсэлт</option>
                  <option value="Үйлчилгээ лавлах">Үйлчилгээ лавлах</option>
                  <option value="Цаг захиалгын тусламж">Цаг захиалгын тусламж</option>
                  <option value="Талархал">Талархал</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                  Мессеж, санал хүсэлт <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Таны санал, сэтгэгдэл эсвэл асуулт..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400/20'
                      : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    Би өөрийн холбоо барих мэдээллийг санал хүсэлтэд хариу өгөх зорилгоор эмнэлгийн захиргаанд боловсруулахыг зөвшөөрч байна.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Илгээж байна...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Санал хүсэлт илгээх</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Шууд холбоо барих</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-200">Лавлах утасны дугаарууд:</strong>
                  <div className="space-y-1 mt-1 text-slate-300">
                    <div>Төв эмнэлэг: <a href="tel:77056699" className="text-teal-400 font-mono font-bold hover:underline">7705-6699</a> / 7709-6699</div>
                    <div>UBH салбар: <a href="tel:77066699" className="text-teal-400 font-mono font-bold hover:underline">7706-6699</a></div>
                    <div>Хараа заслын төв: <a href="tel:77016699" className="text-teal-400 font-mono font-bold hover:underline">7701-6699</a></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-200">И-мэйл хаяг:</strong>
                  <a href="mailto:contact@solongohospital.mn" className="text-teal-400 hover:underline">
                    contact@solongohospital.mn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-200">Ажиллах цаг:</strong>
                  <div className="text-slate-300 text-xs mt-1 space-y-0.5">
                    <div>Даваа - Баасан: 08:30 - 16:30</div>
                    <div>Бямба: 10:00 - 14:00 (Төв) / 09:00 - 17:00 (UBH)</div>
                    <div>Ням: Амарна</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-center block transition-colors text-xs sm:text-sm cursor-pointer"
              >
                Эмчид цаг захиалах (Medsoft)
              </button>
            </div>
          </div>

          {/* Location summary note */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Төв эмнэлгийн байршил</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Баянзүрх дүүрэг, 26-р хороо, Их хүрээ гудамж, Дүнжингарав худалдааны төвийн урд, Үндэсний цэцэрлэгт хүрээлэнгийн зүүн хойно, Санрайс (Sunrise) хотхон.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
