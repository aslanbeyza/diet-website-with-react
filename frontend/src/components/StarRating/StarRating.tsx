import React from 'react';
import { Box } from '@mui/material';
import Star from './Star';

interface StarRatingProps {
  value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  const [rating, setRating] = React.useState<number>(parseInt(value.toString()) || 0);
  const [selection, setSelection] = React.useState<number>(0);

  const hoverOver = (event: React.MouseEvent<HTMLElement>) => {
    let val = 0;
    const target = event.target as HTMLElement;
    if (target && target.getAttribute('data-star-id')) {
      val = parseInt(target.getAttribute('data-star-id') || '0');
    }
    setSelection(val);
  };

  return (
    <Box
      onMouseOut={() => hoverOver({} as React.MouseEvent<HTMLElement>)}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        setRating(parseInt(target.getAttribute('data-star-id') || rating.toString()));
      }}
      onMouseOver={hoverOver}
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </Box>
  );
};

export default StarRating;
