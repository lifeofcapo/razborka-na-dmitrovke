'use client'
import { useState } from "react";

const [orders, setOrders] = useState([]);

export const createOrder = (orderData) => {
  const newOrder = {
    ...orderData,
    id: `#${Math.floor(Math.random() * 100000)}`,
    date: new Date().toLocaleString('ru-RU'),
    status: 'В обработке',
  };
  setOrders(prev => [...prev, newOrder]);
  localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
};