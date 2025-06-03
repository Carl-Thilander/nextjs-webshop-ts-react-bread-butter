"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton } from "@mui/material";
import { Product } from "@prisma/client";

interface AddToCartButtonProps {
  label?: string;
  product: Product;
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  label = "Add to cart",
  product,
  disabled,
}) => {
  const { addToCart, showToast } = useCart();
  const [showCheck, setShowCheck] = useState(false);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowCheck(true);
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
    setTimeout(() => {
      setShowCheck(false);
    }, 500);
    showToast("The product was added to cart!");
  };

  return (
    <IconButton
      onClick={handleAddToCart}
      disabled={disabled}
      sx={{
        p: 0,
        color: "text.primary",
        "&:hover": { transform: "scale(1.25)" },
        "&:active": { transform: "scale(1.25)" },
      }}
    >
      {showCheck ? (
        <CheckIcon />
      ) : (
        <LocalMallIcon sx={{ fontSize: "1.8rem" }} />
      )}
    </IconButton>
  );
};

export default AddToCartButton;
