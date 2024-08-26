import React from "react";
import { ProductDetails } from "../../interface/types"; // Adjust the import path as necessary
import { Grid } from "@mui/material";
import { ProductUtils } from "../../interface/types";

interface ProductImageProps {
  product: ProductDetails;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => (
  <Grid item xs={12} md={6} sx={{boxShadow:'none' }}>
    <img
      src={`https://fe1111.projects.academy.onlyjs.com${ProductUtils.getMainImage(
        product
      )}`}
      alt="Product Image"
      style={{ width: "100%", height: "auto" }}
    />
  </Grid>
);

export default ProductImage;
