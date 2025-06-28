import '../globals.css';
import { montserrat } from '@/lib/font';
import Header from '@/components/modals/Header';
import Footer from '@/components/modals/Footer';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Favicon from '@/components/modals/Favicon';

export const metadata = {
  title: "Авторазборка На Дмитровке",
  description: "Разбор на Дмитровке. Качественные автозапчасти ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons-light/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons-light/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons-light/favicon-16x16.png" />
        <link rel="manifest" href="/icons-light/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider> 
          <AuthProvider>
            <CartProvider>
              <div className="app-wrapper">
                <Header />
                <main className="main-content">
                  <Favicon />
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}