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
  image: z.string().url(),
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
      weight: undefined,
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
        {isEdit ? "Redigera en produkt" : "Lägg till en produkt"}

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
        {" "}
        Bildadress
      </FormLabel>

      <TextField
        title="Bildadress"
        margin="normal"
        id="imageURL"
        type="url"
        fullWidth
        variant="outlined"
        error={!!errors.image}
        helperText={errors.image ? <span>{"Ange en giltig Url"}</span> : null}
        {...form.register("image")}
      />

      <FormLabel
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        {" "}
        Produktnamn
      </FormLabel>

      <TextField
        title="Titel"
        margin="normal"
        id="Titel"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.title ? <span>{"Produktnamn får inte vara tom"}</span> : null
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
        {" "}
        Pris i kronor
      </FormLabel>

      <TextField
        title="Pris"
        margin="normal"
        id="Pris"
        type="number"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.price ? (
            <span>{"Du måste skriva in ett pris över 0:-"}</span>
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
        {" "}
        Beskriving
      </FormLabel>

      <TextField
        title="Beskrivning"
        margin="normal"
        id="Beskrivning"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors.description}
        helperText={
          errors.description ? (
            <span>{"Besrkivningen får inte vara tom"}</span>
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
          Spara
        </Button>
      </Box>
    </Box>
  );
}
