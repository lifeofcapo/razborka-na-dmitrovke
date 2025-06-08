'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './Cart.module.css';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    clearCart 
  } = useCart();

  const handleQuantityChange = (productId, e) => {
    updateQuantity(productId, parseInt(e.target.value));
  };

  return (
    <div className= {styles.cartPage}>
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
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.itemImage}
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
              <Link href="/checkout" className={styles.checkoutBtn}>
                Оформить заказ
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}