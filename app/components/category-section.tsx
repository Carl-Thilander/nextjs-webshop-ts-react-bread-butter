"use client";
import { Chip, Container } from "@mui/material";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  selected: string | null;
  onSelect: (category: string | null) => void;
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
          color={selected === category.name ? "primary" : "default"}
          onClick={() => {
            onSelect(selected === category.name ? null : category.name);
          }}
          sx={{
            fontWeight: selected === category.name ? "bold" : "normal",
            fontSize: "1rem",
            backgroundColor: selected === category.name ? "#ffb347" : "white", // accent color example
          }}
        />
      ))}
    </Container>
  );
}
