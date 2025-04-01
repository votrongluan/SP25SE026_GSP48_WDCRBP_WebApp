import { useState } from "react";
import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/react";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import FilterPill from "../../../../components/Utility/FilterPill.jsx";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import { FiClock } from "react-icons/fi";
import { useGetProductReviewsQuery } from "../../../../services/reviewApi.js";
import { useParams } from "react-router-dom";

// Component to render review items (will be passed to Pagination)
const ReviewList = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((review) => (
          <Box
            key={review.reviewId}
            mb={6}
            borderBottom="1px solid #E2E8F0"
            pb={4}
          >
            <Flex alignItems="center" mb={1}>
              <Text fontWeight="bold" mr={2}>
                {review.username}
              </Text>
              <HStack spacing={1}>
                <FiClock size={12} color="gray.600" />
                <Text fontSize="sm" color="gray.600">
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}{" "}
                  {new Date(review.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </HStack>
            </Flex>

            {/* Số sao */}
            <Box mb={2}>
              <StarRating rating={review.rating} />
            </Box>

            {/* Nội dung đánh giá */}
            <Text mb={2}>{review.comment}</Text>

            {/* Phản hồi của woodworker nếu có */}
            {review.woodworkerResponseStatus && (
              <Box mt={2} pl={4} borderLeft="2px solid #E2E8F0">
                <Text fontWeight="bold" fontSize="sm">
                  Phản hồi:
                </Text>
                <Text fontSize="sm">{review.woodworkerResponse}</Text>
                <Text fontSize="xs" color="gray.600">
                  {new Date(review.responseAt).toLocaleDateString("vi-VN")}{" "}
                  {new Date(review.responseAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Text>Không có đánh giá phù hợp</Text>
      )}
    </>
  );
};

export default function ReviewSection() {
  const [filterStar, setFilterStar] = useState(null);
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductReviewsQuery(id);

  const reviews = data?.data || [];

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

  if (isLoading) return <Box>Đang tải đánh giá...</Box>;
  if (isError) return <Box>Có lỗi khi tải đánh giá</Box>;

  return (
    <Box mt={6} p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Heading fontSize="20px" mb={4}>
        Đánh giá sản phẩm
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

      {/* Danh sách đánh giá với phân trang */}
      <Pagination
        dataList={filteredReviews}
        DisplayComponent={ReviewList}
        itemsPerPage={5}
      />
    </Box>
  );
}
