'use client';
import { useCart } from '@/context/CartContext';

export default function CartButton({ product, className = '' }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        if (!product) return;
        addToCart(product);
        }}
      className="callbackBtn"
      aria-label="В корзину"
    >
      В корзину
    </button>
  );
}