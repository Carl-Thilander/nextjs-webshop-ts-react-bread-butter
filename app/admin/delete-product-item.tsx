"use client";

import { Product } from "@/data";
import { Delete } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import ConfirmDeleteProduct from "./buttons/confirm-delete-button";

type ProductCardProps = {
  product: Product;
};

export default function DeleteButton({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Knapp som visar alert */}
      <IconButton onClick={handleClick} sx={{ color: "#9C8173" }}>
        <Delete />
      </IconButton>

      {/* Alert som visas vid klick */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%", gap: 2 }}
        >
          <p>Är du säker på att du vill ta bort {product.title} ?</p>

          <ConfirmDeleteProduct product={product} />
        </Alert>
      </Snackbar>
    </>
  );
}
