export interface ScrollRevealOptions {
  delayMs?: number;
  threshold?: number;
  rootMargin?: string;
}

export function getRevealClassName(isRevealed: boolean, extraClasses = ''): string {
  const base = 'reveal-on-scroll';
  const state = isRevealed ? 'is-revealed' : '';
  return [base, state, extraClasses].filter(Boolean).join(' ');
}

export function computeTransitionDelay(index: number, stepDelay = 100): number {
  return Math.max(0, index * stepDelay);
}
