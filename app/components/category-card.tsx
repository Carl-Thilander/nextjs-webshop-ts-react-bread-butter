import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Category } from "@prisma/client";

type CategoryCardProps = {
  category: Category;
};

export default async function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Box>
      <Card
        sx={{
          border: "2px solid #9C8173",
          borderRadius: "0.5rem",
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
            mx: "auto",
            mt: "1rem",
            borderRadius: "0.5rem",
            zIndex: 1,
          }}
          image={category.imageURL}
        />
      </Card>
      <Typography
        variant="h6"
        sx={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {category.name}
      </Typography>
    </Box>
  );
}
