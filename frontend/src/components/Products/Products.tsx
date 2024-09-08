import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../api/AllProducts";
import { Container, Grid, Typography } from "@mui/material";
import { Product } from "../../interface/types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts(); // Artık page parametresi yok
        setProducts(result.data); // result.data.results yerine result.data
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchProducts();
  }, []); // page bağımlılığı kaldırıldı

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" textAlign="center" my={4}>
        Protein
      </Typography>
      <Grid container spacing={2} sx={{ width: "80%" }}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <ProductCard
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                rating:product.rating,
                description:product.description,
                short_explanation: product.short_explanation,
                price_info: {
                  profit: product.price_info.profit,
                  total_price: product.price_info.total_price,
                  discounted_price: product.price_info.discounted_price,
                  price_per_servings: product.price_info.price_per_servings,
                  discount_percentage: product.price_info.discount_percentage,
                },
                photo_src: product.photo_src,
                comment_count: product.comment_count,
                average_star: product.average_star,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
