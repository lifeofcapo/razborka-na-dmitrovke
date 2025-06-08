import '../globals.css';
import { montserrat } from '@/lib/font';
import Header from '@/components/modals/Header';
import Footer from '@/components/modals/Footer';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: "Авторазборка На Дмитровке",
  description: "Разбор на Дмитровке. Качественные автозапчасти ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body>
        <ThemeProvider> 
          <CartProvider>
            <div className="app-wrapper">
              <Header />
              <main className="main-content">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}