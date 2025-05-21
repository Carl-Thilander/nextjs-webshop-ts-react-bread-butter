import { db } from "@/prisma/db";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import CategorySection from "./components/category-section";
import Hero from "./components/hero";
import ProductCard from "./product/[articleNumber]/[title]/product-card";

export default async function Home() {
  const products = await db.product.findMany();

  // i parenteserna: {
  //   include: {
  //     categories: true,
  //   },
  // }

  const id = "test";
  return (
    <>
      <Hero />

      <CategorySection />
      <Container
      disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          id={id}
          component="main"
          sx={{
            flexGrow: 1,
            borderRadius: "0.5rem",
            padding: 4, //Mått vi förmodligen vill använda i hela appen. (1=8px)

          }}
        >
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
            rowSpacing={{ xs: 3, sm: 4, md: 5 }}
            columnSpacing={{ xs: 12, sm: 4, md: 4 }}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.articleNumber}/${encodeURIComponent(
                  product.title
                )}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
