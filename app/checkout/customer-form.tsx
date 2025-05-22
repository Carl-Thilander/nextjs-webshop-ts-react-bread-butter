"use client";

import { useCart } from "@/hooks/useCart";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { submitOrder } from "../admin/action";

const customerSchema = z.object({
  name: z.string().min(1, "Du måste fylla i ditt namn"),
  address: z.string().min(1, "Du måste fylla i en adress"),
  zipcode: z.string().regex(/^\d{5}$/, "Postkoden måste vara exakt 5 siffror"),
  city: z.string().min(1, "Du måste fylla i en stad"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Ogiltigt telefonnummer"),
});

export default function CustomerForm() {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   }
  // }, [status]);
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
      console.log("Formuläret innehåller fel, avbryter!");
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
        Leverans & Betalning
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
              Namn
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
              helperText={
                errors.name ? (
                  <FormHelperText>{errors.name}</FormHelperText>
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
                  <FormHelperText>{errors.address}</FormHelperText>
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
                    <FormHelperText>{errors.zipcode}</FormHelperText>
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
                    <FormHelperText>{errors.city}</FormHelperText>
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
                  <FormHelperText>{errors.email}</FormHelperText>
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
                  <FormHelperText>{errors.phone}</FormHelperText>
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
