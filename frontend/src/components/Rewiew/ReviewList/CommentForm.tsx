import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode'; // veya import * as jwtDecode from 'jwt-decode';
import { CustomJwtPayload } from '../../../interface/ReviewModelTypes';



const CommentForm = () => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      const token = Cookies.get('authToken');
      console.log("TOKEN", token);
  
      const fullPath = window.location.pathname;
      const productNo = fullPath.substring(fullPath.lastIndexOf('/') + 1);
      console.log("Ürün ID'si:", productNo);
  
      let userId: string | undefined;
      if (token) {
          try {
              const decoded = jwtDecode<CustomJwtPayload>(token);
              console.log( "decode" ,decoded);
              userId = decoded.sub; // 'sub' kullanın
              console.log("Kullanıcı ID'si:", userId);
          } catch (error) {
              console.error('Token çözülürken hata oluştu:', error);
          }
      } else {
          console.error('Token bulunamadı.');
      }
      try {
          const response = await axios.post('http://localhost:5000/api/review', {
              description: comment,
              rating: rating,
              productId: productNo,
              userId: userId // kullanıcının id'sini dönsün
          }, {
              headers: {
                  Authorization: `Bearer ${token}`, // taşıyıcı token
                  'Content-Type': 'application/json' // Verilerin JSON formatında olduğunu belirtir
              }
          });
  
          console.log('Yorum başarıyla gönderildi:', response.data);
          setComment("");
          setRating(0);
      } catch (error) {
          console.error('Yorum gönderilirken hata oluştu:', error);
      }
  };
  
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '500px',
                mx: 'auto'
            }}
        >
            <Typography variant="h5" gutterBottom>
                Yorum Yap
            </Typography>
            <TextField
                label="Yorumunuz"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <TextField
                label="Puan"
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                fullWidth
                required
                inputProps={{ min: 1, max: 5 }}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Yorum Yap
            </Button>
        </Box>
    );
};

export default CommentForm;
