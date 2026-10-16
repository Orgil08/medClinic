export type ServiceCategory = 'diagnostic' | 'treatment' | 'surgery' | 'pediatric' | 'refraction';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: ServiceCategory;
  categoryLabel: string;
  iconName: string;
  badge?: string;
  emdCovered: boolean;
  emdNote?: string;
  indications: string[];
  procedures: string[];
  preparationTips: string[];
  estimatedDuration: string;
  faqs: { question: string; answer: string }[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  experienceYears: number;
  education: string[];
  specialties: string[];
  branches: string[];
  scheduleNote: string;
  isConsultant?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  tagline: string;
  district: string;
  address: string;
  landmark: string;
  phones: string[];
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
  busRoutes: string;
  isMain: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'Зарлал' | 'Мэдээ' | 'Эрүүл мэнд' | 'Аян';
  summary: string;
  content: string[];
  publishedDate: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface HealthAdvice {
  id: string;
  title: string;
  category: string;
  summary: string;
  tips: string[];
  detailedContent: string;
  recommendedAge?: string;
}

export interface ContactFormData {
  fullName: string;
  contact: string;
  category: 'Санал хүсэлт' | 'Үйлчилгээ лавлах' | 'Цаг захиалгын тусламж' | 'Талархал';
  message: string;
  consent: boolean;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export interface Testimonial {
  id: string;
  patientName: string;
  ageOrContext: string;
  serviceReceived: string;
  branch: string;
  rating: number; // 1-5
  date: string;
  content: string;
  verified: boolean;
  highlight: string;
}

