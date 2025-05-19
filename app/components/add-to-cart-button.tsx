"use client";

import { Button } from "@mui/material";
import { Product } from "@prisma/client";
import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  label?: string;
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  label = "Lägg i kundvagn",
  product,
}) => {
  const { addToCart, showToast } = useCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
    showToast("Produkten har lagts till i kundvagnen!");
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="large"
      sx={{
        mt: 1,
        bgcolor: "primary.main",
        color: "text.primary",
        "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
      }}
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;
