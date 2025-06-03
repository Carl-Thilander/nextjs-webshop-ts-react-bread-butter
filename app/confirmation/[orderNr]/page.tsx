"use client";

import { getOrderByOrderNr } from "@/lib/actions";
import Receipt from "@/app/confirmation/receipt";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useEffect, useState, use } from "react";

export default function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNr: string }>;
}) {
  const { orderNr } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrderByOrderNr(orderNr)
      .then(setOrder)
      .catch(() => setError("Could not find order."));
  }, [orderNr]);

  if (error) return <h6>{error}</h6>;
  if (!order) return <h6>Loading order...</h6>;

  const { customer, items, address } = order;
  const totalSum = items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.price,
    0
  );

  return (
    <Container
      sx={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flexStart",
      }}
    >
      <Box
        component="main"
        sx={{
          padding: 4,
          bgcolor: "background.paper",

          borderRadius: "0.5rem",
          margin: "2rem 0",
          width: "100%",
        }}
      >
        <Typography variant="h1" component="div" sx={{ textAlign: "center" }}>
          Thank you for your order!
        </Typography>
        <Typography
          variant="h1"
          component="p"
          sx={{ textAlign: "center", fontSize: "1.25rem", padding: "1.5rem" }}
        >
          Your order number: {orderNr}
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: "1.5rem", fontWeight: "500", pb: 2 }}
        >
          Customer information
        </Typography>
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "2rem",
            backgroundColor: "background.default",
          }}
        >
          <Typography>Name: {customer.name}</Typography>
          <Typography>E-mail: {customer.email}</Typography>
          <Typography>
            Address: {address.address}, {address.zipcode}
            {address.city}
          </Typography>
          <Typography>Phone: {address.phone}</Typography>
        </Box>

        <Receipt items={items} totalSum={totalSum} />

        <Typography sx={{ marginTop: "2rem" }}>
          A receipt will be sent to your e-mail. Thank you for shopping at Bean
          & Leaf!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            textDecoration: "none",
          }}
          component={Link}
          href="/"
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "text.primary",
              "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
            }}
          >
            Continue shopping
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
