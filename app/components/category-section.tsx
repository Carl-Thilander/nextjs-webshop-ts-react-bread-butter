import { db } from "@/prisma/db";
import { Button, Container } from "@mui/material";

export default async function CategorySection() {
  const categories = await db.category.findMany();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: "2rem",
        padding: 0,
        height: "100px",
        bgcolor: "antiquewhite",
        width: "100%",
      }}
    >
      {categories.map((category) => (
        <Button
          key={category.id}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            justifyContent: "center",
          }}
        ></Button>
      ))}
    </Container>
  );
}
