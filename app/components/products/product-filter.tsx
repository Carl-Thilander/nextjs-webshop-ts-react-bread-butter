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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories.some((cat) => cat.name === selectedCategory)
      )
    : products;

  // Handler for category selection
  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <>
      <CategorySection
        categories={categories}
        selected={selectedCategory ? [selectedCategory] : []}
        onSelect={handleSelectCategory}
        currentCategoryName={selectedCategory || "Our Products"}
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