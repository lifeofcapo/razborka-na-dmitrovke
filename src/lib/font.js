import localFont from 'next/font/local';

export const montserrat = localFont({
  src: '../../public/fonts/Montserrat-Medium.ttf',
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});