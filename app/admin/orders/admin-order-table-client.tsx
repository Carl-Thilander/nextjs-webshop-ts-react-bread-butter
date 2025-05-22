"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Order, User, Address, OrderItem, OrderStatus } from "@prisma/client";
import { SelectChangeEvent } from "@mui/material";
import { updateOrderStatus } from "@/app/admin/action";

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
    <Box
      sx={{
        width: "100%",
        px: { xs: 1, sm: 2, md: 6 },
        py: 3,
      }}
    >
      <Typography variant="h1">Orders</Typography>
      <Box
        sx={{
          backgroundColor: "background.default",
          mt: 2,
          maxWidth: { xs: "310px", sm: "100%" },
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 1, color: "text.secondary", fontSize: 16 }}>
                  Order-ID
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Customer
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Address
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Items
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ p: 1, color: "text.secondary", fontSize: 16 }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersState.map((order) => (
                <TableRow key={order.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {order.orderNr}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(order.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell align="left">{order.user?.name}</TableCell>
                  <TableCell align="left">{order.address?.address}</TableCell>
                  <TableCell align="left">{order.user?.email}</TableCell>
                  <TableCell align="left">{order.items.length}</TableCell>
                  <TableCell align="center">
                    <FormControl fullWidth size="small">
                      <Select
                        sx={{
                          backgroundColor:
                            order.status === "PENDING"
                              ? "primary.main"
                              : order.status === "DELIVERED"
                              ? "success.main"
                              : order.status === "SHIPPED"
                              ? "secondary.main"
                              : order.status === "CANCELLED"
                              ? "error.main"
                              : "grey.100",
                          borderRadius: 4,
                          "& .MuiSelect-select": {
                            padding: "8px",
                          },
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                        labelId={`status-${order.id}`}
                        id={`status-${order.id}`}
                        value={order.status}
                        onChange={(event) => handleChange(event, order.id)}
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <MenuItem
                            key={status}
                            value={status}
                            sx={{ color: "text.primary" }}
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
    </Box>
  );
}
