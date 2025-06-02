"use client";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";

interface Props {
  product: Product;
}
export default function EditButton({ product }: Props) {
  return (
    <Link
      href={`/admin/product/${product.articleNumber}`}
      key={product.articleNumber}
    >
      <IconButton sx={{ color: "#9C8173" }}>
        <Edit />
      </IconButton>
    </Link>
  );
}

{
}
