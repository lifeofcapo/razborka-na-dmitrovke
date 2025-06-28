'use client';
import { useAuth } from '@/context/AuthContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './OrderDetails.module.css';

export default function OrderDetailsPage({ params }) {
  const { orders } = useAuth();
  const order = orders.find(o => o.id === `#${params.id}`);

  if (!order) return notFound();

  const getPaymentMethodLabel = (method) => {
    switch(method) {
      case 'card': return 'Оплата картой';
      case 'cash': return 'Оплата наличными';
      case 'invoice': return 'Безналичный расчёт';
      case 'qr': return 'QR-код';
      default: return method;
    }
  };

  return (
    <div className={styles.orderDetails}>
      <div className={styles.header}>
        <h1>Заказ {order.id}</h1>
        <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(/\s/g, '')]}`}>
          {order.status}
        </span>
      </div>

      <div className={styles.orderInfo}>
        <div className={styles.infoBlock}>
          <h3>Информация о заказе</h3>
          <p><strong>Дата:</strong> {order.date}</p>
          <p><strong>Способ оплаты:</strong> {getPaymentMethodLabel(order.paymentMethod)}</p>
          <p><strong>Итого:</strong> {order.total.toLocaleString('ru-RU')} RUB</p>
          {order.comment && (
            <p><strong>Комментарий:</strong> {order.comment}</p>
          )}
        </div>

        <div className={styles.infoBlock}>
          <h3>Контактные данные</h3>
          <p><strong>Имя:</strong> {order.userContacts.name}</p>
          <p><strong>Телефон:</strong> {order.userContacts.phone}</p>
          {order.userContacts.email && (
            <p><strong>Email:</strong> {order.userContacts.email}</p>
          )}
        </div>
      </div>

      <div className={styles.itemsList}>
        <h3>Товары в заказе</h3>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Товар</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id}>
                <td>
                  <div className={styles.productInfo}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={60}
                      height={60}
                      className={styles.productImage}
                    />
                    <div>
                      <Link href={`/catalog/${item.id}`} className={styles.productLink}>
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td>{item.price} RUB</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toLocaleString('ru-RU')} RUB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <Link href="/account/orders" className={styles.backLink}>
          ← Назад к заказам
        </Link>
        <button className={styles.contactBtn}>
          Связаться с Концертом
        </button>
      </div>
    </div>
  );
}