import GoBackButton from "@/app/components/buttons/go-back-button";
import { prisma } from "@/prisma/db";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import AddToCartButton from "../../../components/buttons/add-to-cart-button";

interface Props {
  params: Promise<{ articleNumber: string; title: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { articleNumber, title } = await params;
  if (!articleNumber) {
    return <h1>Product was not found</h1>;
  }
  const decodedTitle = decodeURIComponent(title);

  const product = await prisma.product.findUnique({
    where: { articleNumber },
    include: { categories: true },
  });

  if (!product) {
    return <h1>Product was not found</h1>;
  }

  return (
    <Container
      sx={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flexStart",
        position: "relative",
        overflow: "visible",
        marginY: 2,
      }}
    >
      <GoBackButton />
      <Box
        component="main"
        sx={{
          padding: 4,
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          margin: "2rem 0",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "70%", sm: "70%", md: "70%" },
            maxWidth: "400px",
          }}
        >
          <Image
            src={product.image.replace("public/", "/")}
            alt={product.title}
            width={400}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { sx: 40, sm: 40, md: 50 } }}
          >
            {product.title}
          </Typography>{" "}
          <Typography variant="h6" sx={{ py: 2, fontSize: "15px" }}>
            Category:{" "}
            {product.categories
              .map((cat: { name: string }) => cat.name)
              .join(", ")}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Price: {product.price} €
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: product.stock < 5 ? "error.main" : "inherit",
            }}
          >
            {product.stock === 0
              ? "Out of stock"
              : product.stock < 5
              ? `Only ${product.stock} left in stock`
              : `In stock: ${product.stock}`}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              width: "100%",
              mt: 2,
            }}
          >
            <AddToCartButton product={product} disabled={product.stock === 0} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
