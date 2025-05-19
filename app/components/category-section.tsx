import { db } from "@/prisma/db";
import { Container } from "@mui/material";
import CategoryCard from "./category-card";

export default async function CategorySection() {
  const categories = await db.category.findMany();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
        borderBottom: "2px solid #9C8173",
        bgcolor: "background.paper",
        width: "100%",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </Container>
    </Container>
  );
}
