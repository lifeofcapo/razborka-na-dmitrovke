"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { useCart } from "@/context/CartContext";
import ThemeToggle from "../elements/ThemeToggle";
import { FaCartArrowDown } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import CallbackModal from "@/components/modals/CallbackModal";
import SmallThemeLogo from "../elements/SmallThemeLogo";

import styles from "./Header.module.css";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <SmallThemeLogo />
          </Link>
        </div>

        <nav className={styles.headerNav}>
          <ul className={styles.navMenu}>
            <li>
              <Link href="/" className={styles.navLink}>
                Главная
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={styles.navLink}>
                Каталог товаров
              </Link>
            </li>
            <li>
              <Link href="/blog" className={styles.navLink}>
                Блог
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink}>
                О нас
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.headerContacts}>
          <p>📞 +7 900 111 22 33</p>
          <button className="read-more" onClick={openModal}>
            Заказать звонок
          </button>
        </div>

        <div className={styles.headerActions}>
          <ThemeToggle />
          <div className={styles.cartSummary}>
            <span>{totalPrice.toFixed(2)} ₽</span>
            <Link href={"/cart"} passHref>
              <button className={styles.cartBtn}>
                <FaCartArrowDown size={24} />
                {totalItems > 0 && (
                  <span className={styles.cartCount}>{totalItems}</span>
                )}
              </button>
            </Link>
          </div>
          <Link href={user ? "/account" : "/login"} passHref>
            <button className={styles.cartBtn}>
              <CiUser size={24} />
              {user && <span className="user-indicator"></span>}
            </button>
          </Link>
        </div>
      </div>
      <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}
