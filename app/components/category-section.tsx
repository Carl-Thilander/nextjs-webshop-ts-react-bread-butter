"use client";
import { Chip, Container } from "@mui/material";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  selected: string [];
  onSelect: (category: string ) => void;
}

export default function CategorySection({ categories, selected, onSelect }: Props) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "left",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "2rem",
        padding: 0,
        height: "100px",
        bgcolor: "antiquewhite",
        width: "100%",
      }}
    >
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
            borderRadius: "8px",
            backgroundColor: selected.includes(category.name) ? "primary" : "white", // accent color example
          }}
        />
      ))}
    </Container>
  );
}
