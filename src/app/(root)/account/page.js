'use client';
import { useAuth } from '@/context/AuthContext';
import EditableField from './_components/EditableField';
import './account.css';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <>
      <h1>Личные данные</h1>
      <div className="user-info-simple">
        <div className="info-section">
          <h3>Основная информация</h3>
          <EditableField 
            label="ФИО" 
            value={user.name} 
            onSave={(value) => console.log('Save:', value)}
          />
          <EditableField 
            label="Email" 
            value={user.email} 
            type="email"
          />
        </div>
        <div className="info-section">
          <h3>Контактные данные</h3>
          <EditableField 
            label="Телефон" 
            value={user.phone} 
            type="tel"
            onSave={(value) => console.log('Save:', value)}
          />
          <EditableField 
            label="Адрес" 
            value={user.address} 
            multiline
            onSave={(value) => console.log('Save:', value)}
          />
        </div>
        <div className="info-section">
          <h3>Безопасность</h3>
          <div className="info-row">
            <label>Пароль:</label>
            <span>••••••••</span>
            <button className="edit-btn">Изменить</button>
          </div>
        </div>
      </div>
    </>
  );
}