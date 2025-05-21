"use client";

import { Button } from "@mui/material";
import { Product } from "@prisma/client";
import { deleteProduct } from "../action";

interface Props {
  product: Product;
}

export default function ConfirmDeleteProduct(props: Props) {
  return (
    <Button
      sx={{
        backgroundColor: "#FAF2E9",
        color: "#9C8173",
        padding: 1,
        width: "100%",
        border: "1px solid #9C8173",
        "&:hover": { backgroundColor: "#E8DACD" },
      }}
      onClick={() => deleteProduct(props.product.id)}
    >
      Delete
    </Button>
  );
}
