import { useState } from "react";
import { Box, Flex, Heading, Text, Image, HStack } from "@chakra-ui/react";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import FilterPill from "../../../../components/Utility/FilterPill.jsx";
import { FiClock } from "react-icons/fi";

export default function ReviewSection() {
  const [filterStar, setFilterStar] = useState(null);

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      date: "30/12/2024 13:39",
      comment: "Tuyệt vời!",
      imageUrl:
        "https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 3,
      date: "20/4/2024 15:27",
      comment: "Ổn, không có gì đặc biệt.",
    },
    {
      id: 3,
      user: "Lê Văn C",
      rating: 1,
      date: "09/03/2023 23:57",
      comment: "Không hài lòng.",
    },
    {
      id: 4,
      user: "Hoàng Thị D",
      rating: 4,
      date: "31/12/2024 13:39",
      comment: "Hài lòng với chất lượng, pin khá ổn. Giao hàng nhanh.",
    },
  ];

  // Lọc review theo số sao (nếu filterStar=null => hiển thị tất cả)
  const filteredReviews = filterStar
    ? reviews.filter((r) => r.rating === filterStar)
    : reviews;

  const handleFilterAll = () => {
    setFilterStar(null);
  };

  const handleStarFilter = (star) => {
    setFilterStar(star);
  };

  return (
    <Box mt={6} p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Heading fontSize="20px" mb={4}>
        Đánh giá thiết kế
      </Heading>

      {/* Thanh lọc ở trên: Tất cả, rồi 5 sao -> 1 sao */}
      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>
          Lọc theo
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {/* Tất cả */}
          <FilterPill
            label="Tất cả"
            isActive={!filterStar}
            onClick={handleFilterAll}
          />
          {[5, 4, 3, 2, 1].map((star) => (
            <FilterPill
              key={star}
              label={`${star} Sao`}
              isActive={filterStar === star}
              onClick={() => handleStarFilter(star)}
            />
          ))}
        </Flex>
      </Box>

      {/* Danh sách đánh giá */}
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <Box key={review.id} mb={6} borderBottom="1px solid #E2E8F0" pb={4}>
            <Flex alignItems="center" mb={1}>
              <Text fontWeight="bold" mr={2}>
                {review.user}
              </Text>
              <HStack spacing={1}>
                <FiClock size={12} color="gray.600" />
                <Text fontSize="sm" color="gray.600">
                  {review.date}
                </Text>
              </HStack>
            </Flex>

            {/* Số sao */}
            <Box mb={2}>
              <StarRating rating={review.rating} />
            </Box>

            {/* Nội dung đánh giá */}
            <Text mb={2}>{review.comment}</Text>

            {/* Ảnh đính kèm (nếu có) */}
            {review.imageUrl && (
              <Image
                src={review.imageUrl}
                alt="Ảnh đánh giá"
                maxW="200px"
                borderRadius="md"
              />
            )}
          </Box>
        ))
      ) : (
        <Text>Không có đánh giá phù hợp</Text>
      )}
    </Box>
  );
}
