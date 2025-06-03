"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Prisma, Product, Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import z from "zod";
import {
  createProduct,
  updateProduct,
  getAllCategories,
} from "@/lib/actions/product";
import { productSchema } from "@/lib/validations/product";

const ProductFormSchema = productSchema
  .extend({
    categoryIds: z.array(z.string()).min(1, "Select at least one category"),
    price: z.coerce.number().min(1),
    stock: z.coerce.number().min(0),
  })
  .omit({ categories: true });

type ProductFormData = z.infer<typeof ProductFormSchema>;

interface Props {
  product?: Product & { categories: Category[] };
}

export default function ProductForm({ product }: Props) {
  const isEdit = Boolean(product);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<ProductFormData>({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      image: product?.image || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      categoryIds: product?.categories?.map((c) => c.id) || [],
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    const payload: Prisma.ProductCreateInput = {
      title: data.title,
      description: data.description,
      image: data.image || "",
      price: data.price,
      stock: data.stock,
      categories: {
        connect: data.categoryIds.map((id) => ({ id })),
      },
    };

    if (isEdit && product?.articleNumber) {
      await updateProduct(product.articleNumber, payload);
    } else {
      await createProduct(payload);
      reset();
    }

    router.push("/admin");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        width: { xs: 280, sm: 400, md: 500, lg: 600 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: 2,
        }}
      >
        <span></span>
        {isEdit ? "Edit a product" : "Add a product"}
        <Link href="/admin/">
          <IconButton>
            <ClearRoundedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Link>
      </Typography>

      {/* Image */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary" }}>
        Image address
      </FormLabel>
      <TextField
        margin="normal"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.image}
        helperText={errors.image ? "Add a relative path for your image" : ""}
        {...register("image")}
      />

      {/* Title */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary" }}>
        Product name
      </FormLabel>
      <TextField
        margin="normal"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.title}
        helperText={errors.title ? "Product name may not be empty" : ""}
        {...register("title")}
      />

      {/* Price */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary" }}>
        Price
      </FormLabel>
      <TextField
        margin="normal"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.price}
        helperText={errors.price ? "Price must be greater than 0" : ""}
        {...register("price")}
      />

      {/* Stock */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary" }}>
        Stock
      </FormLabel>
      <TextField
        margin="normal"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.stock}
        helperText={errors.stock ? "Stock cannot be negative" : ""}
        {...register("stock")}
      />

      {/* Description */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary" }}>
        Description
      </FormLabel>
      <TextField
        margin="normal"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={errors.description ? "Description may not be empty" : ""}
        {...register("description")}
      />

      {/* Categories */}
      <FormLabel sx={{ fontWeight: "bold", color: "text.primary", mt: 2 }}>
        Categories
      </FormLabel>
      <Controller
        name="categoryIds"
        control={control}
        render={({ field }) => (
          <Select
            multiple
            fullWidth
            sx={{ mt: 1, mb: 2, color: "text.primary" }}
            value={field.value}
            onChange={field.onChange}
            error={!!errors.categoryIds}
          >
            {categories.map((cat) => (
              <MenuItem
                sx={{ color: "text.primary" }}
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.categoryIds && (
        <Typography color="error" variant="caption">
          {errors.categoryIds.message}
        </Typography>
      )}

      {/* Submit button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          type="submit"
          sx={{
            width: 200,
            height: 50,
            bgcolor: "primary.main",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
