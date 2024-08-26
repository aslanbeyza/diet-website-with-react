import './Footer.css';
import { useState } from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import StarRating from '../StarRating/StarRating';

type Section = 'products' | 'categories' | 'popular';

const Footer = () => {
  const [accordionOpen, setAccordionOpen] = useState<Record<Section, boolean>>({
    products: false,
    categories: false,
    popular: false,
  });

  const toggleAccordion = (section: Section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <Grid container justifyContent="center" className="allContainer">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div className="footer-text">
              <Typography variant="body2" mb={2} textAlign="start" ml={2}>
                <StarRating value={0} />
                (140.000+)
              </Typography>
              <Typography variant="body2" mb={6} fontWeight={500} lineHeight={2} fontSize={{ xs: 16, sm: 18, md: 20 }}>
                LABORATUVAR TESTLİ ÜRÜNLER AYNI GÜN & ÜCRETSİZ KARGO MEMNUNİYET GARANTİSİ
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="body2" mb={6} className="additional-text" fontSize={{ xs: 14, sm: 16 }}>
              200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi seveceğinize eminiz. Eğer herhangi
              bir sebeple memnun kalmazsan, bizimle iletişime geçtiğinde çözüme kavuşturacağız.
            </Typography>
          </Grid>
          <Grid container item xs={12} md={4} lg={6} spacing={2} className="itemContainer">
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6" onClick={() => toggleAccordion('products')} className="accordion-toggle">
                Ürünler
              </Typography>
              <ul className={`footer-list ${accordionOpen.products ? 'active' : ''}`}>
                <li><Link href="#">Whey Protein</Link></li>
                <li><Link href="#">Cream of Rice</Link></li>
                <li><Link href="#">Creatine</Link></li>
                <li><Link href="#">BCAA+</Link></li>
                <li><Link href="#">Pre-Workout</Link></li>
                <li><Link href="#">Fitness Paketi</Link></li>
                <li><Link href="#">Collagen</Link></li>
                <li><Link href="#">Günlük Vitamin Paketi</Link></li>
                <li><Link href="#">ZMA</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6" onClick={() => toggleAccordion('categories')} className="accordion-toggle">
                Kategoriler
              </Typography>
              <ul className={`footer-list ${accordionOpen.categories ? 'active' : ''}`}>
                <li><Link href="#">Protein</Link></li>
                <li><Link href="#">Spor Gıdaları</Link></li>
                <li><Link href="#">Sağlık</Link></li>
                <li><Link href="#">Gıda</Link></li>
                <li><Link href="#">Vitamin</Link></li>
                <li><Link href="#">Aksesuar</Link></li>
                <li><Link href="#">Tüm Ürünler</Link></li>
                <li><Link href="#">Paketler</Link></li>
                <li><Link href="#">Lansmana Özel Fırsatlar</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6" onClick={() => toggleAccordion('popular')} className="accordion-toggle">
                Popüler Ürünler
              </Typography>
              <ul className={`footer-list ${accordionOpen.popular ? 'active' : ''}`}>
                <li><Link href="#">Whey Protein</Link></li>
                <li><Link href="#">Cream of Rice</Link></li>
                <li><Link href="#">Creatine</Link></li>
                <li><Link href="#">BCAA+</Link></li>
                <li><Link href="#">Pre-Workout</Link></li>
                <li><Link href="#">Fitness Paketi</Link></li>
                <li><Link href="#">Collagen</Link></li>
                <li><Link href="#">Günlük Vitamin Paketi</Link></li>
                <li><Link href="#">ZMA</Link></li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
