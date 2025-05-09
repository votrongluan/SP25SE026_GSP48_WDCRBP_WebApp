import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  Icon,
  Avatar,
  Link,
  Tooltip,
  Select,
  Button,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Center,
} from "@chakra-ui/react";
import { FiStar, FiSearch, FiExternalLink } from "react-icons/fi";
import { useState, useMemo } from "react";
import { format, parseISO, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export default function ReviewsTable({ reviews = [] }) {
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sort and filter reviews
  const filteredAndSortedReviews = useMemo(() => {
    // First, filter reviews
    let result = [...reviews];

    if (filterValue) {
      const searchText = filterValue.toLowerCase();
      result = result.filter(
        (review) =>
          (review.username &&
            review.username.toLowerCase().includes(searchText)) ||
          (review.comment &&
            review.comment.toLowerCase().includes(searchText)) ||
          (review.serviceName &&
            review.serviceName.toLowerCase().includes(searchText)) ||
          (review.woodworkerResponse &&
            review.woodworkerResponse.toLowerCase().includes(searchText))
      );
    }

    // Then, sort reviews
    result.sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];

      // Special handling for dates
      if (sortField === "createdAt" || sortField === "responseAt") {
        fieldA = new Date(fieldA || 0).getTime();
        fieldB = new Date(fieldB || 0).getTime();
      }

      // Special handling for text fields
      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      // Numerical comparison (including dates converted to timestamps)
      if (sortDirection === "asc") {
        return fieldA - fieldB;
      } else {
        return fieldB - fieldA;
      }
    });

    return result;
  }, [reviews, filterValue, sortField, sortDirection]);

  // Pagination
  const pageCount = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);
  const currentItems = filteredAndSortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có";
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return "Không xác định";
      return format(date, "dd/MM/yyyy HH:mm", { locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const color = i < rating ? "yellow.400" : "gray.300";
      stars.push(<Icon key={i} as={FiStar} color={color} />);
    }
    return <HStack spacing={1}>{stars}</HStack>;
  };

  if (reviews.length === 0) {
    return (
      <Box>
        <Heading size="md" mb={4}>
          Danh sách đánh giá
        </Heading>
        <Center h="200px">
          <Text color="gray.500">Chưa có đánh giá nào cho xưởng mộc này</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="md" mb={4}>
        Danh sách đánh giá
      </Heading>

      <Flex mb={4} justifyContent="space-between" flexWrap="wrap">
        {/* Search input */}
        <InputGroup maxW="300px" mb={{ base: 2, md: 0 }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Tìm kiếm theo tên, nội dung..."
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setCurrentPage(1); // Reset to first page when filtering
            }}
          />
        </InputGroup>

        {/* Sort select */}
        <HStack>
          <Text>Sắp xếp theo:</Text>
          <Select
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
              setCurrentPage(1);
            }}
            w="auto"
          >
            <option value="createdAt">Ngày đánh giá</option>
            <option value="rating">Đánh giá</option>
            <option value="username">Tên người dùng</option>
            <option value="responseAt">Ngày phản hồi</option>
          </Select>
          <Button
            size="sm"
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </Button>
        </HStack>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort("username")} cursor="pointer">
                Người dùng
              </Th>
              <Th onClick={() => handleSort("rating")} cursor="pointer">
                Đánh giá
              </Th>
              <Th onClick={() => handleSort("serviceName")} cursor="pointer">
                Dịch vụ
              </Th>
              <Th onClick={() => handleSort("createdAt")} cursor="pointer">
                Ngày đánh giá
              </Th>
              <Th>Nội dung</Th>
              <Th>Phản hồi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((review) => (
              <Tr key={review.reviewId}>
                <Td>
                  <HStack>
                    <Avatar
                      size="sm"
                      name={review.username}
                      src={review.userImgUrl}
                    />
                    <Text>{review.username}</Text>
                  </HStack>
                </Td>
                <Td>{renderStarRating(review.rating)}</Td>
                <Td>
                  {review.serviceName || (
                    <Text as="i" color="gray.500">
                      Không có
                    </Text>
                  )}
                </Td>
                <Td>{formatDate(review.createdAt)}</Td>
                <Td maxW="200px">
                  <Tooltip label={review.comment}>
                    <Text noOfLines={2}>{review.comment}</Text>
                  </Tooltip>
                </Td>
                <Td maxW="200px">
                  {review.woodworkerResponse ? (
                    <Tooltip label={review.woodworkerResponse}>
                      <Text noOfLines={2}>{review.woodworkerResponse}</Text>
                    </Tooltip>
                  ) : (
                    <Text as="i" color="gray.500">
                      Chưa có phản hồi
                    </Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      {pageCount > 1 && (
        <Flex mt={4} justifyContent="center">
          <HStack>
            <Button
              size="sm"
              onClick={() => setCurrentPage(1)}
              isDisabled={currentPage === 1}
            >
              Đầu
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Trước
            </Button>

            <Text>
              Trang {currentPage} / {pageCount}
            </Text>

            <Button
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              isDisabled={currentPage === pageCount}
            >
              Sau
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentPage(pageCount)}
              isDisabled={currentPage === pageCount}
            >
              Cuối
            </Button>
          </HStack>
        </Flex>
      )}
    </Box>
  );
}
