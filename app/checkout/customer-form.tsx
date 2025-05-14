"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { createOrder, createUser } from "../admin/action";
import { useCart } from "@/hooks/useCart";

const customerSchema = z.object({
  name: z.string().min(1, "Du måste fylla i ditt namn"),
  address: z.string().min(1, "Du måste fylla i en adress"),
  zipcode: z.string().regex(/^\d{5}$/, "Postkoden måste vara exakt 5 siffror"),
  city: z.string().min(1, "Du måste fylla i en stad"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Ogiltigt telefonnummer"),
});

export default function CustomerForm() {
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
    // uppdatera värdet när användaren skriveer i fältet
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validerar hela schemat
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
    return `${Date.now()}`;
  };
  const orderNr = generateOrderNumber();

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = customerSchema.safeParse(formData);

    if (!result.success) {
      // konvertera zod felen till objekt att lagra namnen på fälten
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.keys(newErrors).reduce((acc, key) => {
          const typedKey = key as keyof typeof newErrors;
          acc[typedKey] = newErrors[typedKey]?.[0] ?? ""; // första error meddelandet
          // acc (short for accumulator) is the object that collects and stores the formatted errors.
          return acc;
        }, {} as Record<keyof typeof formData, string>) // extra fluff för typescript
      );

      // om det fanns nåt fel

      console.log("Formuläret innehåller fel, avbryter!");
      return;
    }

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        formDataObj.append(key, value)
      );

      const userResponse = await createUser(formDataObj);
      if (!userResponse.success) {
        throw new Error("User creation failed");
      }

      const order = await createOrder(userResponse.user.id, cartItems);

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
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container sx={{ mb: 3 }}>
      <Typography variant="h1" sx={{ textAlign: "left", ml: { sx: 1, md: 2 } }}>
        Leverans & Betalning
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Box
          component="form"
          data-cy="customer-form"
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
              Namn
            </FormLabel>
            <TextField
              size="small"
              slotProps={{ htmlInput: { "data-cy": "customer-name" } }}
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
              helperText={
                errors.name ? (
                  <FormHelperText data-cy="customer-name-error">
                    {errors.name}
                  </FormHelperText>
                ) : null
              }
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
              Leveransadress
            </FormLabel>
            <TextField
              size="small"
              slotProps={{ htmlInput: { "data-cy": "customer-address" } }}
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
              helperText={
                errors.address ? (
                  <FormHelperText data-cy="customer-address-error">
                    {errors.address}
                  </FormHelperText>
                ) : null
              }
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
                Postkod
              </FormLabel>
              <TextField
                size="small"
                slotProps={{ htmlInput: { "data-cy": "customer-zipcode" } }}
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
                helperText={
                  errors.zipcode ? (
                    <FormHelperText data-cy="customer-zipcode-error">
                      {errors.zipcode}
                    </FormHelperText>
                  ) : null
                }
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
                Stad
              </FormLabel>
              <TextField
                size="small"
                slotProps={{ htmlInput: { "data-cy": "customer-city" } }}
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
                helperText={
                  errors.city ? (
                    <FormHelperText data-cy="customer-city-error">
                      {errors.city}
                    </FormHelperText>
                  ) : null
                }
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
              E-post
            </FormLabel>
            <TextField
              size="small"
              slotProps={{ htmlInput: { "data-cy": "customer-email" } }}
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
              helperText={
                errors.email ? (
                  <FormHelperText data-cy="customer-email-error">
                    {errors.email}
                  </FormHelperText>
                ) : null
              }
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
              Telefonnummer
            </FormLabel>
            <TextField
              size="small"
              slotProps={{ htmlInput: { "data-cy": "customer-phone" } }}
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
              helperText={
                errors.phone ? (
                  <FormHelperText data-cy="customer-phone-error">
                    {errors.phone}
                  </FormHelperText>
                ) : null
              }
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
            Fortsätt till betalning
          </Button>
          <Snackbar
            open={open}
            message="Beställning genomförd!"
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
            <Typography variant="body1">Delsumma:</Typography>
            <Typography variant="body1">{totalSum.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Leverans:</Typography>
            <Typography variant="body1">{formData.address}</Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Totalt:</Typography>
            <Typography variant="body1" fontWeight={700}>
              {totalSum.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.5)" }} />
        </Box>
      </Box>
    </Container>
  );
}
