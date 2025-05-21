"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Prisma, Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { createProduct, updateProduct } from "./action";

const ProductSchema = z.object({
  description: z.string().min(1),
  title: z.string().min(1),
  image: z.string().optional(),
  price: z.coerce.number().min(1),
});

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const isEdit = Boolean(product);
  const router = useRouter();
  const form = useForm<Prisma.ProductCreateInput>({
    defaultValues: product || {
      title: "",
      description: "",
      image: "",
      price: 0,
    },
    resolver: zodResolver(ProductSchema),
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Prisma.ProductCreateInput> = async (data) => {
    if (isEdit) {
      await updateProduct(product!.articleNumber, data);
    } else {
      await createProduct(data);
      form.reset();
    }
    router.push("/admin");
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        width: {
          xs: 280,
          sm: 400,
          md: 500,
          lg: 600,
        },
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

      <FormLabel
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Image address to file
      </FormLabel>

      <TextField
        title="Image address"
        margin="normal"
        id="imageURL"
        type="url"
        fullWidth
        variant="outlined"
        error={!!errors.image}
        helperText={
          errors.image ? (
            <span>{"Add a relative path for your image"}</span>
          ) : null
        }
        {...form.register("image")}
      />

      <FormLabel
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Product name
      </FormLabel>

      <TextField
        title="Product name"
        margin="normal"
        id="ProductName"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.title ? <span>{"Product name may not be empty"}</span> : null
        }
        {...register("title")}
      />

      <FormLabel
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Price
      </FormLabel>

      <TextField
        title="Price"
        margin="normal"
        id="Price"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.price ? (
            <span>{"You have to add a price larger than 0"}</span>
          ) : null
        }
        {...register("price")}
      />

      <FormLabel
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Description
      </FormLabel>

      <TextField
        title="Description"
        margin="normal"
        id="Description"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.description ? (
            <span>{"Description may not be empty"}</span>
          ) : null
        }
        {...register("description")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            mt: 3,
            width: 200,
            height: 50,
            bgcolor: "primary.main",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
          }}
          type="submit"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
