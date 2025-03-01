// src/context/OrderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderContextType {
  orders: Map<number, Product>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Map<number, Product>>(new Map());

  // Function to add/update cart items
  const addToCart = (product: Product) => {
    const updatedOrders = new Map(orders);
    if (updatedOrders.has(product.id)) {
      const existingProduct = updatedOrders.get(product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    } else {
      updatedOrders.set(product.id, { ...product, quantity: 1 });
    }
    setOrders(updatedOrders);
  };

  // Function to remove item from cart
  const removeFromCart = (productId: number) => {
    const updatedOrders = new Map(orders);
    updatedOrders.delete(productId);
    setOrders(updatedOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, addToCart, removeFromCart }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
