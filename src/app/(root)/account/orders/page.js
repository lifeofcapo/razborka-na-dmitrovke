'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function OrdersPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('orders');

  if (!user) {
    redirect('/auth');
  }

  // Заглушка для заказов
  const orders = [
    { id: 1, date: '2024-06-10', amount: 12500, status: 'Доставлен' },
    { id: 2, date: '2024-06-05', amount: 8700, status: 'В обработке' },
    { id: 3, date: '2024-05-28', amount: 21400, status: 'Доставлен' },
  ];

  return (
    <div className="account">
      <div className="account">
        <h1>История заказов</h1>
        
        <div className="orders-list">
          {orders.length === 0 ? (
            <p>У вас пока нет заказов</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>№ заказа</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.amount.toLocaleString('ru-RU')} ₽</td>
                    <td>{order.status}</td>
                    <td>
                      <button className="read-more">Подробнее</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}