export const createOrder = (orderData) => {
  const orders = JSON.parse(localStorage.getItem('orders') || []);
  const newOrder = {
    ...orderData,
    id: `#${Math.floor(Math.random() * 100000)}`,
    date: new Date().toLocaleString('ru-RU'),
    status: 'В обработке',
  };
  const updatedOrders = [...orders, newOrder];
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  return newOrder;
};