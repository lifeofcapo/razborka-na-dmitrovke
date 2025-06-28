'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './Cart.module.css';
import Image from 'next/image';
import CheckoutModal from './_components/CheckoutModal';
import { redirect } from 'next/navigation';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    clearCart 
  } = useCart();
  
  const { user } = useAuth();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleQuantityChange = (productId, e) => {
    updateQuantity(productId, parseInt(e.target.value));
  };

  const handleCheckoutClick = () => {
    if (!user) {
      redirect('/login?redirect=/cart');
    }
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className={styles.cartPage}>
      <h1>Ваша корзина</h1>
      
      {totalItems === 0 ? (
        <div className={styles.emptyCart}>
          <p>Ваша корзина пуста</p>
          <Link href="/catalog" className={styles.continueShopping}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.itemImage}
                  width={100}
                  height={100}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.itemControls}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className={styles.quantityInput}
                  />
                  <span className={styles.itemPrice}>
                    {item.price * item.quantity} ₽
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryRow}>
              <span>Товаров:</span>
              <span>{totalItems} шт.</span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <div className={styles.cartActions}>
              <button onClick={clearCart} className={styles.clearCart}>
                Очистить корзину
              </button>
              <button 
                onClick={handleCheckoutClick}
                className={styles.checkoutBtn}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}
      
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
}