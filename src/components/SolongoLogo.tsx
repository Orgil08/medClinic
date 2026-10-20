import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

interface SolongoLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'white' | 'auto';
  height?: number | string;
  width?: number | string;
}

export const SolongoLogo: React.FC<SolongoLogoProps> = ({
  className = '',
  variant = 'auto',
  height,
  width,
}) => {
  const { isDark } = useTheme();

  if (variant === 'icon') {
    return (
      <img
        src="/images/logo-icon.png"
        alt="Солонго нүдний эмнэлэг"
        className={`object-contain shrink-0 ${className}`}
        style={{ height: height ?? '36px', width: width ?? 'auto' }}
        loading="eager"
      />
    );
  }

  if (variant === 'white' || (variant === 'auto' && isDark)) {
    return (
      <img
        src="/images/logo-white.png"
        alt="Солонго нүдний эмнэлэг"
        className={`object-contain shrink-0 ${className}`}
        style={{ height: height ?? '42px', width: width ?? 'auto' }}
        loading="eager"
      />
    );
  }

  return (
    <img
      src="/images/logo.png"
      alt="Солонго нүдний эмнэлэг"
      className={`object-contain shrink-0 ${className}`}
      style={{ height: height ?? '42px', width: width ?? 'auto' }}
      loading="eager"
    />
  );
};

export default SolongoLogo;
