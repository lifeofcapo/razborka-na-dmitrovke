"use client";
import { useAuth } from "@/context/AuthContext";
import EditableField from "./_components/EditableField";
import "./account.css";

export default function AccountPage() {
  const { user, updateUser } = useAuth();

  const handleSave = async (field, value) => {
    try {
      const formattedValue =
        field === "phone" ? value.replace(/^\+7/, "") : value; // Format phone number before saving (remove +7 if present)

      await updateUser({ [field]: formattedValue });
      return true;
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      return false;
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <h1>Личные данные</h1>
      <div className="user-info-simple">
        <div className="info-section">
          <h3>Основная информация</h3>
          <EditableField
            label="ФИО"
            value={user.name}
            onSave={(value) => handleSave("name", value)}
          />
          <EditableField
            label="Email"
            value={user.email}
            type="email"
            readOnly // Имейл не должен меняться после регистрации
          />
        </div>
        <div className="info-section">
          <h3>Контактные данные</h3>
          <EditableField
            label="Телефон"
            value={user.phone}
            type="tel"
            validate={(value) => /^\+7\d{10}$/.test(value)}
            validationMessage="Формат: +7XXXXXXXXXX (10 цифр после +7)"
            onSave={(value) => handleSave("phone", value)}
          />
          <EditableField
            label="Адрес"
            value={user.address || ""}
            multiline
            onSave={(value) => handleSave("address", value)}
          />
        </div>
        <div className="info-section">
          <h3>Безопасность</h3>
          <div className="info-row">
            <label>Пароль:</label>
            <span>••••••••</span>
            <button
              className="edit-btn"
              onClick={() =>
                alert("Password change functionality to be implemented")
              }
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
