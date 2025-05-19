import { db } from "@/prisma/db";
import { Container, Link } from "@mui/material";
import CategoryCard from "./category-card";

export default async function CategorySection() {
  const categories = await db.category.findMany();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
          <Link
            key={category.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CategoryCard category={category} />
          </Link>
        ))}
      </Container>
    </Container>
  );
}
