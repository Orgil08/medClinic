import type { ContactFormData, FormValidationResult } from '../types/index.ts';

/**
 * Validates Mongolian phone number (e.g. 77056699, 99112233, 88112233) or email address
 */
export function isValidPhoneOrEmail(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim();

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) return true;

  // Phone regex (allowing optional +976, dashes, spaces, 8 digits)
  const cleanedDigits = trimmed.replace(/[\s\-+]/g, '');
  if (cleanedDigits.startsWith('976') && cleanedDigits.length === 11) {
    return true;
  }
  if (/^[789]\d{7}$/.test(cleanedDigits)) {
    return true;
  }

  return false;
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): FormValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Нэрээ хамгийн багадаа 2 үсгээр оруулна уу.';
  } else if (data.fullName.trim().length > 60) {
    errors.fullName = 'Нэр 60 тэмдэгтээс хэтрэхгүй байна.';
  }

  if (!data.contact || !isValidPhoneOrEmail(data.contact)) {
    errors.contact = 'Зөв утасны дугаар (8 оронтой) эсвэл и-мэйл хаягаа оруулна уу.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Мессежийн утга хамгийн багадаа 10 тэмдэгт байх шаардлагатай.';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Мессеж 1000 тэмдэгтээс хэтрэхгүй байна.';
  }

  if (!data.consent) {
    errors.consent = 'Хувийн мэдээлэл боловсруулах нөхцөлийг зөвшөөрнө үү.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a phone number for direct dial / display
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}
