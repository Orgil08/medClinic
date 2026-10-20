export interface NewsletterSubscription {
  email: string;
  topics: string[];
  subscribedAt: string;
}

export interface NewsletterTopic {
  id: string;
  label: string;
  description: string;
}

export const NEWSLETTER_TOPICS: NewsletterTopic[] = [
  {
    id: 'health-tips',
    label: 'Эрүүл мэндийн зөвлөгөө',
    description: 'Дэлгэцийн ядаргаа, хуурай нүд, 20-20-20 дүрэм'
  },
  {
    id: 'treatments-tech',
    label: 'Эмчилгээ & Шинэ технологи',
    description: 'Болор солих, уян болор, лазер хараа засал'
  },
  {
    id: 'pediatric',
    label: 'Хүүхдийн хараа хамгаалал',
    description: 'Сургуулийн насны хүүхдийн харааны хөгжил, сэрэмжлүүлэг'
  },
  {
    id: 'discounts-events',
    label: 'ЭМД & Хөнгөлөлтийн зар',
    description: 'ЭМД-ын 75% хөнгөлөлт болон урьдчилан сэргийлэх үзлэгийн аян'
  }
];

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

export function validateNewsletterInput(
  email: string,
  topics?: string[]
): { isValid: boolean; error?: string; cleanEmail?: string; cleanTopics: string[] } {
  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanEmail) {
    return {
      isValid: false,
      error: 'И-мэйл хаягаа оруулна уу.',
      cleanTopics: []
    };
  }

  if (!isValidEmail(cleanEmail)) {
    return {
      isValid: false,
      error: 'И-мэйл хаягийн бичиглэл буруу байна (жишээ: name@domain.com).',
      cleanTopics: []
    };
  }

  const validTopicIds = new Set(NEWSLETTER_TOPICS.map((t) => t.id));
  const cleanTopics = (topics || []).filter((id) => validTopicIds.has(id));

  // If no topics passed, select all by default
  const resolvedTopics = cleanTopics.length > 0 ? cleanTopics : NEWSLETTER_TOPICS.map((t) => t.id);

  return {
    isValid: true,
    cleanEmail,
    cleanTopics: resolvedTopics
  };
}

const STORAGE_KEY = 'solongo_newsletter_subscription';

export function getStoredSubscription(): NewsletterSubscription | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as NewsletterSubscription;
  } catch {
    return null;
  }
}

export function saveSubscription(email: string, topics: string[]): NewsletterSubscription {
  const sub: NewsletterSubscription = {
    email: email.trim().toLowerCase(),
    topics,
    subscribedAt: new Date().toISOString()
  };

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
    } catch {
      // storage quota or private browsing fallback
    }
  }

  return sub;
}

export function clearSubscription(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
