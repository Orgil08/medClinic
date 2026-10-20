import { isValidPhoneOrEmail } from './validation.ts';

export interface AppointmentBookingData {
  fullName: string;
  phone: string;
  email?: string;
  branchId: string;
  serviceCategory: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: string; // '09:00 - 12:00' | '13:00 - 16:30'
  notes?: string;
}

export interface AppointmentBookingRecord {
  id: string;
  bookingCode: string;
  data: AppointmentBookingData;
  submittedAt: string;
  status: 'pending_confirmation' | 'confirmed';
}

export interface AppointmentValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof AppointmentBookingData, string>>;
  cleanData?: AppointmentBookingData;
}

export const APPOINTMENT_TIME_SLOTS = [
  { id: 'morning', label: 'Өглөөний ээлж: 09:00 - 12:00' },
  { id: 'afternoon', label: 'Үдээс хойш: 13:00 - 16:30' },
];

export const APPOINTMENT_SERVICE_CATEGORIES = [
  'Нүдний ерөнхий нарийн үзлэг, оношилгоо',
  'Хараа тэглэх лазер мэс засал (LASIK / Femto-LASIK)',
  'Болор цайх (Кататакт) солих мэс засал',
  'Хүүхдийн нүдний эмгэг, хялар засах эмчилгээ',
  'Торлог бүрхэвчийн лазер болон мэс засал',
  'Глауком (Нүдний даралт) хяналт, эмчилгээ',
  'Шил тааруулах, контакт линзийн үзлэг',
];

/**
 * Validates appointment form submission data
 */
export function validateAppointmentBooking(
  data: Partial<AppointmentBookingData>
): AppointmentValidationResult {
  const errors: Partial<Record<keyof AppointmentBookingData, string>> = {};

  const cleanName = (data.fullName || '').trim();
  if (!cleanName || cleanName.length < 2) {
    errors.fullName = 'Өвчтөний нэрийг хамгийн багадаа 2 үсгээр оруулна уу.';
  } else if (cleanName.length > 80) {
    errors.fullName = 'Нэр 80 тэмдэгтээс хэтрэхгүй байна.';
  }

  const cleanPhone = (data.phone || '').trim().replace(/[\s\-]/g, '');
  const digitsOnly = cleanPhone.replace(/[^\d]/g, '');
  const isValidPhone =
    (digitsOnly.length === 8 && /^[789]\d{7}$/.test(digitsOnly)) ||
    (digitsOnly.length === 11 && digitsOnly.startsWith('976') && /^[789]\d{7}$/.test(digitsOnly.slice(3))) ||
    (digitsOnly.length >= 6 && digitsOnly.length <= 15);

  if (!isValidPhone) {
    errors.phone = 'Холбоо барих утасны дугаараа зөв оруулна уу (Жишээ нь: 77056699, 88112233).';
  }

  const cleanEmail = (data.email || '').trim();
  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.email = 'Имэйл хаягаа зөв оруулна уу (Жишээ нь: name@domain.com).';
  }

  const branchId = data.branchId || 'central';
  if (!['central', 'ubh', 'lasik'].includes(branchId)) {
    errors.branchId = 'Үзүүлэх салбараа зөв сонгоно уу.';
  }

  const serviceCategory = (data.serviceCategory || '').trim();
  if (!serviceCategory) {
    errors.serviceCategory = 'Үзлэгийн үндсэн төрлийг сонгоно уу.';
  }

  const preferredDate = (data.preferredDate || '').trim();
  if (!preferredDate) {
    errors.preferredDate = 'Үзлэгт ирэх өдрөө сонгоно уу.';
  } else {
    const selected = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime())) {
      errors.preferredDate = 'Өдрийн формат буруу байна.';
    } else if (selected < today) {
      errors.preferredDate = 'Өнгөрсөн өдөр сонгох боломжгүй.';
    }
  }

  const preferredTimeSlot = (data.preferredTimeSlot || '').trim() || APPOINTMENT_TIME_SLOTS[0].label;

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    cleanData: isValid
      ? {
          fullName: cleanName,
          phone: digitsOnly,
          email: cleanEmail || undefined,
          branchId,
          serviceCategory,
          preferredDate,
          preferredTimeSlot,
          notes: (data.notes || '').trim(),
        }
      : undefined,
  };
}

/**
 * Generates an appointment confirmation code (e.g. SLG-8491)
 */
export function generateAppointmentCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SLG-${num}`;
}

const STORAGE_KEY = 'solongo_hospital_appointments';

/**
 * Saves appointment record to client localStorage
 */
export function saveAppointmentRecord(cleanData: AppointmentBookingData, customCode?: string): AppointmentBookingRecord {
  const code = customCode || generateAppointmentCode();
  const record: AppointmentBookingRecord = {
    id: `apt-${Date.now()}`,
    bookingCode: code,
    data: cleanData,
    submittedAt: new Date().toISOString(),
    status: 'pending_confirmation',
  };

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingStr = window.localStorage.getItem(STORAGE_KEY);
      const existing: AppointmentBookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
    }
  } catch (e) {
    console.error('Failed to save appointment to localStorage', e);
  }

  return record;
}

/**
 * Reads appointment records from client localStorage
 */
export function getStoredAppointmentRecords(): AppointmentBookingRecord[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingStr = window.localStorage.getItem(STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    }
  } catch (e) {
    console.error('Failed to read appointments from localStorage', e);
  }
  return [];
}

/**
 * Server-side API submission for appointment bookings with email delivery
 */
export async function sendAppointmentApi(data: AppointmentBookingData): Promise<{
  success: boolean;
  bookingCode: string;
  message: string;
  timestamp: string;
  deliveredEmail?: string;
}> {
  const validation = validateAppointmentBooking(data);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0] || 'Мэдээлэл дутуу байна.';
    throw new Error(firstError);
  }

  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(validation.cleanData),
  });

  const resJson = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(resJson?.error || 'Цаг захиалгын хүсэлт илгээхэд алдаа гарлаа.');
  }

  // Also sync locally
  if (validation.cleanData) {
    saveAppointmentRecord(validation.cleanData, resJson.bookingCode);
  }

  return {
    success: true,
    bookingCode: resJson.bookingCode,
    message: resJson.message,
    timestamp: resJson.timestamp,
    deliveredEmail: resJson.deliveredEmail,
  };
}
