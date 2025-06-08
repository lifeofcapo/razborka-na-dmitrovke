import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThankYouModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`thank-you-modal ${theme}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="thank-you-content">
          <div className="success-icon">✓</div>
          <h2>Спасибо за заявку!</h2>
          <p>Мы свяжемся с вами в ближайшее время</p>
          <button className="ok-btn" onClick={onClose}>
            ОК
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          padding: 20px;
        }

        .thank-you-modal {
          border-radius: 12px;
          padding: 40px 30px;
          max-width: 400px;
          width: 100%;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .thank-you-modal.light {
          background: white;
          color: #333;
        }

        .thank-you-modal.dark {
          background: #2d2d2d;
          color: #f0f0f0;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
          line-height: 1;
          opacity: 0.6;
        }

        .thank-you-modal.light .modal-close {
          color: #666;
        }

        .thank-you-modal.dark .modal-close {
          color: #ccc;
        }

        .modal-close:hover {
          opacity: 1;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #2ecc71;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: bold;
          margin: 0 auto 20px;
        }

        .thank-you-content h2 {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .thank-you-content p {
          font-size: 16px;
          margin-bottom: 25px;
          opacity: 0.8;
        }

        .ok-btn {
          background: linear-gradient(90deg,var(--link-color), var(--btn-gradient));
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ok-btn:hover {
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
      `}</style>
    </div>
  );
};

const CallbackModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreed: false
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.agreed) {
      alert('Пожалуйста, заполните все поля и согласитесь с обработкой данных');
      return;
    }
    
    // Здесь можно добавить логику отправки формы
    console.log('Форма отправлена:', formData);
    
    // Сброс формы и показ окна благодарности
    setFormData({ name: '', phone: '', agreed: false });
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
        <div className="modal-overlay" onClick={onClose}>
          <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
            
            <h2 className="modal-title">Заказать обратный звонок</h2>
            
            <div className="callback-form">
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Введите ваше имя"
                  required
                />
                <span className="required-star">*</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+7 (__) ___-__-__"
                  required
                />
                <span className="required-star">*</span>
              </div>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkbox-text">
                    Я подтверждаю свое ознакомление с{' '}
                    <a href="#" className="policy-link">
                      Политикой обработки персональных данных
                    </a>{' '}
                    и выражаю согласие на обработку моих персональных данных в соответствии с{' '}
                    <a href="#" className="policy-link">
                      Условиями обработки персональных данных
                    </a>.
                  </span>
                </label>
              </div>
              
              <button 
                onClick={handleSubmit}
                className="submit-btn"
                disabled={!formData.agreed}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={handleCloseThankYou} 
        theme={theme}
      />
      
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          border-radius: 12px;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content.light {
          background: white;
          color: #333;
        }

        .modal-content.dark {
          background: #2d2d2d;
          color: #f0f0f0;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          line-height: 1;
        }

        .modal-content.light .modal-close {
          color: #666;
        }

        .modal-content.dark .modal-close {
          color: #ccc;
        }

        .modal-close:hover {
          opacity: 0.7;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 25px;
          text-align: left;
        }

        .modal-content.light .modal-title {
          color: #333;
        }

        .modal-content.dark .modal-title {
          color: #f0f0f0;
        }

        .callback-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .modal-content.light .form-group label {
          color: #333;
        }

        .modal-content.dark .form-group label {
          color: #f0f0f0;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .modal-content.light .form-input {
          background: white;
          color: #333;
          border-color: #e1e5e9;
        }

        .modal-content.dark .form-input {
          background: #1a1a1a;
          color: #f0f0f0;
          border-color: #444;
        }

        .form-input:focus {
          outline: none;
          border-color: #3498db;
        }

        .form-input::placeholder {
          opacity: 0.6;
        }

        .modal-content.light .form-input::placeholder {
          color: #999;
        }

        .modal-content.dark .form-input::placeholder {
          color: #888;
        }

        .required-star {
          color: #e74c3c;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          margin-top: 16px;
        }

        .checkbox-group {
          margin: 10px 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          font-size: 14px;
          line-height: 1.5;
        }

        .checkbox-label input[type="checkbox"] {
          margin: 0;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .checkbox-text {
          opacity: 0.8;
        }

        .modal-content.light .checkbox-text {
          color: #666;
        }

        .modal-content.dark .checkbox-text {
          color: #ccc;
        }

        .policy-link {
          color: #3498db;
          text-decoration: none;
        }

        .policy-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          background: linear-gradient(90deg,var(--link-color), var(--btn-gradient));
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 600px) {
          .modal-content {
            padding: 20px;
            margin: 10px;
          }
          
          .modal-title {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default CallbackModal;