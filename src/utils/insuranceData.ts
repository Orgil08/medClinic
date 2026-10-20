export interface InsurancePartner {
  id: string;
  name: string;
  shortName: string;
  type: 'national' | 'private' | 'international';
  typeLabel: string;
  brandColor: string;
  badgeText: string;
  description: string;
  coverageServices: string[];
  discountRate: string;
  billingMethod: 'direct' | 'reimbursement' | 'both';
  billingMethodLabel: string;
  requiredDocuments: string[];
  contactPhone?: string;
  websiteUrl?: string;
  featured?: boolean;
}

export interface BillingStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  iconName: 'verification' | 'examination' | 'billing' | 'receipt';
  requiredDocs: string[];
}

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  {
    id: 'emd',
    name: 'Эрүүл Мэндийн Даатгалын Ерөнхий Газар (ЭМД)',
    shortName: 'ЭМД',
    type: 'national',
    typeLabel: 'Улсын албан даатгал',
    brandColor: '#059669', // Emerald
    badgeText: '75% хүртэл хөнгөлөлттэй',
    description: 'Монгол Улсын иргэн бүрийн албан журмын эрүүл мэндийн даатгалаар нүдний болор солих мэс засал, нарийн оношилгоо, хүүхдийн нүдний эмчилгээг хуулийн дагуу хөнгөлөлттэй үзүүлнэ.',
    coverageServices: [
      'Нүдний болор цайх өвчний мэс засал (Phaco)',
      'Нүдний угийн нарийвчилсан оношилгоо (OCT)',
      'Хүүхдийн нүдний эмгэгийн хяналт, эмчилгээ',
      'Глауком (нүдний даралт)-ын хяналт ба эмийн жор'
    ],
    discountRate: '75% хүртэл',
    billingMethod: 'direct',
    billingMethodLabel: 'Шууд хөнгөлөлт (Автомат тооцоо)',
    requiredDocuments: [
      'Иргэний үнэмлэх эсвэл E-Mongolia цахим үнэмлэх',
      'ЭМД-ын шимтгэл сүүлийн жилүүдэд тасралтгүй төлөгдсөн байх'
    ],
    contactPhone: '1800-1363',
    websiteUrl: 'https://emd.gov.mn',
    featured: true
  },
  {
    id: 'mongol-daatgal',
    name: 'Монгол Даатгал ХК',
    shortName: 'Монгол Даатгал',
    type: 'private',
    typeLabel: 'Хувийн даатгал',
    brandColor: '#2563EB', // Blue
    badgeText: 'Шууд гэрээт түнш',
    description: 'Монгол улсын ууган даатгалын компанитай байгуулсан хамтын ажиллагааны хүрээнд даатгуулагчдын амбулаторийн үзлэг, шинжилгээ, хэвтэн эмчлүүлэх зардлыг шууд төлөлтөөр шийдвэрлэнэ.',
    coverageServices: [
      'Амбулаторийн нарийн мэргэжлийн үзлэг, зөвлөгөө',
      'Оношилгооны шинжилгээ (харааны талбай, биомикроскопи)',
      'Нүдний жижиг мэс ажилбарууд',
      'Эмийн эмчилгээний нөхөн төлбөр'
    ],
    discountRate: 'Багцаас хамаарч 80-100%',
    billingMethod: 'both',
    billingMethodLabel: 'Шууд нэхэмжлэх & Нөхөн олголт',
    requiredDocuments: [
      'Даатгалын гэрээний дугаар / карт',
      'Иргэний үнэмлэх',
      'Эмчийн үзлэгийн маягт, оношлогооны хуудас'
    ],
    contactPhone: '7011-8888',
    websiteUrl: 'https://mongoldaatgal.mn',
    featured: true
  },
  {
    id: 'mandal-daatgal',
    name: 'Мандал Даатгал ХК (Жаргалан)',
    shortName: 'Мандал Даатгал',
    type: 'private',
    typeLabel: 'Хувийн даатгал',
    brandColor: '#0D9488', // Teal
    badgeText: 'Цахим баталгаажилттай',
    description: 'Мандал Даатгалын "Жаргалан" болон байгууллагын багцын даатгуулагчид манай эмнэлгийн бүх салбараар хүлээгдэлгүй, гар утасны апп-аараа урьдчилан баталгаажуулан үйлчлүүлэх бүрэн боломжтой.',
    coverageServices: [
      'Нүдний нарийн оношилгоо, аппаратын шинжилгээ',
      'Нүдний даралт, хуурайшилтын цогц эмчилгээ',
      'Мэс заслын өмнөх ба дараах багц шинжилгээ',
      'Нүдний шил, линзний жорын үзлэг'
    ],
    discountRate: 'Гэрээний лимит хүртэл 100%',
    billingMethod: 'direct',
    billingMethodLabel: 'Шууд тооцоо (Mandal App)',
    requiredDocuments: [
      'Мандал аппликейшны дижитал карт эсвэл даатгалын гэрээ',
      'Хурууны хээ / Иргэний үнэмлэх'
    ],
    contactPhone: '7575-2000',
    websiteUrl: 'https://mandal.mn',
    featured: true
  },
  {
    id: 'ard-daatgal',
    name: 'Ард Даатгал ХК',
    shortName: 'Ард Даатгал',
    type: 'private',
    typeLabel: 'Хувийн даатгал',
    brandColor: '#DC2626', // Red
    badgeText: 'Ard App шууд холболт',
    description: 'Ард Санхүүгийн Нэгдлийн даатгуулагч нарт зориулсан эрүүл мэндийн хөнгөлөлт, хурдан хугацаанд нөхөн төлбөр шийдвэрлэх цахим баримтын системээр үйлчилнэ.',
    coverageServices: [
      'Эмчийн иж бүрэн үзлэг, оношилгоо',
      'Нүдний эмчилгээ, физик эмчилгээ',
      'Гэнэтийн нүдний гэмтлийн анхны тусламж',
      'Шил сонголтын нарийн тодорхойлолт'
    ],
    discountRate: 'Гэрээний дагуу 70-100%',
    billingMethod: 'both',
    billingMethodLabel: 'Шууд тооцоо & Цахим нэхэмжлэл',
    requiredDocuments: [
      'Ард Даатгалын полис дугаар',
      'Иргэний бичиг баримт'
    ],
    contactPhone: '7720-0000',
    websiteUrl: 'https://arddaatgal.mn',
    featured: true
  },
  {
    id: 'bodi-daatgal',
    name: 'Бодь Даатгал ХК',
    shortName: 'Бодь Даатгал',
    type: 'private',
    typeLabel: 'Хувийн даатгал',
    brandColor: '#D97706', // Amber
    badgeText: 'Корпорацийн хөнгөлөлт',
    description: 'Бодь Даатгалын байгууллагын болон гэр бүлийн эрүүл мэндийн даатгалтай харилцагчдад зориулсан хөнгөлөлттэй нүдний тусламж үйлчилгээний хөтөлбөр.',
    coverageServices: [
      'Байгууллагын урьдчилан сэргийлэх багц үзлэг',
      'Хараа шалгах компьютер оношилгоо',
      'Нүдний үрэвсэл, харшлын эмчилгээ',
      'Мэс ажилбар, боолт, шарлага'
    ],
    discountRate: 'Гэрээний нөхцөлөөр',
    billingMethod: 'reimbursement',
    billingMethodLabel: 'Нэхэмжлэлийн шуурхай баримт',
    requiredDocuments: [
      'Даатгалын гэрээ / карт',
      'Эмнэлгийн тамгатай албан тодорхойлолт (манайхаас олгоно)',
      'НӨАТ-ын цахим баримт'
    ],
    contactPhone: '7000-8080',
    websiteUrl: 'https://bodi-insurance.com',
    featured: false
  },
  {
    id: 'tenger-daatgal',
    name: 'Тэнгэр Даатгал ХХК',
    shortName: 'Тэнгэр Даатгал',
    type: 'private',
    typeLabel: 'Хувийн даатгал',
    brandColor: '#4F46E5', // Indigo
    badgeText: 'Гэрээт түншлэл',
    description: 'Харилцагчдын эрүүл мэндийн хамгаалалтыг нэн тэргүүнд тавьж, нүдний эмгэгийн үед түргэн шуурхай даатгалын нөхөн төлбөрийн баримтыг бүрдүүлж өгнө.',
    coverageServices: [
      'Хүүхэд болон насанд хүрэгчдийн үзлэг',
      'Нүдний торлогийн зураг авалт',
      'Аппаратын эмийн эмчилгээ'
    ],
    discountRate: 'Гэрээний дагуу',
    billingMethod: 'reimbursement',
    billingMethodLabel: 'Нөхөн төлбөрийн бүрдүүлэлт',
    requiredDocuments: [
      'Даатгалын гэрээ',
      'Санхүүгийн тамгатай нэхэмжлэх хуудас'
    ],
    contactPhone: '7711-5555',
    websiteUrl: 'https://tengerdaatgal.mn',
    featured: false
  },
  {
    id: 'international-partners',
    name: 'Олон Улсын Эрүүл Мэндийн Даатгалууд (International Insurances)',
    shortName: 'Global Insurance (Cigna, Allianz, Bupa)',
    type: 'international',
    typeLabel: 'Олон улсын даатгал',
    brandColor: '#0284C7', // Sky
    badgeText: 'Англи хэл дээрх баримт',
    description: 'Монгол Улсад оршин суугаа гадаадын иргэд, дипломат төлөөлөгчид болон олон улсын корпорацийн ажилтнуудад Cigna Global, Allianz Care, Bupa Global, SOS International-ийн дагуу англи хэл дээрх албан ёсны эмнэлгийн тодорхойлолт, itemized invoice олгоно.',
    coverageServices: [
      'Comprehensive English Ophthalmologic Consultation',
      'Digital Retinal Imaging & Glaucoma Assessment',
      'Emergency Foreign Body Removal & Ocular Trauma',
      'Official Medical Report for Overseas Claims'
    ],
    discountRate: 'Global Policy Coverage',
    billingMethod: 'both',
    billingMethodLabel: 'Direct GOP / Itemized Claim',
    requiredDocuments: [
      'Passport / Identification Card',
      'International Insurance Member ID / Card',
      'Guarantee of Payment (GOP) letter if pre-arranged'
    ],
    contactPhone: '7705-6699 (Ext 2)',
    featured: true
  }
];

export const BILLING_STEPS: BillingStep[] = [
  {
    step: 1,
    title: 'Даатгалын баталгаажуулалт',
    subtitle: 'Registration & Verification',
    description: 'Эмнэлгийн бүртгэлийн хэсэгт иргэний үнэмлэх эсвэл E-Mongolia апп-аа уншуулан ЭМД болон гэрээт хувийн даатгалын эрхээ 1-2 минутад шалгуулна.',
    duration: '1-2 минут',
    iconName: 'verification',
    requiredDocs: ['Иргэний үнэмлэх / E-Mongolia', 'Даатгалын карт эсвэл гэрээний дугаар']
  },
  {
    step: 2,
    title: 'Эмчийн үзлэг & Төлөвлөгөө',
    subtitle: 'Consultation & Treatment Plan',
    description: 'Мэргэжлийн эмч үзлэг, оношилгоо хийж шаардлагатай эмчилгээ эсвэл мэс заслын заалт тогтоон, даатгалаас хөнгөлөгдөх үнийн нарийвчилсан тооцоог гаргана.',
    duration: '20-30 минут',
    iconName: 'examination',
    requiredDocs: ['Өмнөх үзлэгийн түүх (хэрэв байгаа бол)', 'Эмийн жор, шилний дугаар']
  },
  {
    step: 3,
    title: 'Шууд хөнгөлөлт тооцох',
    subtitle: 'Direct Billing & Co-payment',
    description: 'ЭМД-ын 75% болон хувийн даатгалын хөнгөлөлтийг газар дээр нь шууд хасч тооцно. Үйлчлүүлэгч зөвхөн өөрийн төлөх үлдэгдэл зөрүүг (со-pay) тушаана.',
    duration: '3-5 минут',
    iconName: 'billing',
    requiredDocs: ['Төлбөрийн хэрэгсэл (Карт, QPay, Бэлэн)', 'Даатгалын баталгаажуулах код']
  },
  {
    step: 4,
    title: 'Санхүүгийн баримт & Хяналт',
    subtitle: 'Official Invoicing & Claim Support',
    description: 'И-Баримт (НӨАТ), эмнэлгийн тамгатай албан тодорхойлолт, төлбөрийн задаргааг нэг цонхоор олгоно. Хувийн даатгал руу нэмэлт нөхөн төлбөр авах баримтыг бүрдүүлж өгнө.',
    duration: '2 минут',
    iconName: 'receipt',
    requiredDocs: ['НӨАТ-ын цахим баримт', 'Эмчийн гарын үсэгтэй нэхэмжлэлийн хуудас']
  }
];

export const INSURANCE_METRICS = [
  { label: 'ЭМД-ын болор солих мэс заслын хөнгөлөлт', value: '75%', highlight: 'Хамгийн өндөр хөнгөлөлт' },
  { label: 'Хамтран ажиллагч даатгалын байгууллагууд', value: '10+', highlight: 'Улсын болон хувийн' },
  { label: 'Шууд тооцоо хийх дундаж хугацаа', value: '3 мин', highlight: 'Цахим баталгаажилт' },
  { label: 'Жилд даатгалаар үйлчлүүлсэн иргэд', value: '15,000+', highlight: 'Сэтгэл ханамж 98%' },
];
