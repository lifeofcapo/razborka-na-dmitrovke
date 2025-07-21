interface OrderData {
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  comment?: string;
  totalAmount: number;
  paymentMethod: string;
  orderItems: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const createOrder = (orderData: OrderData) => {
  const raw = localStorage.getItem("orders");
  const orders = raw ? JSON.parse(raw) : [];
  const newOrder = {
    ...orderData,
    id: `#${Math.floor(Math.random() * 100000)}`,
    date: new Date().toLocaleString("ru-RU"),
    status: "В обработке",
  };
  const updated = [...orders, newOrder];
  localStorage.setItem("orders", JSON.stringify(updated));
  return newOrder;
};
