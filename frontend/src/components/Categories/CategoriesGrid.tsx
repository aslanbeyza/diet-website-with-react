import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';

const categories = [
  { title: 'PROTEİN', image: 'assets/Homepage/1.png' },
  { title: 'VİTAMİNLER', image: 'assets/Homepage/2.png' },
  { title: 'SAĞLIK', image: 'assets/Homepage/3.png' },
  { title: 'SPOR GIDALARI', image: 'assets/Homepage/4.png' },
  { title: 'GIDA', image: 'assets/Homepage/5.png' },
  { title: 'TÜM ÜRÜNLER', image: 'assets/Homepage/6.png' }
];

const CategoryCard = ({ title, image }: { title: string; image: string }) => (
  <Card sx={{ position: 'relative', marginTop: "25px", borderRadius: '10px', overflow: 'hidden', boxShadow: 3 }}>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        height: { xs: '120px', sm: '150px', md: '200px' }, // Farklı ekran boyutları için yükseklik ayarı
        objectFit: 'fill', // Resmin tam olarak karta sığmasını sağlar
      }}
    />
    <CardContent
      sx={{
        position: 'absolute',
        bottom: { xs: '-45%', sm: '-70px', md: '-21%' }, 
        left: '65%',
        transform: 'translate(-50%,-50%)', // İçeriği ortalamak için
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Farklı ekran boyutları için yazı boyutu ayarı
        }}
      >
        {title}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: '10px',
          fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Buton yazı boyutu ayarı
          padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' }, // Buton padding ayarı
          mb: { xs: '0px', sm: '20px', md: '20px' },
        }}
      >
        İNCELE
      </Button>
    </CardContent>
  </Card>
);

const CategoriesGrid = () => (
  <Container maxWidth="lg">
    <Grid container spacing={2} mb={6}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={4} key={category.title}>
          <CategoryCard title={category.title} image={category.image} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default CategoriesGrid;
