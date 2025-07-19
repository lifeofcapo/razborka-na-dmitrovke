'use client';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeLogo({ className = '' }) {
  const { theme } = useTheme();
  
  return (
    <div className={`footer-logo-container ${className}`}>
      {theme === 'dark' ? (
        <Image
          src="/images/dark-logo.png"
          alt="Авто Разбор - логотип"
          fill
          priority
          className="footer-logo-container"
        />
      ) : (
        <Image
          src="/images/light-logo.png"
          alt="Авто Разбор - логотип"
          fill
          priority
          className="footer-logo-container"
        />
      )}
    </div>
  );
}