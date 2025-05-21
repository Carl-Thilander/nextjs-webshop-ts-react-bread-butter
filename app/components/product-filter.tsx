"use client";
import { Box, Container, Grid2, Link } from "@mui/material";
import { useState } from "react";
import ProductCard from "../product/[articleNumber]/[title]/product-card";
import CategorySection from "./category-section";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  articleNumber: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categories: Category[];
}

interface ProductFilterProps {
  products: Product[];
  categories: Category[];
}

export default function ProductFilter({ products, categories }: ProductFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts =
    selected.length > 0
      ? products.filter((p) =>
          p.categories.some((c) => selected.includes(c.name))
        )
      : products;
    const id = "test";

  return (
    <>
      <CategorySection
        categories={categories}
        selected={selected}
        onSelect={handleSelect}
      />
       <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          minHeight: "100vh",
        }}
      >
        <Box
          id={id}
          component="main"
          sx={{
            flexGrow: 1,
            borderRadius: "0.5rem",
            padding: 4, //Mått vi förmodligen vill använda i hela appen. (1=8px)
            bgcolor: "background.paper", //Funktion för att hämta våra färger från theme.
            margin: "2rem 0",
            width: "100%",
          }}
        >
          <Grid2
            container
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 6, md: 4 }}
          >
            {filteredProducts.map((product) => (
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
          </Grid2>
        </Box>
      </Container> 
    </>
  );
}