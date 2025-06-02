"use client";

import { useCart } from "@/hooks/useCart";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { submitOrder } from "../admin/order-actions";
import { userSchema } from "../admin/validation";
import {
  OutOfStockItems,
  default as OutOfStockModal,
} from "./out-of-stock-modal";

const customerSchema = userSchema;

export default function CustomerForm() {
  const [outOfStockItems, setOutOfStockItems] = useState<OutOfStockItems[]>([]);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);
  const router = useRouter();
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const { totalSum, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const result = customerSchema.safeParse({ ...formData, [name]: value });
    if (result.success) {
      setErrors({});
    } else {
      const newErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });

      setErrors(newErrors);
    }
  };
  const generateOrderNumber = () => {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };
  const orderNr = generateOrderNumber();

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const outOfStock = cartItems.filter((item) => item.stock < item.quantity);

    if (outOfStock.length > 0) {
      const outOfStockItemsForModal = outOfStock.map((item) => ({
        productName: item.title,
        available: item.stock,
        requested: item.quantity,
      }));

      setOutOfStockItems(outOfStockItemsForModal);
      setShowOutOfStockModal(true);
      return;
    }
    const result = customerSchema.safeParse(formData);

    if (!result.success) {
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.keys(newErrors).reduce((acc, key) => {
          const typedKey = key as keyof typeof newErrors;
          acc[typedKey] = newErrors[typedKey]?.[0] ?? "";
          return acc;
        }, {} as Record<keyof typeof formData, string>)
      );
      console.log("Form contains errors, aborting!");
      return;
    }

    try {
      const addressData = {
        address: formData.address,
        zipcode: formData.zipcode,
        city: formData.city,
        phone: formData.phone,
      };

      const order = await submitOrder(cartItems, addressData);

      setOpen(true);
      setTimeout(() => {
        router.push(`/confirmation/${order.orderNr}`);
      }, 1000);

      clearCart();
      setFormData({
        name: "",
        address: "",
        zipcode: "",
        city: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Container sx={{ mb: 3 }}>
      <Typography variant="h1" sx={{ textAlign: "left", ml: { sx: 1, md: 2 } }}>
        Delivery & Payment
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "background.default",
            mt: 2,
            mx: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Name
            </FormLabel>
            <TextField
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "0.5rem",
              }}
              fullWidth
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              autoComplete="name"
              helperText={errors.name || null}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Delivery Address
            </FormLabel>
            <TextField
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "0.5rem",
              }}
              fullWidth
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              error={Boolean(errors.address)}
              helperText={errors.address || null}
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Zip Code
              </FormLabel>
              <TextField
                size="small"
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "0.5rem",
                  flex: 1,
                }}
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                autoComplete="postal-code"
                error={Boolean(errors.zipcode)}
                helperText={errors.zipcode || null}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                City
              </FormLabel>
              <TextField
                size="small"
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "0.5rem",
                  flex: 1,
                }}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
                error={Boolean(errors.city)}
                helperText={errors.city || null}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
            }}
          ></Box>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Email
            </FormLabel>
            <TextField
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "0.5rem",
              }}
              fullWidth
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email || null}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Phone Number
            </FormLabel>
            <TextField
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "0.5rem",
              }}
              fullWidth
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              error={Boolean(errors.phone)}
              helperText={errors.phone || null}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "primary.main",
              color: "text.primary",
              "&:hover": { bgcolor: "primary.dark", color: "background.paper" },
              mt: 3,
              width: 200,
              mx: "auto",
              py: 2,
            }}
          >
            Continue to Payment
          </Button>
          <Snackbar
            open={open}
            message="Order completed!"
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
          />
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "background.default",
            mt: 2,
            mb: { xs: 2, sm: 0 },
            mx: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1">{totalSum.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Delivery:</Typography>
            <Typography variant="body1">{formData.address}</Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Total:</Typography>
            <Typography variant="body1" fontWeight={700}>
              {totalSum.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />
        </Box>
      </Box>
      <OutOfStockModal
        open={showOutOfStockModal}
        onClose={() => setShowOutOfStockModal(false)}
        items={outOfStockItems}
      />
    </Container>
  );
}
