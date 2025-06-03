"use client";
import { useCart } from "@/hooks/useCart";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const { totalSum } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (session) {
      router.push("/checkout");
    } else {
      router.push("/auth/register?from=cart");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: { xs: "1px solid", sm: "2px solid #9C8173" },
          paddingBottom: { xs: 3, sm: 1 },
          paddingTop: { xs: 3, sm: 1 },
          bgcolor: { xs: "background.paper", sm: "transparen" },
        }}
      >
        <Typography variant="h5" sx={{ paddingX: 2 }}>
          Sum:
        </Typography>
        <Typography variant="h5" sx={{ paddingX: 2 }}>
          {totalSum.toFixed(2)} €
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "center" },
          paddingTop: 2,
          gap: 2,
          paddingBottom: { xs: 3, sm: 0 },
          bgcolor: { xs: "background.paper", sm: "transparent" },
        }}
      >
        <Link href="/">
          <Button
            sx={{
              backgroundColor: "#FAF2E9",
              color: "#9C8173",
              padding: "6px 16px",
              border: "1px solid #9C8173",
              "&:hover": { backgroundColor: "#E8DACD", color: "text.primary" },
              mb: { xs: 1, sm: 8 },
            }}
          >
            Continue shopping
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "primary.main",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
            mb: { xs: 8, sm: 8 },
          }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
