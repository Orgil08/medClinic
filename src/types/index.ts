export type ServiceCategory = 'all' | 'diagnostic' | 'surgery' | 'treatment';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  categoryLabel: string;
  iconName: string;
  badge?: string;
  emdCovered: boolean;
  emdNote?: string;
  indications: string[];
  procedures: string[];
  preparationTips: string[];
  estimatedDuration: string;
  faqs: ServiceFAQ[];
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

export interface BranchHours {
  weekdays: string;
  saturday: string;
  sunday: string;
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
  hours: BranchHours;
  googleMapsUrl: string;
  busRoutes: string;
  isMain: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: string;
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
}

export interface Testimonial {
  id: string;
  patientName: string;
  ageOrContext: string;
  serviceReceived: string;
  branch: string;
  rating: number;
  date: string;
  verified: boolean;
  highlight: string;
  content: string;
}

export type FAQCategory = 'all' | 'insurance' | 'surgery' | 'eye-care' | 'pediatric';

export interface FAQItem {
  id: string;
  category: string;
  categoryLabel: string;
  highlightTag?: string;
  question: string;
  answer: string;
}

export interface FeedbackSubmission {
  name: string;
  contact: string;
  message: string;
  source: 'home' | 'contact';
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  deliveredEmail?: string;
  timestamp?: string;
}

export interface ContactFormData {
  fullName: string;
  contact: string;
  category?: string;
  message: string;
  consent?: boolean;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

