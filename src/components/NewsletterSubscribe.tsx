import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import {
  validateNewsletterInput,
  saveSubscription,
  getStoredSubscription,
  clearSubscription,
  NEWSLETTER_TOPICS,
  type NewsletterSubscription,
} from '../utils/newsletter.ts';
import { useToast } from '../context/ToastContext.tsx';

interface NewsletterSubscribeProps {
  variant?: 'section' | 'footer' | 'compact';
  className?: string;
  onSuccess?: (subscription: NewsletterSubscription) => void;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  variant = 'footer',
  className = '',
  onSuccess,
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscription, setSubscription] = useState<NewsletterSubscription | null>(null);

  // Initialize from existing local storage subscription if present
  useEffect(() => {
    const existing = getStoredSubscription();
    if (existing) {
      setSubscription(existing);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateNewsletterInput(
      email,
      NEWSLETTER_TOPICS.map((t) => t.id)
    );

    if (!validation.isValid) {
      setError(validation.error || 'И-мэйл хаягаа зөв оруулна уу.');
      toast.error('Бүртгэл амжилтгүй', validation.error || 'И-мэйл хаягаа зөв оруулна уу.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for smooth UX
    setTimeout(() => {
      const saved = saveSubscription(validation.cleanEmail!, validation.cleanTopics);
      setSubscription(saved);
      setIsSubmitting(false);
      setEmail('');

      // Trigger rich success toast
      toast.success(
        'Цахим товхимолд амжилттай бүртгэгдлээ!',
        `${saved.email} хаягаар нүдний эрүүл мэндийн сар тутмын зөвлөгөө, мэдээлэл хүргэгдэх болно.`
      );

      if (onSuccess) {
        onSuccess(saved);
      }
    }, 450);
  };

  const handleReset = () => {
    clearSubscription();
    setSubscription(null);
    setEmail('');
    setError(null);
  };

  /* ========================================================================= */
  /* SUCCESS / SUBSCRIBED STATE                                                */
  /* ========================================================================= */
  if (subscription) {
    return (
      <div
        className={`bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xs ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-700 text-[#1769AA] dark:text-sky-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h5 className="text-[#123B63] dark:text-sky-200 font-bold text-sm sm:text-base">
                Баярлалаа! Та товхимолд амжилттай бүртгэгдсэн байна.
              </h5>
              <p className="text-[#64748B] dark:text-slate-400 text-xs sm:text-sm mt-0.5">
                <span className="font-semibold text-[#1769AA] dark:text-sky-400">{subscription.email}</span> хаягаар сар бүр нүдний эмчийн эрүүл мэндийн зөвлөгөө хүргэгдэнэ.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63] dark:hover:text-sky-300 underline cursor-pointer flex items-center gap-1.5 transition-colors self-end sm:self-center"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Өөр хаягаар солих</span>
          </button>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* CLEAN & MINIMAL NEWSLETTER SECTION / BLOCK (Design Reference standard)     */
  /* ========================================================================= */
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-blue-100/80 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xs ${className}`}
      aria-labelledby="newsletter-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Heading & Description */}
        <div className="lg:col-span-6 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider mb-0.5">
            <Mail className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
            <span>Эрүүл мэндийн цахим товхимол</span>
          </div>
          <h3
            id="newsletter-heading"
            className="text-lg sm:text-xl font-bold text-[#123B63] dark:text-sky-300 tracking-tight leading-snug"
          >
            Нүдний эрүүл мэндийн сар тутмын зөвлөгөө
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed max-w-lg">
            Дэлгэцийн нүдний ядаргаа тайлах, хүүхдийн хараа хамгаалах болон нүдний шинэ эмчилгээний мэдээг и-мэйлээрээ үнэ төлбөргүй аваарай.
          </p>
        </div>

        {/* Right: Input & Submit Button */}
        <div className="lg:col-span-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Таны и-мэйл хаяг (жишээ: bat@example.com)"
                  className="w-full h-11 sm:h-12 pl-10 pr-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-[#263747] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#1769AA] dark:focus:border-sky-500 focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 transition-all shadow-xs"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 sm:h-12 px-6 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 active:bg-[#0e2c4d] disabled:opacity-60 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Бүртгэж байна...</span>
                  </div>
                ) : (
                  <>
                    <span>Бүртгүүлэх</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-medium pl-1">
                {error}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] pl-1 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1769AA]/70 shrink-0" />
              <span>Таны и-мэйл нууцлал найдвартай хамгаалагдана. Хүссэн үедээ цуцлах боломжтой.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
