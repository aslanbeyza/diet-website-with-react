import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Review } from "../../../interface/ReviewModelTypes";

const CommentList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fullPath = window.location.pathname;
  const productNo = fullPath.substring(fullPath.lastIndexOf('/') + 1);

  useEffect(() => {
      const fetchReviews = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/review', {
                  params: { productId: productNo }
              });
              setReviews(response.data);
          } catch (error) {
              console.error('Yorumlar getirilirken hata oluştu:', error);
          }
      };

      fetchReviews();
  }, [productNo]);

  return (
      <Box>
          <Typography variant="h6" gutterBottom>
              Yorumlar
          </Typography>
          <ul>
              {reviews.map((review) => (
                  <li key={review.id}>
                      <Typography variant="body1">Puan: {review.rating}</Typography>
                      <Typography variant="body2">{review.description}</Typography>
                  </li>
              ))}
          </ul>
      </Box>
  );
};

export default CommentList;
