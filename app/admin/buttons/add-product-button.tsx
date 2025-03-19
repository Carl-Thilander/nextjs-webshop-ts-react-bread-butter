"use client";

import AddIcon from "@mui/icons-material/Add";
import { Container, Fab, Typography } from "@mui/material";
import Link from "next/link";

export default function AddProductButton() {
  return (
    <Link href="admin/product/new">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "70%", md: "50%" },
          border: "1px solid",
          borderColor: "text.secondary",
          padding: 2,
          borderRadius: "4px",
          gap: 1,
          marginTop: 2,
        }}
      >
        <Fab
          sx={{
            backgroundColor: "#9C8173",
            color: "#FAF2E9",
          }}
        >
          <AddIcon data-cy="admin-add-product" />
        </Fab>
        <Typography>Lägg till produkt</Typography>
      </Container>
    </Link>
  );
}
