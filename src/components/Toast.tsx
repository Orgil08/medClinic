import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  ExternalLink
} from 'lucide-react';
import {
  ToastItem,
  ToastType,
  getToastAriaAttributes
} from '../utils/toast.ts';

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);
  const remainingTimeRef = useRef(toast.duration || 4500);
  const lastTickRef = useRef(Date.now());

  // Auto-dismiss and countdown progress bar
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    lastTickRef.current = Date.now();
    const interval = setInterval(() => {
      if (!isPaused && !isClosing) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;

        remainingTimeRef.current -= delta;
        const pct = Math.max(0, (remainingTimeRef.current / toast.duration!) * 100);
        setProgress(pct);

        if (remainingTimeRef.current <= 0) {
          clearInterval(interval);
          handleClose();
        }
      } else {
        lastTickRef.current = Date.now();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, toast.duration, isPaused, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200);
  };

  const ariaAttrs = getToastAriaAttributes(toast.type);

  // Variant styling matching Solongo Hospital minimalist medical aesthetic
  const getVariantStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          wrapper: 'bg-white/95 border-emerald-500/30 text-slate-800 shadow-xl shadow-emerald-950/10',
          iconWrapper: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          progressBar: 'bg-gradient-to-r from-emerald-500 to-sky-500',
          accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
          badgeText: 'Амжилттай'
        };
      case 'error':
        return {
          wrapper: 'bg-white/95 border-rose-500/30 text-slate-800 shadow-xl shadow-rose-950/10',
          iconWrapper: 'bg-rose-50 text-rose-600 ring-1 ring-rose-500/20',
          icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          progressBar: 'bg-gradient-to-r from-rose-500 to-red-500',
          accentBadge: 'bg-rose-50 text-rose-700 border-rose-200/60',
          badgeText: 'Алдаа'
        };
      case 'warning':
        return {
          wrapper: 'bg-white/95 border-amber-500/30 text-slate-800 shadow-xl shadow-amber-950/10',
          iconWrapper: 'bg-amber-50 text-amber-600 ring-1 ring-amber-500/20',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          progressBar: 'bg-gradient-to-r from-amber-500 to-yellow-500',
          accentBadge: 'bg-amber-50 text-amber-700 border-amber-200/60',
          badgeText: 'Анхааруулга'
        };
      case 'info':
      default:
        return {
          wrapper: 'bg-white/95 border-blue-500/30 text-slate-800 shadow-xl shadow-blue-950/10',
          iconWrapper: 'bg-blue-50 text-[#1769AA] ring-1 ring-blue-500/20',
          icon: <Info className="w-5 h-5 text-[#1769AA] shrink-0" />,
          progressBar: 'bg-gradient-to-r from-[#1769AA] to-sky-400',
          accentBadge: 'bg-blue-50 text-[#1769AA] border-blue-200/60',
          badgeText: 'Мэдээлэл'
        };
    }
  };

  const style = getVariantStyles(toast.type);

  return (
    <div
      {...ariaAttrs}
      data-testid={`toast-${toast.id}`}
      data-type={toast.type}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-200 ${
        style.wrapper
      } ${
        isClosing
          ? 'opacity-0 scale-95 translate-y-2'
          : 'opacity-100 scale-100 translate-y-0 animate-in fade-in slide-in-from-bottom-3 duration-250'
      }`}
    >
      <div className="p-4 sm:p-4.5 flex items-start gap-3.5">
        {/* Status Icon */}
        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${style.iconWrapper}`}>
          {style.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.accentBadge}`}
            >
              {style.badgeText}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 leading-snug">
            {toast.title}
          </h4>

          {toast.message && (
            <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
              {toast.message}
            </p>
          )}

          {toast.action && (
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  handleClose();
                }}
                className="text-xs font-semibold text-[#1769AA] hover:text-[#123B63] underline flex items-center gap-1 cursor-pointer"
              >
                <span>{toast.action.label}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Мэдэгдлийг хаах"
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100/80 transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress countdown bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="h-1 w-full bg-slate-100/70 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ${style.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'bottom-right',
}) => {
  if (toasts.length === 0) return null;

  const positionClasses = {
    'top-right': 'top-5 right-5 sm:right-6',
    'bottom-right': 'bottom-5 right-5 sm:right-6',
    'bottom-left': 'bottom-5 left-5 sm:left-6',
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
  }[position];

  return (
    <aside
      aria-label="Мэдэгдлүүд"
      className={`fixed z-[9999] max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-none flex flex-col gap-2.5 ${positionClasses}`}
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </aside>
  );
};
