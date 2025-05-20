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
          border: "1px solid black",
          borderRadius: "0.5rem",
          mt: "2rem",
          width: "100%",
          height: "auto",
          ":hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardMedia
          component={"img"}
          sx={{
            height: { xs: 60, sm: 100, md: 150 },
            width: { xs: 60, sm: 100, md: 150 },
            mx: "auto",
            zIndex: 1,
            objectFit: "cover",
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
          fontSize: { xs: "1rem", sm: "1.5rem" },
          marginTop: "0.5rem",
        }}
      >
        {category.name}
      </Typography>
    </Box>
  );
}
