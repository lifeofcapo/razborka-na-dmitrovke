'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import styles from './CheckoutModal.module.css';

const paymentMethods = [
  { id: 'card', label: 'Оплата картой' },
  { id: 'cash', label: 'Оплата наличными' },
  { id: 'invoice', label: 'Безналичный расчёт для ИП и Юрлиц' },
  { id: 'qr', label: 'Оплата по QR коду' },
];

export default function CheckoutModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [comment, setComment] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { cart, totalPrice, clearCart } = useCart();
  const { user, createOrder } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const order = createOrder({
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: totalPrice,
        paymentMethod: selectedMethod,
        comment,
        userContacts: {
          name: user?.name || '',
          phone: phone || user?.phone || '',
          email: user?.email || ''
        }
      });
      
      clearCart();
      onClose();
      redirect('/account/orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>Оформление заказа</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Способ оплаты</label>
            <div className={styles.paymentMethods}>
              {paymentMethods.map(method => (
                <div key={method.id} className={styles.paymentMethod}>
                  <input
                    type="radio"
                    id={method.id}
                    name="payment"
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                  />
                  <label htmlFor={method.id}>{method.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон для связи</label>
            <input
              type="tel"
              id="phone"
              value={phone || user?.phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Комментарий к заказу</label>
            <textarea
              id="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className={styles.orderSummary}>
            <h3>Итого: {totalPrice} ₽</h3>
            <p>Товаров: {cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</p>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
          </button>
        </form>
      </div>
    </div>
  );
}