"use client";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CallbackModal.module.css";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "light" | "dark";
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.thankYouModal} ${
          theme === "light"
            ? styles.thankYouModalLight
            : styles.thankYouModalDark
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>

        <div className={styles.thankYouContent}>
          <div className={styles.successIcon}>✓</div>
          <h2>Спасибо за заявку!</h2>
          <p>Мы свяжемся с вами в ближайшее время</p>
          <button className={styles.okBtn} onClick={onClose}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value) && value !== "") {
        setErrors((prev) => ({
          ...prev,
          name: "Имя может содержать только буквы, пробелы и дефисы",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    if (name === "phone") {
      if (!/^[0-9+()\s-]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone:
            "Телефон может содержать только цифры, +, (), пробелы и дефисы",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = { name: "", phone: "" };
    let hasErrors = false;

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
      hasErrors = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите ваш телефон";
      hasErrors = true;
    } else if (!/^[\d+][\d\s-()]{9,}$/.test(formData.phone)) {
      newErrors.phone = "Пожалуйста, введите корректный номер телефона";
      hasErrors = true;
    }

    if (!formData.agreed) {
      alert("Пожалуйста, согласитесь с обработкой данных");
      return;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    console.log("Форма отправлена:", formData);

    setFormData({ name: "", phone: "", agreed: false });
    setShowThankYou(true);
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    onClose();
  };

  if (!isOpen && !showThankYou) return null;

  return (
    <>
      {isOpen && !showThankYou && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <div
            className={`${styles.modalContent} ${
              theme === "light"
                ? styles.modalContentLight
                : styles.modalContentDark
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={onClose}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Заказать обратный звонок</h2>

            <form className={styles.callbackForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Введите ваше имя"
                  required
                />
                <span className={styles.requiredStar}>*</span>
                {errors.name && (
                  <div className={styles.errorText}>{errors.name}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="+7 (__) ___-__-__"
                  required
                />
                <span className={styles.requiredStar}>*</span>
                {errors.phone && (
                  <div className={styles.errorText}>{errors.phone}</div>
                )}
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={styles.checkboxText}>
                    Я подтверждаю свое ознакомление с{" "}
                    <a href="#" className={styles.policyLink}>
                      Политикой обработки персональных данных
                    </a>{" "}
                    и выражаю согласие на обработку моих персональных данных в
                    соответствии с{" "}
                    <a href="#" className={styles.policyLink}>
                      Условиями обработки персональных данных
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button className={styles.submitBtn} disabled={!formData.agreed}>
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}

      <ThankYouModal
        isOpen={showThankYou}
        onClose={handleCloseThankYou}
        theme={theme}
      />
    </>
  );
};

export default CallbackModal;
