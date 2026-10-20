import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  ExternalLink,
  Info,
  ChevronRight,
  Sparkles,
  Search,
  Filter,
  Receipt,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import {
  INSURANCE_PARTNERS,
  BILLING_STEPS,
  INSURANCE_METRICS,
  type InsurancePartner,
  type BillingStep
} from '../utils/insuranceData.ts';

interface InsurancePartnersProps {
  onOpenAppointment?: () => void;
}

export const InsurancePartners: React.FC<InsurancePartnersProps> = ({ onOpenAppointment }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'national' | 'private' | 'international'>('all');
  const [selectedPartner, setSelectedPartner] = useState<InsurancePartner | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Estimator interactive state
  const [calculatorService, setCalculatorService] = useState<'phaco' | 'exam' | 'oct' | 'pediatric'>('phaco');
  const [calculatorInsurance, setCalculatorInsurance] = useState<'emd' | 'private' | 'none'>('emd');

  const filteredPartners = INSURANCE_PARTNERS.filter((partner) => {
    if (selectedCategory === 'all') return true;
    return partner.type === selectedCategory;
  });

  // Calculate estimated cost breakdown
  const getCalculationResult = () => {
    const services = {
      phaco: {
        name: 'Нүдний болор солих мэс засал (Phaco)',
        basePrice: 1600000,
        formattedBase: '1,600,000₮',
        emdCoverage: 0.75, // 75%
        privateCoverage: 0.85,
        note: 'ЭМД-аас 75% хөнгөлөлттэй олгогдоно. Өндөр технологийн уян болор дагалдана.'
      },
      exam: {
        name: 'Нүдний иж бүрэн нарийн мэргэжлийн үзлэг',
        basePrice: 50000,
        formattedBase: '50,000₮',
        emdCoverage: 0.50,
        privateCoverage: 1.0,
        note: 'Компьютер авторефрактометр, даралт хэмжилт, биомикроскопи багтсан.'
      },
      oct: {
        name: 'Нүдний угийн ОСТ томографи шинжилгээ',
        basePrice: 80000,
        formattedBase: '80,000₮',
        emdCoverage: 0.60,
        privateCoverage: 1.0,
        note: 'Торлог болон харааны мэдрэлийн дискийг 3D микро давхаргаар дурандах шинжилгээ.'
      },
      pediatric: {
        name: 'Хүүхдийн нүдний эмчийн нарийвчилсан үзлэг',
        basePrice: 40000,
        formattedBase: '40,000₮',
        emdCoverage: 0.70,
        privateCoverage: 1.0,
        note: 'Хялар, хараа мохосдол болон сургуулийн насны хүүхдийн харааны хамгаалалт.'
      }
    };

    const currentService = services[calculatorService];
    let coverageRate = 0;
    let coveredAmount = 0;
    let patientShare = currentService.basePrice;

    if (calculatorInsurance === 'emd') {
      coverageRate = currentService.emdCoverage;
      coveredAmount = Math.round(currentService.basePrice * coverageRate);
      patientShare = currentService.basePrice - coveredAmount;
    } else if (calculatorInsurance === 'private') {
      coverageRate = currentService.privateCoverage;
      coveredAmount = Math.round(currentService.basePrice * coverageRate);
      patientShare = Math.max(0, currentService.basePrice - coveredAmount);
    }

    return {
      service: currentService,
      coverageRatePercent: Math.round(coverageRate * 100),
      coveredAmount,
      patientShare,
      formattedCovered: `${coveredAmount.toLocaleString()}₮`,
      formattedPatientShare: `${patientShare.toLocaleString()}₮`
    };
  };

  const calculation = getCalculationResult();

  // Render SVG logo for partners
  const renderPartnerLogo = (partner: InsurancePartner) => {
    switch (partner.id) {
      case 'emd':
        return (
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-700 to-teal-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-emerald-100" />
              <span className="text-[9px] font-black tracking-wider text-emerald-50">ЭМД</span>
            </div>
          </div>
        );
      case 'mongol-daatgal':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-700/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-cyan-500 opacity-90" />
            <div className="relative flex flex-col items-center">
              <Building2 className="w-6 h-6 text-blue-100" />
              <span className="text-[8px] font-black tracking-tighter text-blue-50">МОНГОЛ</span>
            </div>
          </div>
        );
      case 'mandal-daatgal':
        return (
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-teal-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-700 to-emerald-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-teal-100" />
              <span className="text-[8px] font-black tracking-tighter text-teal-50">МАНДАЛ</span>
            </div>
          </div>
        );
      case 'ard-daatgal':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-red-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-700 to-rose-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <FileCheck className="w-6 h-6 text-red-100" />
              <span className="text-[8px] font-black tracking-tighter text-red-50">АРД</span>
            </div>
          </div>
        );
      case 'bodi-daatgal':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-amber-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-700 to-yellow-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <CreditCard className="w-6 h-6 text-amber-100" />
              <span className="text-[8px] font-black tracking-tighter text-amber-50">БОДЬ</span>
            </div>
          </div>
        );
      case 'tenger-daatgal':
        return (
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800 to-violet-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <FileText className="w-6 h-6 text-indigo-100" />
              <span className="text-[8px] font-black tracking-tighter text-indigo-50">ТЭНГЭР</span>
            </div>
          </div>
        );
      case 'international-partners':
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-sky-600/20 relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-800 to-cyan-400 opacity-90" />
            <div className="relative flex flex-col items-center">
              <Globe className="w-6 h-6 text-sky-100" />
              <span className="text-[8px] font-black tracking-tighter text-sky-50">GLOBAL</span>
            </div>
          </div>
        );
    }
  };

  const getStepIcon = (iconName: BillingStep['iconName']) => {
    switch (iconName) {
      case 'verification':
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case 'examination':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'billing':
        return <CreditCard className="w-6 h-6 text-emerald-600" />;
      case 'receipt':
        return <Receipt className="w-6 h-6 text-violet-600" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header Container */}
      <div className="bg-gradient-to-br from-[#123B63] via-[#1769AA] to-[#0A2540] text-white rounded-3xl p-8 sm:p-12 border border-blue-800/40 shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-sky-200 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-sky-300" />
            <span>ЭМД & Албан ёсны даатгалын түншлэл</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Хүлээн зөвшөөрөгдсөн даатгалууд ба төлбөрийн нөхцөл
          </h2>

          <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Солонго нүдний эмнэлэг нь Эрүүл Мэндийн Даатгалын Ерөнхий Газар (ЭМД) болон Монголын тэргүүлэх хувийн даатгалын байгууллагуудтай гэрээтэй ажилладаг. Иргэд болор солих мэс засал болон үзлэг, оношилгоондоо <strong className="text-sky-300 font-bold">75% хүртэлх хөнгөлөлт</strong> эдлэх боломжтой.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/15">
            {INSURANCE_METRICS.map((metric, i) => (
              <div key={i} className="bg-white/10 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-sky-300">{metric.value}</div>
                <div className="text-xs text-sky-100 mt-1 line-clamp-2">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 1: Logos of Accepted Insurance Providers */}
      <section aria-label="Даатгалын байгууллагууд" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769AA] text-xs font-semibold mb-1 border border-blue-200/60">
              <Building2 className="w-3.5 h-3.5" />
              <span>Гэрээт даатгалын байгууллагууд</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Манай эмнэлэгт үйлчилдэг эрүүл мэндийн даатгалууд
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Даатгуулагч та картаа шалгуулан газар дээр нь хөнгөлөлттэй үйлчлүүлэх боломжтой.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#123B63] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Бүгд ({INSURANCE_PARTNERS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('national')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'national'
                  ? 'bg-white text-[#123B63] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Улсын ЭМД
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('private')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'private'
                  ? 'bg-white text-[#123B63] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Хувийн даатгал
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('international')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'international'
                  ? 'bg-white text-[#123B63] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Олон улсын
            </button>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPartner(partner);
                }
              }}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#1769AA] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#1769AA]"
            >
              <div className="space-y-4">
                {/* Logo and Brand details */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {renderPartnerLogo(partner)}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base group-hover:text-[#1769AA] transition-colors">
                        {partner.shortName}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {partner.typeLabel}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1769AA] border border-blue-100">
                    {partner.badgeText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {partner.description}
                </p>

                {/* Key covered services preview */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Хамрах гол үйлчилгээ:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.coverageServices.slice(0, 2).map((srv, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700"
                      >
                        ✓ {srv}
                      </span>
                    ))}
                    {partner.coverageServices.length > 2 && (
                      <span className="text-[10px] text-[#1769AA] font-semibold self-center">
                        +{partner.coverageServices.length - 2} нэмэлт
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  {partner.billingMethodLabel}
                </span>
                <span className="font-semibold text-[#1769AA] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  <span>Дэлгэрэнгүй</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Step-by-Step Billing Process Description */}
      <section aria-label="Төлбөр тооцооны процесс" className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#123B63] text-xs font-semibold">
            <Receipt className="w-3.5 h-3.5" />
            <span>Шууд нэхэмжлэх журам</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Төлбөр тооцоо, нэхэмжлэх 4 энгийн алхам
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Та төвөгтэй бичиг баримт бүрдүүлж цаг алдахгүй. Манай эмнэлгийн цахим системээр дамжуулан даатгалын хөнгөлөлтийг шууд газар дээр нь хасч тооцно.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BILLING_STEPS.map((step) => {
            const isCurrent = activeStep === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(step.step);
                  }
                }}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between text-left ${
                  isCurrent
                    ? 'bg-white border-[#1769AA] shadow-md ring-2 ring-[#1769AA]/20'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1769AA] font-extrabold text-sm flex items-center justify-center border border-blue-200">
                      0{step.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {step.duration}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 w-fit">
                    {getStepIcon(step.iconName)}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px]">
                  <span className="font-semibold text-slate-700 block mb-1">Шаардагдах зүйл:</span>
                  <ul className="space-y-1 text-slate-500">
                    {step.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#1769AA] shrink-0" />
                        <span className="line-clamp-1">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Banner */}
        <div className="bg-[#123B63] text-blue-50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-200 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm sm:text-base text-white">
                Даатгалын шууд төлөлт (Direct Billing) хэрхэн ажилладаг вэ?
              </h5>
              <p className="text-xs text-sky-100/90 leading-relaxed">
                Гэрээт байгууллагын даатгуулагчид үзлэгийн төлбөрөөс зөвхөн өөрийн хариуцах багахан хувийг (co-pay) төлөх бөгөөд үлдсэн төлбөрийг эмнэлэг даатгалын байгууллагаас шууд нэхэмжилдэг.
              </p>
            </div>
          </div>

          <a
            href="tel:77056699"
            className="shrink-0 px-4 py-2.5 bg-white text-[#123B63] font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#1769AA]" />
            <span>Санхүү лавлах: 7705-6699</span>
          </a>
        </div>
      </section>

      {/* Part 3: Interactive Insurance Co-Pay & Benefit Calculator */}
      <section aria-label="Даатгалын хөнгөлөлт тооцоолох хэрэгсэл" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Хөнгөлөлт тооцоолуур</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Таны үйлчилгээний хөнгөлөлт & өөрийн төлөх дүн
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Үйлчилгээ болон даатгалын төрлөө сонгож хөнгөлөлтийн тооцоог урьдчилан хараарай.
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ЭМД болон албан ёсны тарифаар бодогдов</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Үйлчилгээ сонгох:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'phaco', title: 'Болор солих мэс засал (Phaco)', price: '1,600,000₮' },
                  { id: 'exam', title: 'Иж бүрэн үзлэг, оношилгоо', price: '50,000₮' },
                  { id: 'oct', title: 'ОСТ томографи шинжилгээ', price: '80,000₮' },
                  { id: 'pediatric', title: 'Хүүхдийн нүдний үзлэг', price: '40,000₮' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCalculatorService(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      calculatorService === s.id
                        ? 'border-[#1769AA] bg-blue-50/60 ring-1 ring-[#1769AA] font-semibold text-[#123B63]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">{s.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">Үндсэн үнэ: {s.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Таны даатгалын хэлбэр:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'emd', label: 'Улсын ЭМД (75%)', note: 'E-Mongolia баталгаажилттай' },
                  { id: 'private', label: 'Гэрээт хувийн даатгал', note: 'Монгол, Мандал, Ард гэх мэт' },
                  { id: 'none', label: 'Даатгалгүй (Хувиараа)', note: 'Бүрэн төлбөрт үйлчилгээ' }
                ].map((ins) => (
                  <button
                    key={ins.id}
                    type="button"
                    onClick={() => setCalculatorInsurance(ins.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      calculatorInsurance === ins.id
                        ? 'border-[#1769AA] bg-blue-50/70 ring-1 ring-[#1769AA] font-semibold text-[#123B63]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{ins.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{ins.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * {calculation.service.note}
            </p>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123B63] via-[#1769AA] to-[#0A2540] text-white rounded-2xl p-6 border border-blue-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs text-sky-200">
              <span className="font-semibold uppercase tracking-wider">Тооцооллын үр дүн</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-sky-200 font-mono font-bold">
                {calculatorInsurance === 'none' ? '0% хөнгөлөлт' : `${calculation.coverageRatePercent}% хөнгөлөгдөнө`}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-sky-200/80">Үйлчилгээ:</div>
              <div className="text-sm font-bold text-white">{calculation.service.name}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex justify-between text-sky-100">
                <span>Үндсэн үнэ:</span>
                <span className="font-mono">{calculation.service.formattedBase}</span>
              </div>
              <div className="flex justify-between text-sky-200 font-medium">
                <span>Даатгалаас хөнгөлөх:</span>
                <span className="font-mono">-{calculation.formattedCovered}</span>
              </div>
              <div className="pt-2 border-t border-white/15 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Таны төлөх үлдэгдэл:</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  {calculation.formattedPatientShare}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {onOpenAppointment && (
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="w-full py-3 bg-white hover:bg-sky-50 text-[#123B63] font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#1769AA]" />
                  <span>Энэ үйлчилгээнд цаг захиалах</span>
                </button>
              )}
              <div className="text-center">
                <span className="text-[11px] text-sky-200/80">
                  Мэдээлэл лавлах утас: <strong className="text-white">7705-6699</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Detail Modal / Popover */}
      {selectedPartner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {renderPartnerLogo(selectedPartner)}
                <div>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                    {selectedPartner.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <span className="text-slate-500 font-medium">{selectedPartner.typeLabel}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#1769AA] font-bold">{selectedPartner.discountRate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold cursor-pointer"
                aria-label="Хаах"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedPartner.description}
            </p>

            {/* Coverage Services */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Хамрагдах тусламж үйлчилгээ:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedPartner.coverageServices.map((srv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#1769AA]" />
                <span>Бүрдүүлэх бичиг баримт:</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedPartner.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              {selectedPartner.websiteUrl && (
                <a
                  href={selectedPartner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Албан ёсны сайт</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              )}

              {onOpenAppointment && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPartner(null);
                    onOpenAppointment();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1769AA] hover:bg-[#123B63] text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Цаг захиалах</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
