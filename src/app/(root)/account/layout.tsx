'use client'
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import Sidebar from './_components/Sidebar';
import './account.css';

export default function AccountLayout({ children }) {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="account-layout">
      <div className="account-container">
        <Sidebar />
        <main className="account-content">
          {children}
        </main>
      </div>
    </div>
  );
}