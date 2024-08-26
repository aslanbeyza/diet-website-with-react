import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductCardProps } from "../../interface/types"; // Make sure to import the type
import StarRating from '../StarRating/StarRating';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product-details/${product.id}`); // Adjust the URL based on your routing setup
  };

  return (
    <Card onClick={handleCardClick} sx={{
      cursor: "pointer",
      height: "440px", // Fixed height for all cards
      boxShadow: "none",
      display: 'flex',
      flexDirection: 'column', // Stack children vertically
      borderRadius:'none',
    }}>
      <CardMedia
        sx={{
          height: "50%", // Fixed height for the image
          width: "100%",
          objectFit: "cover", // Cover the entire area
          borderRadius:'none',
        }}
        component="img"
        image={`https://fe1111.projects.academy.onlyjs.com/${product.photo_src}`}
        alt={product.name}
      />
      <CardContent sx={{
        textAlign: "center",
        flex: 1, // Take up remaining space
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space content evenly
        alignItems: 'center',
        padding: '16px', // Add padding for better spacing
        overflow: "hidden", // Ensure no scrollbars appear
      }}>
        <Typography variant="h6" sx={{ 
          marginBottom: '8px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', // Allow text to wrap
          lineHeight: '1.2rem', // Control line height for better spacing
        }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ 
          marginBottom: '8px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', // Allow text to wrap
          lineHeight: '1.2rem', // Control line height for better spacing
        }}>
          {product.short_explanation}
        </Typography>
        <Typography variant="body2" sx={{ 
          marginBottom: '8px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', // Allow text to wrap
          lineHeight: '1.2rem', // Control line height for better spacing
        }}>
        {/*   {product.average_star} */} <StarRating value={4}/>
        </Typography>
        <Typography variant="body2" sx={{ 
          marginBottom: '8px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', // Allow text to wrap
          lineHeight: '1.2rem', // Control line height for better spacing
        }}>
          {product.comment_count} Yorum
        </Typography>
        <Typography variant="h6" sx={{ 
          fontSize: "1.5rem",
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'normal', // Allow text to wrap
          lineHeight: '1.2rem', // Control line height for better spacing
        }}>
          {product.price_info.total_price} TL
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
