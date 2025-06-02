"use client";

import { Box } from "@mui/material";
import { useCart } from "@/hooks/useCart";
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
        maxWidth: { xs: "300px", sm: "100%" },
      }}
    >
      {cartItems.map((cartItem) => (
        <CartItemComponent key={cartItem.id} cartItem={cartItem} />
      ))}
    </Box>
  );
}
