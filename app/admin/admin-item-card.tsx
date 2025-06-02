"use client";

import { Box, Chip, Container, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import EditButton from "../components/buttons/edit-admin-button";
import DeleteButton from "../components/buttons/delete-product-item";

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {product.title}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
              Article #: {product.articleNumber}
          </Typography>
        </Box>

        <Typography variant="body2" fontWeight={"bold"} color="text.primary"  >
          Price: € {product.price}
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
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
          gap: 1,
        }}
      >
        <EditButton product={product} />

        <Chip
          label={`Stock: ${product.stock}`}
          size="small"
          sx={{
            bgcolor: "#E0F2F1",
            color: "#004D40",
            fontWeight: 500,
            fontSize: "0.85rem",
          }}
        />

        <DeleteButton product={product} />
      </Box>

    </Box>
  );
}
