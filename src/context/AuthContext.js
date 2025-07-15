"use client";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedOrders = localStorage.getItem("orders");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = async (userData) => {
    const formattedUser = {
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

  const updateUser = async (updatedData) => {
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const createOrder = (orderData) => {
    const newOrder = {
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
    };

    setOrders((prev) => {
      const updatedOrders = [newOrder, ...prev];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        orders,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
