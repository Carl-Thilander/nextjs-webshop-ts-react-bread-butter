"use client";

import { Box } from "@mui/material";
import { useCart } from "../provider";
import { CartItem } from "@/data";
import CartItemComponent from "./cart-item";

export default function CartList() {
  const { cartItems } = useCart();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: { xs: "visible", sm: "auto" },
        maxHeight: { xs: "none", sm: "100%" },
        width: "100%",
        minWidth: "340px",
      }}
    >
      {cartItems.map((cartItem) => (
        <CartItemComponent
          data-cy="cart-item"
          key={cartItem.id}
          cartItem={cartItem}
        />
      ))}
    </Box>
  );
}
