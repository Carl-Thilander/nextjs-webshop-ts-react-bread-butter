import { db } from "@/prisma/db";
import { Container, Link } from "@mui/material";
import CategoryCard from "./category-card";

export default async function CategorySection() {
  const categories = await db.category.findMany();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
        padding: 0,
        bgcolor: "antiquewhite",
        width: "100%",
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
  );
}
