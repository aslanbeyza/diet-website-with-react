import "./style.css";
import { useState } from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import StarRating from "../StarRating/StarRating";

type Section = "products" | "categories" | "popular";

const Footer = () => {
  const [accordionOpen, setAccordionOpen] = useState<Record<Section, boolean>>({
    products: true,
    categories: false,
    popular: false,
  });

  const toggleAccordion = (section: Section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    console.log(accordionOpen);
  };
  return (
    <footer className="footer">
      <Container>
        <Grid container className="allContainer">
          <Grid md={12} sm={12} xs={12} className="starsGrid">
            <Typography variant="body2" mb={2} textAlign="start">
              <StarRating value={0} />
              (140.000+)
            </Typography>
          </Grid>
          <Grid
            className="textsWrapper"
            md={12}
            gap={{ xs: 3, sm: 10, md: 26 }}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                variant="body2"
                mb={6}
                textAlign="left"
                fontWeight={500}
                lineHeight={2}
                fontSize={{ xs: 16, sm: 18, md: 20 }}
              >
                LABORATUVAR TESTLİ ÜRÜNLER AYNI GÜN & ÜCRETSİZ KARGO MEMNUNİYET
                GARANTİSİ
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              
              <Typography
                variant="body2"
                lineHeight={2}
                textAlign="left"
                fontSize={{ xs: 14, sm: 16 }}
              >
                200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi
                seveceğinize eminiz. Eğer herhangi bir sebeple memnun kalmazsan,
                bizimle iletişime geçtiğinde çözüme kavuşturacağız.
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} className="itemContainer">
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              className="productFooter"
              sx={{ height: { xs: "auto", sm: "100%", md: "100%" } }}
            >
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("products")}
                className={`accordion-toggle ${
                  accordionOpen.products ? "open" : ""
                }`}
                fontWeight={500}
                sx={{ display: { xs: "flex", sm: "none", md: "none" } }}
              >
                OJS NUTRITION
              </Typography>
              <Typography variant="h6" className="logo">
                <img src="../../../public/assets/whitelogo.png" alt="Logo" />
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.products ? "active" : ""
                }`}
              >
                <li>
                  <Link href="#">Whey Protein</Link>
                </li>
                <li>
                  <Link href="#">Cream of Rice</Link>
                </li>
                <li>
                  <Link href="#">Creatine</Link>
                </li>
                <li>
                  <Link href="#">BCAA+</Link>
                </li>
                <li>
                  <Link href="#">Pre-Workout</Link>
                </li>
                <li>
                  <Link href="#">Fitness Paketi</Link>
                </li>
                <li>
                  <Link href="#">Collagen</Link>
                </li>
                <li>
                  <Link href="#">Günlük Vitamin Paketi</Link>
                </li>
                <li>
                  <Link href="#">ZMA</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={4} md={3} className="productFooter">
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("categories")}
                className={`accordion-toggle ${
                  accordionOpen.categories ? "open" : ""
                }`}
              >
                KATEGORİLER
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.categories ? "active" : ""
                }`}
              >
                <li>
                  <Link href="#">Protein</Link>
                </li>
                <li>
                  <Link href="#">Spor Gıdaları</Link>
                </li>
                <li>
                  <Link href="#">Sağlık</Link>
                </li>
                <li>
                  <Link href="#">Gıda</Link>
                </li>
                <li>
                  <Link href="#">Vitamin</Link>
                </li>
                <li>
                  <Link href="#">Aksesuar</Link>
                </li>
                <li>
                  <Link href="#">Tüm Ürünler</Link>
                </li>
                <li>
                  <Link href="#">Paketler</Link>
                </li>
                <li>
                  <Link href="#">Lansmana Özel Fırsatlar</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={4} md={3} className="productFooter">
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("popular")}
                className={`accordion-toggle ${
                  accordionOpen.popular ? "open" : ""
                }`}
              >
                POPÜLER ÜRÜNLER
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.popular ? "active" : ""
                }`}
              >
                <li>
                  <Link href="#">Whey Protein</Link>
                </li>
                <li>
                  <Link href="#">Cream of Rice</Link>
                </li>
                <li>
                  <Link href="#">Creatine</Link>
                </li>
                <li>
                  <Link href="#">BCAA+</Link>
                </li>
                <li>
                  <Link href="#">Pre-Workout</Link>
                </li>
                <li>
                  <Link href="#">Fitness Paketi</Link>
                </li>
                <li>
                  <Link href="#">Collagen</Link>
                </li>
                <li>
                  <Link href="#">Günlük Vitamin Paketi</Link>
                </li>
                <li>
                  <Link href="#">ZMA</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="body2" className="copyRight" textAlign="left">
        Copyright &copy; - Tüm Hakları Saklıdır.
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
