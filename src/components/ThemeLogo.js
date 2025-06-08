'use client';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeLogo({ className = '' }) {
  const { theme } = useTheme();
  
  return (
    <div className={`logo-container ${className}`}>
      {theme === 'dark' ? (
        <Image
          src="/images/dark-logo.png"
          alt="Авто Разбор - логотип"
          fill
          priority
          className="logo-container"
        />
      ) : (
        <Image
          src="/images/light-logo.png"
          alt="Авто Разбор - логотип"
          fill
          priority
          className="logo-container"
        />
      )}
    </div>
  );
}