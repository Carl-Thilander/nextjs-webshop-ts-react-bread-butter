"use client";

import { Box } from "@mui/material";
import { useCart } from "@/hooks/useCart";
import CartItemComponent from "./cart-item";

export default function CartList() {
  const { cartItems } = useCart();

  return (
    <Box
    >
      {cartItems.map((cartItem) => (
        <CartItemComponent key={cartItem.id} cartItem={cartItem} />
      ))}
    </Box>
  );
}
