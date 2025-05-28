import { prisma } from "@/prisma/db";
import AdminItem from "./admin-item-card";
import AddProductButton from "./buttons/add-product-button";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


export default async function AdminPage() {
const products = await prisma.product.findMany({
  include: {
    categories: true,
  },
});
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          href="/admin/orders"
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
        >
          Orders Management
        </Button>
      </Box>

      <AddProductButton />
      
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 3,
          mt: 3,
        }}
      >
        {products.map((product) => (
          <AdminItem key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
