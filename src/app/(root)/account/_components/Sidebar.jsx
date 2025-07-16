'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  FiUser, 
  FiPackage, 
  FiShoppingCart, 
  FiLogOut 
} from 'react-icons/fi';
import styles from  "./Sidebar.module.css";

const menuItems = [
  { path: '/account', title: 'Профиль', icon: <FiUser size={18} /> },
  { path: '/account/orders', title: 'Мои заказы', icon: <FiPackage size={18} /> },
  { path: '/cart', title: 'Корзина', icon: <FiShoppingCart size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className={styles.sideBar}>
      <div className={styles.sidebarHeader}>
        <h2>Личный кабинет</h2>
      </div>
      
      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`${styles.sidebarLink} ${pathname === item.path ? 'active' : ''}`}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.sidebarFooter}>
        <button onClick={logout} className={styles.logoutBtn}>
          <span className={styles.sidebarIcon}><FiLogOut size={18} /></span>
          Выйти
        </button>
      </div>
    </aside>
  );
}