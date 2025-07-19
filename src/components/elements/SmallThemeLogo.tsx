'use client';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function SmallThemeLogo({ className = '' }) {
  const { theme } = useTheme();
  
  return (
      <div className={`logo-container ${className}`}>
        {theme === 'dark' ? (
          <Image
            src="/images/small-logo-dark.png"
            alt="Авто Разбор - логотип"
            fill
            priority
            className='logo-container'
          />
        ) : (
          <Image
            src="/images/small-logo-light.png"
            alt="Авто Разбор - логотип"
            fill
            priority
            className='logo-container'
          />
        )}
      </div>
  );
}