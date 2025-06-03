"use client";
import { Box, Chip, Container, Typography } from "@mui/material";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  selected: string[];
  onSelect: (category: string) => void;
}

export default function CategorySection({ categories, selected, onSelect }: Props) {
  
  return (
    <Container id="products"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingTop: "6rem",
        paddingLeft: { xs: "1rem", sm: "3rem" },
        alignItems: { xs: "center", sm: "flex-start" },
        width: "100%",
        marginTop: "4rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Our products
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
          width: "60%",
          alignItems: { xs: "center", sm: "flex-start" },
        }}>



        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            clickable
            color={selected.includes(category.name) ? "primary" : "default"}
            onClick={() => {
              onSelect(category.name);
            }}
            sx={{
              fontWeight: selected.includes(category.name) ? "bold" : "normal",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              width: { xs: "80%", sm: "auto" },
              height: "48px",
              borderRadius: "8px",
              border: "1px solid",
              backgroundColor: selected.includes(category.name) ? "primary" : "white",
            }}
          />
        ))}
      </Box>
    </Container>
  );
}