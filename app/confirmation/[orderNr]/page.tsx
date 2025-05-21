"use client";

import { getOrderByOrderNr } from "@/app/admin/action";
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
      .catch(() => setError("Kunde inte hämta beställningen."));
  }, [orderNr]);

  if (error) return <h1>{error}</h1>;
  if (!order) return <h1>Laddar beställning...</h1>;

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
          Tack för din beställning!
        </Typography>
        <Typography
          variant="h1"
          component="p"
          sx={{ textAlign: "center", fontSize: "1.25rem", padding: "1.5rem" }}
        >
          Ditt ordernummer: {orderNr}
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: "1.5rem", fontWeight: "500", pb: 2 }}
        >
          Kundinformation
        </Typography>
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "2rem",
            backgroundColor: "background.paper",
          }}
        >
          <Typography>Namn: {customer.name}</Typography>
          <Typography>E-post: {customer.email}</Typography>
          <Typography>
            Adress: {address.address}, {address.zipcode}
            {address.city}
          </Typography>
          <Typography>Telefon: {address.phone}</Typography>
        </Box>

        <Receipt items={items} totalSum={totalSum} />

        <Typography sx={{ marginTop: "2rem" }}>
          Separat kvitto kommer skickas till din e-mail. Tack för att du har
          handlat på Bread & Butter!
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
            Till startsidan
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
