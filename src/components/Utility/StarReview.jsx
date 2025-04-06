import { Box, Text } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarReview({ totalStar, totalReviews }) {
  // Calculate rating, handle division by zero
  const calculatedRating = totalReviews > 0 ? totalStar / totalReviews : 0;
  // Normalize rating between 0-5
  const rating = !calculatedRating
    ? 0
    : calculatedRating > 5
    ? 5
    : calculatedRating < 0
    ? 0
    : calculatedRating;

  // Số sao đầy đủ
  const fullStars = Math.floor(rating);
  // Nếu phần thập phân >= 0.5 thì hiển thị 1 sao bán, nếu không thì 0
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  // Số sao rỗng còn lại để đủ 5 sao
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <Box display="flex" alignItems="center">
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
      {totalReviews > 0 && (
        <Text noOfLines={1} color="yellow.700" ml={2} fontSize="sm">
          {rating.toFixed(1)} ({totalReviews} đánh giá)
        </Text>
      )}
    </Box>
  );
}
