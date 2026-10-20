import type { FeedbackSubmission, FeedbackResponse } from '../types/index.ts';

export interface FeedbackValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFeedbackInput(data: Partial<FeedbackSubmission>): FeedbackValidationResult {
  const name = (data.name || '').trim();
  const contact = (data.contact || '').trim();
  const message = (data.message || '').trim();

  if (!name) {
    return { valid: false, error: 'Та өөрийн нэрээ оруулна уу.' };
  }
  if (name.length < 2) {
    return { valid: false, error: 'Нэр хамгийн багадаа 2 тэмдэгт байх ёстой.' };
  }
  if (name.length > 80) {
    return { valid: false, error: 'Нэр 80 тэмдэгтээс хэтрэхгүй байх ёстой.' };
  }

  if (!contact) {
    return { valid: false, error: 'Утасны дугаар эсвэл и-мэйл хаягаа оруулна уу.' };
  }
  // Check phone (min 6 digits) or email (@)
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const digitsOnly = contact.replace(/\D/g, '');
  const isPhone = digitsOnly.length >= 6 && digitsOnly.length <= 15;

  if (!isEmail && !isPhone) {
    return {
      valid: false,
      error: 'Утасны дугаар (жишээ нь: 77056699) эсвэл зөв и-мэйл хаяг оруулна уу.',
    };
  }

  if (!message) {
    return { valid: false, error: 'Санал хүсэлтийн утгаа оруулна уу.' };
  }
  if (message.length < 5) {
    return { valid: false, error: 'Санал хүсэлт хамгийн багадаа 5 тэмдэгт байх ёстой.' };
  }
  if (message.length > 2000) {
    return { valid: false, error: 'Санал хүсэлт 2000 тэмдэгтээс хэтрэхгүй байх ёстой.' };
  }

  return { valid: true };
}

export async function sendFeedbackApi(
  payload: FeedbackSubmission
): Promise<FeedbackResponse> {
  const validation = validateFeedbackInput(payload);
  if (!validation.valid) {
    throw new Error(validation.error || 'Маягтын мэдээлэл буруу байна.');
  }

  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      contact: payload.contact.trim(),
      message: payload.message.trim(),
      source: payload.source,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      data?.error ||
      data?.message ||
      'Сервертэй холбогдоход алдаа гарлаа. Та дахин оролдоно уу.';
    throw new Error(errorMsg);
  }

  return {
    success: true,
    message:
      data?.message ||
      'Таны санал хүсэлтийг амжилттай хүлээн авч, холбогдох ажилтанд илгээлээ.',
    deliveredEmail: data?.deliveredEmail,
    timestamp: data?.timestamp,
  };
}
