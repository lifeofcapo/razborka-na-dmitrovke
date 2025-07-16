'use client';
import { useState } from 'react';

export default function EditableField({ 
  label, 
  value, 
  type = 'text',
  multiline = false,
  onSave 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave?.(currentValue);
    setIsEditing(false);
  };

  return (
    <div className="info-row">
      <label>{label}:</label>
      
      {isEditing ? (
        <div className="edit-controls">
          {multiline ? (
            <textarea
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              rows="3"
            />
          ) : (
            <input
              type={type}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
          )}
          <button onClick={handleSave} className="save-btn">✓</button>
          <button 
            onClick={() => {
              setCurrentValue(value);
              setIsEditing(false);
            }} 
            className="cancel-btn"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <span>{value}</span>
          <button 
            onClick={() => setIsEditing(true)} 
            className="edit-btn"
          >
            Изменить
          </button>
        </>
      )}
    </div>
  );
}