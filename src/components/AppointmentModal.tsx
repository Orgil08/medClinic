import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Phone,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Check,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { HOSPITAL_INFO, BRANCHES } from '../utils/hospitalData.ts';
import {
  validateAppointmentBooking,
  saveAppointmentRecord,
  sendAppointmentApi,
  APPOINTMENT_SERVICE_CATEGORIES,
  APPOINTMENT_TIME_SLOTS,
  AppointmentBookingData,
  AppointmentBookingRecord
} from '../utils/appointment.ts';
import { useToast } from '../context/ToastContext.tsx';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
  defaultServiceSlug?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultBranchId = 'central',
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'form' | 'medsoft'>('form');

  // Form State
  const [formData, setFormData] = useState<AppointmentBookingData>({
    fullName: '',
    phone: '',
    email: '',
    branchId: defaultBranchId,
    serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[0],
    preferredDate: '',
    preferredTimeSlot: APPOINTMENT_TIME_SLOTS[0].label,
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentBookingData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBookingRecord | null>(null);

  if (!isOpen) return null;

  const selectedBranch = BRANCHES.find((b) => b.id === formData.branchId) || BRANCHES[0];

  // Minimum date for the native date picker is today (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  // Reactive input updater that immediately clears validation error on typing
  const updateField = (field: keyof AppointmentBookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateAppointmentBooking(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error(
        'Цаг захиалгын мэдээлэл дутуу байна',
        'Та маягтын улаанаар тэмдэглэгдсэн талбаруудыг шалгана уу.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await sendAppointmentApi(validation.cleanData!);
      const record: AppointmentBookingRecord = {
        id: `apt-${Date.now()}`,
        bookingCode: res.bookingCode,
        data: validation.cleanData!,
        submittedAt: res.timestamp || new Date().toISOString(),
        status: 'pending_confirmation',
      };
      setConfirmedBooking(record);

      toast.success(
        'Цаг захиалгын хүсэлт амжилттай бүртгэгдлээ!',
        `Баталгаажуулах код: ${res.bookingCode}. Манай сувилагч ${record.data.phone} дугаарт 15 минутын дотор холбогдоно.`
      );
    } catch (err: any) {
      toast.error(
        'Цаг захиалга илгээхэд алдаа гарлаа',
        err?.message || 'Та дахин оролдоно уу эсвэл 7705-6699 утсаар холбогдоно уу.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setConfirmedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      branchId: defaultBranchId,
      serviceCategory: APPOINTMENT_SERVICE_CATEGORIES[0],
      preferredDate: '',
      preferredTimeSlot: APPOINTMENT_TIME_SLOTS[0].label,
      notes: '',
    });
    setErrors({});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden my-auto max-h-[95vh] flex flex-col transition-colors">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#123B63] via-[#1769AA] to-[#0A2540] dark:from-slate-950 dark:via-[#123B63] dark:to-slate-900 text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-sky-200 text-xs font-semibold mb-2 border border-white/20">
                <Calendar className="w-3.5 h-3.5" />
                Албан ёсны цаг захиалга
              </div>
              <h2 id="appointment-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                Эмчид үзүүлэх цаг захиалах
              </h2>
              <p className="text-sky-100/80 text-xs sm:text-sm mt-1">
                Та доорх онлайн маягтаар шууд хүсэлт илгээх эсвэл Medsoft цахим системээр цаг авах боломжтой.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Хаах"
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 mt-4 p-1 bg-white/10 rounded-xl max-w-md">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-white text-[#123B63] shadow-sm'
                  : 'text-sky-100 hover:text-white'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Шуурхай захиалгын маягт</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('medsoft')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'medsoft'
                  ? 'bg-white text-[#123B63] shadow-sm'
                  : 'text-sky-100 hover:text-white'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Medsoft & Утсаар захиалах</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {activeTab === 'form' ? (
            confirmedBooking ? (
              /* Success Receipt Card */
              <div className="bg-blue-50/80 dark:bg-slate-800/90 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-sky-950 text-[#1769AA] dark:text-sky-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] dark:text-sky-400">
                    Хүсэлт бүртгэгдлээ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#123B63] dark:text-sky-200 mt-1">
                    Цаг захиалгын хүсэлтийг амжилттай илгээлээ!
                  </h3>
                  <div className="mt-3 inline-block px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Захиалгын лавлах код:</span>
                    <span className="text-lg font-mono font-extrabold text-[#1769AA] dark:text-sky-400">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-4 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 border border-blue-100 dark:border-slate-700 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Өвчтөний нэр:</span>
                    <strong className="text-slate-900 dark:text-slate-100">{confirmedBooking.data.fullName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Утасны дугаар:</span>
                    <strong className="text-slate-900 dark:text-slate-100">{confirmedBooking.data.phone}</strong>
                  </div>
                  {confirmedBooking.data.email && (
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="text-slate-500 dark:text-slate-400">Имэйл хаяг:</span>
                      <strong className="text-slate-900 dark:text-slate-100">{confirmedBooking.data.email}</strong>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Салбар:</span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {confirmedBooking.data.branchId === 'ubh'
                        ? 'UBH салбар'
                        : confirmedBooking.data.branchId === 'lasik'
                        ? 'Хараа заслын төв'
                        : 'Төв эмнэлэг (Дүнжингарав)'}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Үзлэгийн чиглэл:</span>
                    <strong className="text-slate-900 dark:text-slate-100 line-clamp-1">{confirmedBooking.data.serviceCategory}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Товлосон өдөр:</span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {confirmedBooking.data.preferredDate} ({confirmedBooking.data.preferredTimeSlot.split(':')[0]})
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-[#123B63] dark:text-sky-300 max-w-md mx-auto">
                  Манай лавлах сувилагч ажлын цагаар 15 минутын дотор таны утсанд холбогдон нарийн цагийг эцсийн байдлаар баталгаажуулна.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Өөр цаг захиалах
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Ойлголоо, цонхыг хаах
                  </button>
                </div>
              </div>
            ) : (
              /* Quick Interactive Form */
              <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    1. Үзүүлэх салбар <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {BRANCHES.map((branch) => {
                      const isSelected = branch.id === formData.branchId;
                      return (
                        <button
                          key={branch.id}
                          type="button"
                          onClick={() => updateField('branchId', branch.id)}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#1769AA] dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-[#123B63] dark:text-sky-200 font-medium ring-2 ring-[#1769AA]/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-0.5">
                            <span>{branch.name.split(' (')[0]}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{branch.district}</div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.branchId && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.branchId}</p>
                  )}
                </div>

                {/* Patient Name & Phone in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="apt-fullName"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                    >
                      2. Өвчтөний нэр <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="apt-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Жишээ: Б. Болдбаатар"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-rose-300 dark:border-rose-600 focus:ring-rose-500/20 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="apt-phone"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                    >
                      3. Утасны дугаар <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="apt-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="Жишээ: 88112233"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-rose-300 dark:border-rose-600 focus:ring-rose-500/20 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email Address field */}
                <div>
                  <label
                    htmlFor="apt-email"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    4. Имэйл хаяг <span className="text-slate-400 dark:text-slate-500 font-normal lowercase">(баталгаажуулах мэдээлэл хүлээн авах)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="apt-email"
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="Жишээ: bat@domain.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-300 dark:border-rose-600 focus:ring-rose-500/20 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Service Category */}
                <div>
                  <label
                    htmlFor="apt-service"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    5. Үзлэгийн төрөл / Чиглэл <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="apt-service"
                    value={formData.serviceCategory}
                    onChange={(e) => updateField('serviceCategory', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 transition-all cursor-pointer"
                  >
                    {APPOINTMENT_SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="apt-date"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                    >
                      6. Тохиромжтой өдөр <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="apt-date"
                      type="date"
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => updateField('preferredDate', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                        errors.preferredDate
                          ? 'border-rose-300 dark:border-rose-600 focus:ring-rose-500/20 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="apt-slot"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                    >
                      7. Тохиромжтой цагийн ээлж
                    </label>
                    <select
                      id="apt-slot"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => updateField('preferredTimeSlot', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 transition-all cursor-pointer"
                    >
                      {APPOINTMENT_TIME_SLOTS.map((slot) => (
                        <option key={slot.id} value={slot.label}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="apt-notes"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    8. Нэмэлт тайлбар (сонголтоор)
                  </label>
                  <textarea
                    id="apt-notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="Зовуурь, урьдчилсан онош эсвэл хүсэж буй эмчийн нэр..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 dark:focus:ring-sky-500/20 focus:border-[#1769AA] dark:focus:border-sky-500 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Хүсэлтийг илгээж байна...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Цаг захиалгын хүсэлт илгээх</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                    Таны мэдээлэл манай нууцлалын бодлогын дагуу зөвхөн эмнэлгийн цаг товлоход ашиглагдана.
                  </p>
                </div>
              </form>
            )
          ) : (
            /* Medsoft direct link tab */
            <div className="space-y-5">
              {/* Branch Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Үзүүлэх салбараа сонгоно уу:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BRANCHES.map((branch) => {
                    const isSelected = branch.id === formData.branchId;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, branchId: branch.id })}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#1769AA] dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-[#123B63] dark:text-sky-200 font-medium ring-2 ring-[#1769AA]/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1">
                          <span>{branch.name.split(' (')[0]}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{branch.district}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Branch Summary */}
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      {selectedBranch.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      {selectedBranch.address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Даваа-Баасан: {selectedBranch.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{selectedBranch.phones.join(' / ')}</span>
                  </div>
                </div>
              </div>

              {/* Primary Action: Go to Medsoft */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-850 border border-blue-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 text-center">
                <h3 className="font-bold text-[#123B63] dark:text-sky-200 text-lg mb-1">
                  Цахим бүртгэлийн систем (Medsoft)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-lg mx-auto">
                  Та доорх товч дээр даран эмчийн сул цагийг бодитоор харан цагаа шууд баталгаажуулна уу.
                </p>
                <a
                  href={HOSPITAL_INFO.onlineBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1769AA] hover:bg-[#123B63] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold rounded-xl shadow-md shadow-blue-700/20 hover:shadow-lg transition-all w-full sm:w-auto"
                >
                  <span>Medsoft системээр цаг захиалах</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2.5">
                  Таныг албан ёсны захиалгын холбоос (solongo.medsoft.care) руу найдвартай шилжүүлнэ.
                </div>
              </div>

              {/* Secondary Action: Call direct */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Утсаар захиалах бол
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {selectedBranch.phones[0]}
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${selectedBranch.phones[0].replace(/[^\d]/g, '')}`}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm font-semibold rounded-lg transition-colors w-full sm:w-auto text-center"
                >
                  Шууд залгах
                </a>
              </div>
            </div>
          )}

          {/* Preparation notice */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-xl p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-900 dark:text-amber-300">Үзлэгт ирэхдээ анхаарах зүйлс:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-800 dark:text-amber-300/90">
                <li>Иргэний үнэмлэх болон Эрүүл мэндийн даатгалын шимтгэлээ шалгасан байх</li>
                <li>Нүдний уг дурандах тохиолдолд ойрын хараа 2-4 цаг бүрэлзэх тул өөрөө машин барихгүй ирэх</li>
                <li>Хэрэв контакт линз зүүдэг бол үзлэгээс өмнө тайлах</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FileText className="w-4 h-4" />
            <span>ЭМД-ын 75% хүртэлх хөнгөлөлттэй</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
};
