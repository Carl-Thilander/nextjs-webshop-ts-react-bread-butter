"use client";
import { db } from "@/prisma/db";

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
} from "@mui/material";

export default async function AdminOrderTable() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      address: true,
      items: true,
    },
  });

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
                <TableCell sx={{ p: 1 }}>Order-ID</TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Date
                </TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Customer
                </TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Address
                </TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Email
                </TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Items
                </TableCell>
                <TableCell align="right" sx={{ p: 1 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {order.orderNr}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(order.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell align="right">{order.user?.name}</TableCell>
                  <TableCell align="right">{order.address?.address}</TableCell>
                  <TableCell align="right">{order.user?.email}</TableCell>
                  <TableCell align="right">{order.items.length}</TableCell>
                  <TableCell align="right">
                    <button></button>
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
