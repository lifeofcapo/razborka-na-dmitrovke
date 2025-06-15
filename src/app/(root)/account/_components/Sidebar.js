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

const menuItems = [
  { path: '/account', title: 'Профиль', icon: <FiUser size={18} /> },
  { path: '/account/orders', title: 'Мои заказы', icon: <FiPackage size={18} /> },
  { path: '/cart', title: 'Корзина', icon: <FiShoppingCart size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Личный кабинет</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`sidebar-link ${pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <span className="sidebar-icon"><FiLogOut size={18} /></span>
          Выйти
        </button>
      </div>
    </aside>
  );
}