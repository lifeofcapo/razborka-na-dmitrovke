import "./globals.css";
import { montserrat } from "@/lib/font";
import Header from "@/components/modals/Header";
import Footer from "@/components/modals/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Favicon from "@/components/modals/Favicon";

export const metadata = {
  title: "Авторазборка На Дмитровке",
  description: "Разбор на Дмитровке. Качественные автозапчасти ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <head></head>
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
