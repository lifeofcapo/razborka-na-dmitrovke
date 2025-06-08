import localFont from 'next/font/local';

export const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Montserrat-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
        {
      path: '../../public/fonts/Montserrat-Semibold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../public/fonts/Montserrat-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  // CSS-переменная для использования
  variable: '--font-montserrat',
  // Дополнительные опции (опционально)
  display: 'swap', 
  preload: true,  
  fallback: ['system-ui', 'sans-serif'], 
  subsets: ['latin', 'cyrillic'],
});