'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import ImageComponent from '@/components/ImageComponent';

export default function OplataPage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Способы оплаты</h1>
                <section className={styles.faqSection}>
                    <div className={styles.faqTopic}>
                        <div 
                            className={styles.faqItem} 
                            onClick={() => toggleFAQ(0)}
                        >
                            <div className={styles.faqQuestion}>
                                Оплата по QR-коду (все города России, кроме Крыма)
                                <span className={`${styles.arrow} ${activeIndex === 0 ? styles.up : ''}`}></span>
                            </div>
                            <div className={`${styles.faqContent} ${activeIndex === 0 ? styles.active : ''}`}>
                                <h3>Для оплаты</h3>
                                <p>Отсканируйте QR-код в мобильном приложении банка или штатной камерой телефона</p>
                                
                                {/* Добавленное изображение QR-кода */}
                                <div className={styles.qrCodeContainer}>
                                    <ImageComponent 
                                        src="/images/qr-code.png" 
                                        alt="QR-код для оплаты"
                                        className={styles.qrCodeImage}
                                    />
                                    <p className={styles.qrCodeNote}>Наведите камеру на QR-код для оплаты</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.faqTopic}>
                        <div 
                            className={styles.faqItem} 
                            onClick={() => toggleFAQ(1)}
                        >
                            <div className={styles.faqQuestion}>
                                Оплата наличными (Москва, Санкт-Петербург, Симферополь)
                                <span className={`${styles.arrow} ${activeIndex === 1 ? styles.up : ''}`}></span>
                            </div>
                            <div className={`${styles.faqContent} ${activeIndex === 1 ? styles.active : ''}`}>
                                <p>Заказ можно оплатить наличными в пункте выдачи</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.faqTopic}>
                        <div 
                            className={styles.faqItem} 
                            onClick={() => toggleFAQ(2)}
                        >
                            <div className={styles.faqQuestion}>
                                Оплата банковской картой (Visa, MasterCard, Белкарт, Мир)
                                <span className={`${styles.arrow} ${activeIndex === 2 ? styles.up : ''}`}></span>
                            </div>
                            <div className={`${styles.faqContent} ${activeIndex === 2 ? styles.active : ''}`}>
                                <p>Выставляем счет для оплаты в онлайн-банке или через банкомат</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.faqTopic}>
                        <div 
                            className={styles.faqItem} 
                            onClick={() => toggleFAQ(3)}
                        >
                            <div className={styles.faqQuestion}>
                                Безналичный расчёт для юридических лиц и ИП
                                <span className={`${styles.arrow} ${activeIndex === 3 ? styles.up : ''}`}></span>
                            </div>
                            <div className={`${styles.faqContent} ${activeIndex === 3 ? styles.active : ''}`}>
                                <p>Безналичный перевод денег из банка в банк</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div className={styles.priceNote}>
                    <p>1. Цена Товара указывается рядом с определенным наименованием товара на Сайте интернет-магазина на странице товара в российских рублях и включает в себя налог на добавленную стоимость.</p>
                    <p>2. Цена Товара на Сайте интернет-магазина может быть изменена Продавцом в одностороннем порядке. При этом цена на Товар, на который оформлен Заказ, изменению не подлежит.</p>
                    <p>3. Оплата Товара Покупателем или Получателем производится в российских рублях в форме и способами, указанными Продавцом в разделе «Доставка и оплата» на Сайте интернет-магазина.</p>
                    <p>4. Продавец имеет право предоставлять Покупателю скидки на Товары. Виды скидок, порядок и условия их предоставления указываются Продавцом на Сайте интернет-магазина в публичном доступе и могут быть изменены Продавцом в одностороннем порядке.</p>
                </div>
            </div>
        </div>
    );
}