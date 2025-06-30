'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import ThemeLogo from '../elements/ThemeLogo';
import CallbackModal from './CallbackModal';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerbrandSection}>
            <div className={styles.footerBrand}>
              <Link href="/">
                <ThemeLogo />
              </Link>
              <div className={styles.socialLinks}>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaTelegram size={26} />
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaInstagram size={26} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footernavSections}>
            <div className={styles.footerSection}>
              <h4>Покупателю</h4>
              <div className={styles.footerLinks}>
                <Link href="/">Главная</Link>
                <Link href="/catalog">Каталог товаров</Link>
                <Link href="/oplata">Способы Оплаты</Link>
                <Link href="/dogovor">Публичная оферта</Link>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Компания</h4>
              <div className={styles.footerLinks}>
                <Link href="/about">О нас</Link>
                <Link href="/blog">Новости</Link>
                <Link href="/otzyvy">Отзывы</Link>
              </div>
            </div>
          </div>
          <div className={styles.footercontactsSection}>
            <h4>Контакты</h4>
            <div className={styles.footerContacts}>
              <p className={styles.contactsPhone}>+7 900 111 22 33</p>
              <p className={styles.contactsHours}>Ежедневно с 8:00 до 20:30</p>
              <p className={styles.contactsEmail}>auto@razbor-na-dmitrovke.com</p>
              <button className="callbackBtn" onClick={openModal}>Заказать звонок</button>
            </div>
          </div>
        </div>
        <div className={styles.footerDisclaimer}>
          <p className={styles.disclaimerText}>
            Вся представленная на сайте информация, касающаяся комплектаций, технических характеристик, 
            цветовых сочетаний, а также стоимости автомобилей и сервисного обслуживания носит 
            информационный характер и не является публичной офертой.
          </p>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; <span>{currentYear}</span> Autoservice.</p>
          <div className={styles.footerbottomLinks}>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Условия использования</Link>
          </div>
          <div className={styles.developerCredit}>
            <p>Cайт разработан <a href="https://github.com/lifeofcapo" target="_blank" rel="noopener noreferrer">by web-developer</a></p>
          </div>
        </div>
      </div>
    <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
    </footer>
  );
}