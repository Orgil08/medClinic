import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Building,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { HOSPITAL_INFO, BRANCHES } from '../utils/hospitalData.ts';
import { useToast } from '../context/ToastContext.tsx';
import { sendFeedbackApi, validateFeedbackInput } from '../utils/feedbackService.ts';

interface ContactPageProps {
  onOpenAppointment: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAppointment }) => {
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = validateFeedbackInput({ name, contact, message });
    if (!validation.valid) {
      const errorMsg = validation.error || 'Маягтын мэдээлэл дутуу эсвэл буруу байна.';
      setFormError(errorMsg);
      toast.error('Маягт дутуу байна', errorMsg);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await sendFeedbackApi({
        name,
        contact,
        message,
        source: 'contact',
      });

      toast.success(
        'Санал хүсэлтийг амжилттай илгээлээ!',
        'Бид таны санал хүсэлтийг хүлээн авч, контакт хаяг руу хариу холбогдох болно.'
      );
      setSubmittedSuccess(true);
      setName('');
      setContact('');
      setMessage('');
    } catch (err: any) {
      const errorMsg =
        err?.message ||
        'Сервертэй холбогдоход алдаа гарлаа. Та дахин оролдоно уу эсвэл утсаар холбогдоно уу.';
      setFormError(errorMsg);
      toast.error('Илгээхэд алдаа гарлаа', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-10 sm:py-14 site-container">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
          <Phone className="w-4 h-4" />
          <span>Холбоо барих</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Бидэнтэй холбогдох
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Та манай эмнэлгийн салбаруудтай шууд холбогдох, цаг захиалах эсвэл доорх маягтаар санал хүсэлт, асуултаа илгээх боломжтой.
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real Feedback Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Санал хүсэлт илгээх</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Таны санал бодол бидэнд үнэтэй
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Үйлчилгээний чанар, эмч ажилтнуудын харилцаа, санал хүсэлтийн талаарх мэдээллийг бидэнд илгээнэ үү. Хүсэлтийг эмнэлгийн захиргааны шуудан ({HOSPITAL_INFO.email}) руу шууд илгээнэ.
            </p>
          </div>

          {formError && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div>
                <p className="font-semibold">Анхааруулга</p>
                <p className="text-xs sm:text-sm mt-0.5">{formError}</p>
              </div>
            </div>
          )}

          {submittedSuccess && !formError && (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3 text-[#123B63] dark:text-sky-200 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#1769AA] dark:text-sky-400 mt-0.5" />
              <div>
                <p className="font-semibold">Амжилттай илгээгдлээ!</p>
                <p className="text-xs sm:text-sm mt-0.5">
                  Таны санал хүсэлтийг хүлээн авч, эмнэлгийн захиргааны шууданд илгээлээ. Бид тантай удахгүй холбогдох болно.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Таны нэр: <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="Бүтэн овог нэрээ оруулна уу"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA] bg-slate-50/50 dark:bg-slate-800 dark:text-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="contact-info" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Утасны дугаар эсвэл И-мэйл: <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-info"
                type="text"
                required
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="Жишээ: 88112233 эсвэл user@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA] bg-slate-50/50 dark:bg-slate-800 dark:text-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Санал хүсэлтийн утга: <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="Таны санал, сэтгэгдэл, асуулт эсвэл гомдол..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA] bg-slate-50/50 dark:bg-slate-800 dark:text-white transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Бид таны мэдээллийг нууцлан хамгаална.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Илгээж байна...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Илгээх</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Direct Contact & Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Contact Card (Deep Blue Brand Gradient) */}
          <div className="bg-gradient-to-br from-[#123B63] via-[#1769AA] to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-xs font-semibold border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Шуурхай холбоо</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Шууд холбоо барих
              </h3>
              <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed">
                Манай лавлах утсаар мэргэжлийн сувилагч, цаг захиалгын ажилтнуудтай шууд холбогдон зөвлөгөө авах боломжтой.
              </p>
            </div>

            <div className="space-y-4 relative">
              <a
                href={`tel:${HOSPITAL_INFO.phonePrimary}`}
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 block group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-400/20 text-sky-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 text-sky-300" />
                </div>
                <div>
                  <p className="text-xs text-sky-200 font-medium">Нэгдсэн лавлах утас:</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                    {HOSPITAL_INFO.phonePrimary}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 block group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-400/20 text-sky-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 text-sky-300" />
                </div>
                <div>
                  <p className="text-xs text-sky-200 font-medium">Албан ёсны и-мэйл:</p>
                  <p className="text-sm sm:text-base font-bold text-white break-all">
                    {HOSPITAL_INFO.email}
                  </p>
                </div>
              </a>
            </div>

            {/* Quick Online Booking Action */}
            <div className="pt-2 border-t border-white/15 space-y-3">
              <p className="text-xs text-sky-200">
                Та онлайнаар Medsoft систем ашиглан үзлэгийн цаг авах боломжтой:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="flex-1 py-3 px-4 bg-white text-[#123B63] hover:bg-sky-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#1769AA]" />
                  <span>Цаг захиалах (Шууд)</span>
                </button>
                <a
                  href={HOSPITAL_INFO.onlineBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-sky-500/20 hover:bg-sky-500/30 text-white font-bold text-xs rounded-xl border border-sky-400/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Medsoft систем</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Branches Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#1769AA] dark:text-sky-400" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Манай салбарууд
              </h4>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1"
                >
                  <p className="font-bold text-slate-900 dark:text-white">
                    {b.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    {b.address}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-xs text-[#1769AA] dark:text-sky-400 font-semibold">
                    <span>Утас: {b.phones.join(', ')}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal">
                      {b.hours.weekdays}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
