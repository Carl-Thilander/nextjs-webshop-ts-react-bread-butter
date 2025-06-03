"use client";
import { Box, Container, Grid2, Link } from "@mui/material";
import { useState } from "react";
import ProductCard from "./product-card";
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
  currentCategoryName?: string;
}

export default function ProductFilter({
  products,
  categories,
}: ProductFilterProps) {
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
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "3rem",
        }}
      >
        <Box
          id={id}
          component="main"
          sx={{
            flexGrow: 1,
            borderRadius: "0.5rem",
            padding: 4,
          }}
        >
          <Grid2
            container
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
            rowSpacing={{ xs: 3, sm: 4, md: 5 }}
            columnSpacing={{ xs: 12, sm: 4, md: 4 }}
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
