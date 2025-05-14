import AddToCartButton from "@/app/components/add-to-cart-button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Product } from "@prisma/client";

type ProductCardProps = {
  product: Product;
};

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 320,
        minHeight: 490,
        backgroundColor: "background.paper",
        boxShadow: "none",
        display: "grid",
        position: "relative",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "46%",
          left: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "background.default",
          transform: "translate(-50%, -110%)",
          borderRadius: "0.25rem",
          zIndex: 0,
        }}
      />

      <CardMedia
        component="img"
        sx={{
          height: 250,
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
          border: "2px solid",
          borderColor: "text.secondary",
          borderRadius: "0.25rem",
          // backgroundColor: "#e5ded5",
          mx: "auto",
          mt: "1rem",
          mb: "1rem",
          zIndex: 1,
          maxWidth: "90%",
          minWidth: "312px",
          minHeight: "233px",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", mt: "0.5rem" }}
        >
          {product.price} kr
        </Typography>
        <CardActions>
          <Box sx={{ mx: "auto" }}>
            <AddToCartButton label="Köp" product={product} />
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}
