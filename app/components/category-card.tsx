import { Card, CardMedia } from "@mui/material";
import { Category } from "@prisma/client";

type CategoryCardProps = {
  category: Category;
};

export default async function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #9C8173",
        borderRadius: "0.5rem",
        padding: 2,
        bgcolor: "background.paper",
        width: "100%",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia
        component={"img"}
        sx={{
          height: 150,
          width: 150,
          borderRadius: "0.5rem",
          zIndex: 1,
        }}
        image={category.image}
      />
    </Card>
  );
}
