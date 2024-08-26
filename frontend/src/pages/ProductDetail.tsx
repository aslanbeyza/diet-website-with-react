import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  Grid,
  CircularProgress,
} from "@mui/material";
import { ProductDetails, Variant } from "../interface/types";
import { getProductById } from "../api/AllProducts";
import ProductImage from "../components/ProductDetail/ProductImage";
import ProductOptions from "../components/ProductDetail/ProductOptions";
import ProductBenefits from "../components/ProductDetail/ProductBenefits";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import BestSellers from "../components/BestSellers";
import CartDrawer from "../components/ProductDetail/CartDrawer";
import PDetails from "../components/ProductDetail/ProductDetails";
import AveragePoint from "../components/Rewiew/ReviewList/AvaragePoint";
import Pagination from "../components/Rewiew/ReviewList/Pagination";
import CommentForm from "../components/Rewiew/ReviewList/CommentForm";
import CommentList from "../components/Rewiew/ReviewList/CommentList";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedAroma, setSelectedAroma] = useState("Aromasız");
  const [count, setCount] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    { product: ProductDetails; quantity: number; selectedVariant: Variant }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) =>
            item.product.id === product.id &&
            item.selectedVariant.id === selectedVariant.id
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id &&
            item.selectedVariant.id === selectedVariant.id
              ? { ...item, quantity: item.quantity + count }
              : item
          );
        }
        return [...prevItems, { product, quantity: count, selectedVariant }];
      });
      setCartOpen(true);
    }
  };

  const handleCartQuantityChange = (
    product: ProductDetails,
    quantity: number
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === product.id &&
        item.selectedVariant.id === item.selectedVariant.id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (
    product: ProductDetails,
    selectedVariant: Variant
  ) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === product.id &&
            item.selectedVariant.id === selectedVariant.id
          )
      )
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const result = await getProductById(id);
          setProduct(result);
          setSelectedVariant(
            result.variants.length > 0 ? result.variants[0] : null
          );
        } catch (error) {
          setError("Ürün verisi çekme hatası");
          console.error("Ürün verisi çekme hatası:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Product ID is undefined");
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleAromaChange = (aroma: string) => {
    setSelectedAroma(aroma);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!product || !selectedVariant) {
    return <Typography>Ürün verileri yüklenirken bir hata oluştu.</Typography>;
  }

  const flavors /* tatlar*/ = [
    { name: "Aromasız", color: "#8d8d8d" },
    { name: "Çikolata", color: "#7B3F00" },
    { name: "Muz", color: "#FFEB3B" },
    { name: "Hindistan Cevizi", color: "#D2B48C" },
  ];

  // `sizeOptions`'ı string dizisi olarak dönüştür
  const sizeOptions: number[] = Array.from(
    new Set(product.variants.map((v) => v.size.pieces))
  );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "50px",
          boxShadow: "none",
        }}
      >
        <Card sx={{ width: "100%", padding: "20px", boxShadow: "none" }}>
          <Grid container spacing={3}>
            <ProductImage product={product} />
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {product.short_explanation}
              </Typography>
              <ProductOptions
                flavors={flavors}
                sizeOptions={sizeOptions}
                selectedAroma={selectedAroma}
                selectedVariant={selectedVariant}
                handleAromaChange={handleAromaChange}
                handleVariantChange={handleVariantChange}
                product={product}
              />
              <PDetails
                selectedVariant={selectedVariant}
                count={count}
                handleAddToCart={handleAddToCart}
                increase={increase}
                decrease={decrease}
              />
              <ProductBenefits />
              <hr />
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Card>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>SON GÖRÜNTÜLENEN ÜRÜNLER</h2>
      </div>
      <BestSellers />
      {/* deneeme allaha emanet burası */}
      <CommentList />
      <CommentForm />
      {/* deneme allaha emnaet burası */}
      <Container maxWidth="md">
        <AveragePoint productNo={0} /> {/* ProductNo'yu buradan geçirin */}
        <Pagination />
      </Container>
      <Typography variant="h6" gutterBottom textAlign="center" mt={3}>
        Çok Satanlar
      </Typography>
      <BestSellers />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={handleCartQuantityChange}
        removeItem={handleRemoveItem}
      />
    </Container>
  );
};
export default ProductDetail;
