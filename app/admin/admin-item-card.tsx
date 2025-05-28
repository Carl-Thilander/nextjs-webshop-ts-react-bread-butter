"use client";

import { Box, Chip, Container, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import EditButton from "./buttons/edit-admin-button";
import DeleteButton from "./delete-product-item";

type ProductCardProps = {
  product: Product & { categories: { name: string }[] };
};

export default function AdminItem({ product }: ProductCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "contain",
          display: "block",
          borderBottom: "1px solid #ddd",
          padding: 2,
          backgroundColor: "#f8f8f8",
        }}
      />
      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Art Nr: {product.articleNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price} €
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock}
        </Typography>

        <Typography sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }} variant="subtitle2" mt={1}>
          {product.description}
        </Typography>

        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {product.categories.map((cat) => (
            <Chip
              key={cat.name}
              label={cat.name}
              size="small"
              sx={{ backgroundColor: "#F2E0D5", color: "#9C8173" }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        <EditButton product={product} />
        <DeleteButton product={product} />
      </Box>
    </Box>
  );
}
