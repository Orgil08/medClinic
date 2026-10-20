import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  ToastItem,
  ToastType,
  CreateToastOptions,
  createToast,
  addToastToList,
  removeToastFromList,
} from '../utils/toast.ts';
import { ToastContainer } from '../components/Toast.tsx';

interface ToastApi {
  success: (title: string, message?: string, options?: Omit<CreateToastOptions, 'message'>) => string;
  error: (title: string, message?: string, options?: Omit<CreateToastOptions, 'message'>) => string;
  info: (title: string, message?: string, options?: Omit<CreateToastOptions, 'message'>) => string;
  warning: (title: string, message?: string, options?: Omit<CreateToastOptions, 'message'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: ToastApi;
  addToast: (toastItem: ToastItem) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 4,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => removeToastFromList(prev, id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (newToast: ToastItem) => {
      setToasts((prev) => addToastToList(prev, newToast, maxToasts));
    },
    [maxToasts]
  );

  const show = useCallback(
    (type: ToastType, title: string, message?: string, options?: Omit<CreateToastOptions, 'message'>) => {
      const item = createToast(type, title, {
        message,
        ...options,
      });
      addToast(item);
      return item.id;
    },
    [addToast]
  );

  const toastApi: ToastApi = useMemo(
    () => ({
      success: (title, message, options) => show('success', title, message, options),
      error: (title, message, options) => show('error', title, message, options),
      info: (title, message, options) => show('info', title, message, options),
      warning: (title, message, options) => show('warning', title, message, options),
      dismiss: dismissToast,
      dismissAll,
    }),
    [show, dismissToast, dismissAll]
  );

  const value = useMemo(
    () => ({
      toasts,
      toast: toastApi,
      addToast,
      dismissToast,
      dismissAll,
    }),
    [toasts, toastApi, addToast, dismissToast, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} position={position} />
    </ToastContext.Provider>
  );
};

/**
 * Reusable custom hook to access toast notification API anywhere in the app
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
