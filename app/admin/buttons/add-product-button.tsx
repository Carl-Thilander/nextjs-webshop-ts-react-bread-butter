"use client";

import AddIcon from "@mui/icons-material/Add";
import { Container, Fab, Typography } from "@mui/material";
import Link from "next/link";

export default function AddProductButton() {
  return (
    <Link
      href="admin/product/new"
      style={{ textDecoration: "none", color: "#3E291E" }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "70%", md: "50%" },
          border: "1px solid",
          borderColor: "#9C8173",
          padding: 2,
          borderRadius: "4px",
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Fab
          sx={{
            backgroundColor: "#9C8173",
            color: "#FAF2E9",
          }}
        >
          <AddIcon
            sx={{
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.5)", color: "#9C8173" },
            }}
          />
        </Fab>
        <Typography>Add new product</Typography>
      </Container>
    </Link>
  );
}
