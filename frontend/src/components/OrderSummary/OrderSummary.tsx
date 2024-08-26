import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import { ProductUtils, ProductDetails } from "../../interface/types";
import { getAllProducts, getProductById } from "../../api/AllProducts";

const OrderSummary = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const productIds = response.data.results.map((product) =>
          product.id.toString()
        );

        // Fetch details for each product
        const productDetailsPromises = productIds.map((id) =>
          getProductById(id)
        );
        const productDetails = await Promise.all(productDetailsPromises);

        setProducts(productDetails);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      {/* Left Panel */}
      <Box sx={{ flex: 1, marginRight: 4 }}>
        <Typography variant="h4" gutterBottom>
          <strong>Hesabım</strong>
        </Typography>
        <List>
          <ListItem>Hesap Bilgilerim</ListItem>
          <ListItem>Siparişlerim</ListItem>
          <ListItem>Adreslerim</ListItem>
        </List>
      </Box>

      {/* Right Panel */}
      <Box sx={{ flex: 4, display: "flex", flexDirection: "row" }}>
        {/* Order Items Panel */}
        <Box sx={{ flex: 1, marginRight: 4 }}>
          <Typography variant="h6" gutterBottom>
            Sipariş Teslim Edildi
          </Typography>
          <Typography variant="body2" gutterBottom>
            14 Aralık 2022 Tarihinde Sipariş Verildi - 290405 numaralı sipariş
          </Typography>
          <Divider sx={{ marginBottom: 2 }} /> {/* Çizgi eklendi */}
          <Box sx={{ marginY: 2 }}>
            {/* Order Items */}
            <List>
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`https://fe1111.projects.academy.onlyjs.com${ProductUtils.getMainImage(
                        product
                      )}`}
                      alt={product.name}
                      width="80"
                      height="80"
                    />
                    <Box sx={{ marginLeft: 2 }}>
                      <Typography>{product.name} x 2</Typography>
                      <Typography>
                        {product.variants[0].price.total_price} TL
                      </Typography>
                      <Typography>
                        Boyut: {product.variants[0].size.total_services} Adet
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>

        {/* Address, Payment, Summary and Help Panel */}
        <Box sx={{ flex: 1 }}>
          <Divider sx={{ marginTop: 8 }} /> {/* Çizgi eklendi */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6">Adres</Typography>
            <Typography>Uğur İlter</Typography>
            <Typography>
              Barbaros, Nikahale Atasehir Batı, Begonya Sk. No:12, 34746
              Atasehir/İstanbul
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 2 }} /> {/* Çizgi eklendi */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6">Ödeme</Typography>
            <Typography>Kredi Kartı - 770 TL</Typography>
            <Typography>**** **** **** **61</Typography>
          </Box>
          <Divider sx={{ marginBottom: 2 }} /> {/* Çizgi eklendi */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6">Özet</Typography>
            <Typography>Ara Toplam: 856 TL</Typography>
            <Typography>Kargo: 0 TL</Typography>
            <Typography>Toplam Vergi: 8 TL</Typography>
            <Typography>Yüzde 10 İndirim: 86 TL</Typography>
            <Typography>Toplam: 770 TL</Typography>
          </Box>
          <Divider sx={{ marginBottom: 2 }} /> {/* Çizgi eklendi */}
          <Box>
            <Typography variant="body1">
              <strong>Yardıma mı ihtiyacınız var?</strong>
            </Typography>
            <Typography variant="body2">
              <b>Sıkça Sorulan Sorular</b>
            </Typography>
            <Typography variant="body2">
              <b>Satış Sözleşmesi</b>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummary;
