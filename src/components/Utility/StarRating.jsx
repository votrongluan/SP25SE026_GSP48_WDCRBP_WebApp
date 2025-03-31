import React from "react";
import { Box } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating }) {
  rating = !rating ? 0 : rating > 5 ? 5 : rating < 0 ? 0 : rating;

  // Số sao đầy đủ
  const fullStars = Math.floor(rating);
  // Nếu phần thập phân >= 0.5 thì hiển thị 1 sao bán, nếu không thì 0
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  // Số sao rỗng còn lại để đủ 5 sao
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <Box display="inline-flex" alignItems="center" color="yellow.400">
      {Array(fullStars)
        .fill("")
        .map((_, i) => (
          <Box key={`full-${i}`} mr={0.5}>
            <FaStar />
          </Box>
        ))}
      {halfStar === 1 && (
        <Box key="half" mr={0.5}>
          <FaStarHalfAlt />
        </Box>
      )}
      {Array(emptyStars)
        .fill("")
        .map((_, i) => (
          <Box key={`empty-${i}`} mr={0.5}>
            <FaRegStar />
          </Box>
        ))}
    </Box>
  );
}
