"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Order, User, Address, OrderItem, OrderStatus } from "@prisma/client";
import { SelectChangeEvent } from "@mui/material";
import { updateOrderStatus } from "@/app/admin/action";
import ArrowBackwardIosIcon from "@mui/icons-material/ArrowBackIos";

type ExtendedOrder = Order & {
  user: User | null;
  address: Address | null;
  items: OrderItem[];
};

export default function AdminOrderTable({
  orders,
}: {
  orders: ExtendedOrder[];
}) {
  const [ordersState, setOrdersState] = useState(orders);

  const handleChange = async (
    event: SelectChangeEvent<OrderStatus>,
    orderId: string
  ) => {
    const newStatus = event.target.value as OrderStatus;
    setOrdersState((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    const result = await updateOrderStatus(orderId, newStatus);
    if (result?.success) {
      console.log("Order updated successfully!");
    } else {
      console.error(result?.error);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          href="/admin"
          startIcon={<ArrowBackwardIosIcon sx={{ fontSize: 16 }} />}
        >
          Inventory Management
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Order Management
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Order ID", "Date", "Customer", "Address", "Email", "Items", "Status"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      bgcolor: "#FAF2E9",
                      color: "#3E291E",
                      fontSize: 14,
                      py: 1.5,
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersState.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: "#FAFAFA",
                  },
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>{order.orderNr}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>{order.user?.name || "-"}</TableCell>
                <TableCell>{order.address?.address || "-"}</TableCell>
                <TableCell>{order.user?.email || "-"}</TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell align="center">
                  <FormControl fullWidth size="small">
                    <Select
                      value={order.status}
                      onChange={(e) => handleChange(e, order.id)}
                      sx={{
                        fontWeight: 600,
                        borderRadius: "999px",
                        fontSize: "0.8rem",
                        minWidth: 110,
                        textAlign: "center",
                        px: 2,
                        py: 0.5,
                        backgroundColor:
                          order.status === "PENDING"
                            ? "#FFF4E5"
                            : order.status === "SHIPPED"
                              ? "#E3F2FD"
                              : order.status === "DELIVERED"
                                ? "#E8F5E9"
                                : order.status === "CANCELLED"
                                  ? "#FFEBEE"
                                  : "#E0E0E0",
                        color:
                          order.status === "PENDING"
                            ? "#B26A00"
                            : order.status === "SHIPPED"
                              ? "#1565C0"
                              : order.status === "DELIVERED"
                                ? "#2E7D32"
                                : order.status === "CANCELLED"
                                  ? "#C62828"
                                  : "#555",
                        "& .MuiSelect-icon": {
                          color:
                            order.status === "PENDING"
                              ? "#B26A00"
                              : order.status === "SHIPPED"
                                ? "#1565C0"
                                : order.status === "DELIVERED"
                                  ? "#2E7D32"
                                  : order.status === "CANCELLED"
                                    ? "#C62828"
                                    : "#555",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            mt: 1,
                            boxShadow: 2,
                            bgcolor: "#ffffff",
                            color: "#3E291E",
                          },
                        },
                      }}
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <MenuItem
                          key={status}
                          value={status}
                          sx={{ fontWeight: 500, fontSize: "0.85rem", color: "#3E291E" }}
                        >
                          {status}
                        </MenuItem>
                      ))}
                    </Select>

                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
