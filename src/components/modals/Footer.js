import Link from 'next/link';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import ThemeLogo from '../ThemeLogo';
import { ThemeProvider } from '@/context/ThemeContext';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <ThemeLogo />
              <div className="social-links">
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTelegram size={26} />
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram size={26} />
                </a>
              </div>
            </div>
          </div>

          {/* Центральная колонка - Навигация */}
          <div className="footer-nav-sections">
            <div className="footer-section">
              <h4>Покупателю</h4>
              <div className="footer-links">
                <Link href="/">Главная</Link>
                <Link href="/catalog">Каталог товаров</Link>
                <Link href="/oplata">Способы Оплаты</Link>
                <Link href="/dogovor">Публичная оферта</Link>
              </div>
            </div>

            <div className="footer-section">
              <h4>Компания</h4>
              <div className="footer-links">
                <Link href="/about">О нас</Link>
                <Link href="/blog">Новости</Link>
                <Link href="/otzyvy">Отзывы</Link>
              </div>
            </div>
          </div>

          {/* Правая колонка - Контакты */}
          <div className="footer-contacts-section">
            <h4>Контакты</h4>
            <div className="footer-contacts">
              <p className="contact-phone">+7 900 111 22 33</p>
              <p className="contact-hours">Ежедневно с 8:00 до 20:30</p>
              <p className="contact-email">auto@razbor-na-dmitrovke.com</p>
              <button className="callback-btn">Заказать звонок</button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p className="disclaimer-text">
            Вся представленная на сайте информация, касающаяся комплектаций, технических характеристик, 
            цветовых сочетаний, а также стоимости автомобилей и сервисного обслуживания носит 
            информационный характер и не является публичной офертой.
          </p>
        </div>

        {/* Нижняя часть футера */}
        <div className="footer-bottom">
          <p>&copy; <span>{currentYear}</span> Autoservice.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Условия использования</Link>
          </div>
          <div className="developer-credit">
            <p>сайт разработан <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">by web-developer</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}