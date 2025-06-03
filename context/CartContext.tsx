"use client";

import { Alert, Snackbar, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface ContextValues {
  cartItems: CartItem[];
  cartCount: number;
  totalSum: number;
  updateQuantity: (id: string, amount: number) => void;
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  showToast: (message: string) => void;
}

const CartContext = createContext({} as ContextValues);

export function CartProvider(props: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (item: Product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        const newItem = {
          ...item,
          quantity: 1,
        };
        return [...prevItems, newItem];
      }
    });

    showToast("The product was added to cart!");
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity !== 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalSum,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        showToast,
      }}
    >
      {props.children}
      {toastMessage && (
        <Snackbar
          open
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            width: "auto",
            maxWidth: "350px",
            borderRadius: "0.5rem",
            boxShadow: "none",
          }}
        >
          <Alert
            onClose={() => setToastMessage(null)}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: "0.5rem",
              color: "white",
              backgroundColor: "success.main",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "6px 16px",
            }}
          >
            <Typography variant="body1">{toastMessage}</Typography>
          </Alert>
        </Snackbar>
      )}
    </CartContext.Provider>
  );
}

export default CartContext;
