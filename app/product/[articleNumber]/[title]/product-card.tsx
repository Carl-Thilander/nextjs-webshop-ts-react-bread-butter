import AddToCartButton from "@/app/components/add-to-cart-button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Product } from "@prisma/client";

type ProductCardProps = {
  product: Product & {
    categories: { id: string; name: string }[];
  };
};

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        width: 250,
        height: 390,
        backgroundColor: "#f5f0ea",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        display: "grid",
        position: "relative",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          width: 150,
          mx: "auto",
          mt: "1rem",
          borderRadius: "0.25rem",
          zIndex: 1,
        }}
        image={product.image}
        alt={product.title}
      />

      <CardContent
        sx={{
          borderRadius: "0.25rem",
          mx: "auto",
          mt: "1rem",
          zIndex: 1,
          maxWidth: "90%",
        }}
      >
        <Typography gutterBottom component="div" sx={{ fontSize: 14 }}>
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", mt: "0.5rem" }}
        >
          {product.price} kr
        </Typography>
        <CardActions sx={{ pt: 0, mt: 0 }}>
          <Box sx={{ mx: "auto" }}>
            <AddToCartButton label="Köp" product={product} />
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}
