import { Box, Container, Typography } from "@mui/material";
import CustomerForm from "../components/checkout/customer-form";
import OrderOverview from "../components/checkout/order-overview";
import CartList from "../components/cart/cart-list";
import GoBackButton from "../components/buttons/go-back-button";

export default function CheckoutPage() {
  return (
    <Container>
      <GoBackButton />
      <Box
        sx={{
          height: "100%",
          backgroundColor: "background.paper",
          mt: 3,
          mb: 3,
          padding: { xs: 0, sm: 2, md: 4 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{ mt: { xs: 2 }, ml: { xs: 1, sm: 3, md: 6 } }}
        >
          Checkout
        </Typography>

        <Box
          sx={{ width: "95%", py: 3, px: { xs: 0, sm: 2, md: 6 }, mx: "auto" }}
        >
          <CartList />
        </Box>
        <OrderOverview />
        <CustomerForm />
      </Box>
    </Container>
  );
}
