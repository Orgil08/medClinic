/**
 * Pure logic and types for hospital toast notification system.
 * Designed for decoupled testing and bulletproof state transitions.
 */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // Duration in ms, 0 means persistent until closed
  createdAt: number;
  action?: ToastAction;
}

export interface CreateToastOptions {
  message?: string;
  duration?: number;
  action?: ToastAction;
}

/**
 * Generate a unique ID for a toast
 */
export function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates a normalized ToastItem
 */
export function createToast(
  type: ToastType,
  title: string,
  options?: CreateToastOptions
): ToastItem {
  const trimmedTitle = (title || '').trim();
  const defaultDuration = type === 'error' ? 6000 : 4500;

  return {
    id: generateToastId(),
    type,
    title: trimmedTitle || (type === 'success' ? 'Амжилттай' : 'Мэдэгдэл'),
    message: options?.message?.trim(),
    duration: options?.duration !== undefined ? Math.max(0, options.duration) : defaultDuration,
    createdAt: Date.now(),
    action: options?.action,
  };
}

/**
 * Adds a new toast to the list, respecting max toasts limit (FIFO)
 */
export function addToastToList(
  currentToasts: ToastItem[],
  newToast: ToastItem,
  maxToasts = 4
): ToastItem[] {
  const updated = [newToast, ...currentToasts];
  if (updated.length > maxToasts) {
    return updated.slice(0, maxToasts);
  }
  return updated;
}

/**
 * Removes a toast by its id
 */
export function removeToastFromList(currentToasts: ToastItem[], id: string): ToastItem[] {
  return currentToasts.filter((t) => t.id !== id);
}

/**
 * Checks if a toast should auto-dismiss given the elapsed time
 */
export function isToastExpired(toast: ToastItem, now = Date.now()): boolean {
  if (!toast.duration || toast.duration <= 0) {
    return false;
  }
  return now - toast.createdAt >= toast.duration;
}

/**
 * Pure helper for accessible ARIA roles and labels
 */
export function getToastAriaAttributes(type: ToastType) {
  if (type === 'error') {
    return {
      role: 'alert' as const,
      'aria-live': 'assertive' as const,
    };
  }
  return {
    role: 'status' as const,
    'aria-live': 'polite' as const,
  };
}
