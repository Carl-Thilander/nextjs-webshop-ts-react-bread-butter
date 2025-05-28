"use client";

import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

export default function AddProductButton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        padding: 2,
        width: "fit-content",
        border: "1px solid #DDD",
        borderRadius: 2,
        bgcolor: "#F9F9F9",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#EFEFEF",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Link href="/admin/product/new" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <IconButton
          sx={{
            backgroundColor: "#9C8173",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#7A6658",
            },
            width: 40,
            height: 40,
          }}
        >
          <AddIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: "#3E291E", fontWeight: 500 }}>
          Add new product
        </Typography>
      </Link>
    </Box>
  );
}
