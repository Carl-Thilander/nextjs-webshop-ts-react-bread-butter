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
          sx={{ ml: { xs: 1, sm: 3, md: 4.5 } }}
          paddingTop={2}
        >
          Checkout
        </Typography>

        <Box
          sx={{ py: 2, px: { xs: 1, sm: 2, md: 4.5 }, mx: "auto" }}
        >
          <CartList />
        </Box>
        <OrderOverview />
        <CustomerForm />
      </Box>
    </Container>
  );
}
