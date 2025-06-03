"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Order, Address, OrderItem, OrderStatus } from "@prisma/client";
import { useState } from "react";
import GoBackButton from "@/app/components/buttons/go-back-button";

type CustomerOrder = Order & {
  address: Address | null;
  items: OrderItem[];
};

export default function CustomerOrderList({
  orders,
}: {
  orders: CustomerOrder[];
}) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "primary";
      case "SHIPPED":
        return "secondary";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative", mb: 6 }}>
        <GoBackButton href="/" />
      </Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        My Orders
      </Typography>{" "}
      {orders.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          You don&apos;t have any orders yet.
        </Typography>
      ) : (
        orders.map((order) => (
          <Accordion
            key={order.id}
            expanded={expanded === order.id}
            onChange={handleChange(order.id)}
            sx={{
              bgcolor: "background.default",
              mb: 2,
              borderRadius: "8px",
              "&::before": { display: "none" },
              boxShadow: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                padding: "12px 16px",
                "& .MuiAccordionSummary-content": {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Order #{order.orderNr}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  {calculateTotal(order.items)} €
                </Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                  sx={{
                    borderRadius: "4px",
                    fontWeight: "medium",
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0 16px 16px" }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Shipping Address
                </Typography>
                <Typography variant="body2">
                  {order.address?.address}, {order.address?.zipcode}{" "}
                  {order.address?.city}
                </Typography>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Order Items
              </Typography>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ bgcolor: "background.default" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2">{item.title}</Typography>
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.price} €</TableCell>
                        <TableCell align="right">
                          {(item.price * item.quantity).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Typography variant="subtitle2">Total</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2">
                          {calculateTotal(order.items)} €
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}
