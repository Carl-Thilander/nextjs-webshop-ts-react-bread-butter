"use client";

import { Button } from "@mui/material";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/lib/actions/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ConfirmDeleteProduct(props: Props) {

  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteProduct(props.product.id);
    if (result?.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result?.message || "Failed to delete product");
    }
  };

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
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
