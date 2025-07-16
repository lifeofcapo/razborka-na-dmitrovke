'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './Orders.module.css';

export default function OrdersPage() {
  const { user, orders } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    redirect('/login');
  }

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === 'В обработке');

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
    <div className={styles.ordersPage}>
      <h1>История заказов</h1>
      
      <div className={styles.tabs}>
        <button
          className={activeTab === 'all' ? styles.activeTab : ''}
          onClick={() => setActiveTab('all')}
        >
          Все заказы ({orders.length})
        </button>
        <button
          className={activeTab === 'processing' ? styles.activeTab : ''}
          onClick={() => setActiveTab('processing')}
        >
          В обработке ({orders.filter(o => o.status === 'В обработке').length})
        </button>
      </div>
      
      <div className={styles.balanceInfo}>
        <div>
          <span>На счету:</span>
          <strong>0 RUB</strong>
        </div>
        <div>
          <span>Без оплаты:</span>
          <strong>{orders.reduce((sum, order) => sum + (order.status === 'В обработке' ? order.total : 0), 0).toFixed(2)} RUB</strong>
        </div>
        <div>
          <span>Общая сумма:</span>
          <strong>{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} RUB</strong>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className={styles.emptyOrders}>
          <p>У вас пока нет заказов</p>
          <Link href="/catalog" className={styles.continueShopping}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>№ заказа</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Оплата</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.total.toLocaleString('ru-RU')} RUB</td>
                <td>{order.date}</td>
                <td>{getPaymentMethodLabel(order.paymentMethod)}</td>
                <td>
                  <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(/\s/g, '')]}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link href={`/account/orders/${order.id}`} className={styles.detailsLink}>
                    Подробнее
                  </Link>
                  <button className={styles.contactBtn}>
                    Связаться с Концертом
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}