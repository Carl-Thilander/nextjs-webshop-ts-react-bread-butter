"use client";
import { Box, Chip, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  currentCategoryName?: string;
}

export default function CategorySection({
  categories,
  currentCategoryName,
}: Props) {
  const router = useRouter();

  return (
    <Container
      id="products"
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
        {currentCategoryName || "Our Products"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
          width: "60%",
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            clickable
            onClick={() =>
              router.push(`/category/${category.name}`, { scroll: false })
            }
            sx={{
              backgroundColor:
                currentCategoryName?.toLowerCase() ===
                category.name.toLowerCase()
                  ? "primary.main"
                  : "transparent",
              color:
                currentCategoryName?.toLowerCase() ===
                category.name.toLowerCase()
                  ? "text.primary"
                  : "text.primary",
              fontWeight: "normal",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              width: { xs: "80%", sm: "auto" },
              height: "48px",
              borderRadius: "8px",
              border: "1px solid",
            }}
          />
        ))}
      </Box>
    </Container>
  );
}
