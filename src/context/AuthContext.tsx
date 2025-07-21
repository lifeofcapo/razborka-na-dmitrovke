"use client";
import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, Order } from "../shared/types/interface";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<User>;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedOrders = localStorage.getItem("orders");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = async (userData: User) => {
    const formattedUser: User = {
      ...userData,
      phone: userData.phone.startsWith("+7")
        ? userData.phone
        : `+7${userData.phone}`,
    };
    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = async (updatedData: Partial<User>) => {
    const response = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Update failed");

    const updatedUser: User = await response.json();
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `#${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "В обработке",
    } as Order;

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, orders, createOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
