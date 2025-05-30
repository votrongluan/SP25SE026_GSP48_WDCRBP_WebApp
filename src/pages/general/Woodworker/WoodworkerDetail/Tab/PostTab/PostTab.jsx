import {
  Box,
  Text,
  Stack,
  Flex,
  HStack,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import ImageListSelector from "../../../../../../components/Utility/ImageListSelector.jsx";
import RelativeTime from "../../../../../../components/Utility/RelativeTime.jsx";
import { useGetWoodworkerPostsQuery } from "../../../../../../services/postApi.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

// Component for expandable text with "Xem thêm"/"Thu gọn" functionality
const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text || text.length < 150) {
    // If text is short enough, just display it
    return (
      <Text whiteSpace="pre-wrap" mt={4} mb={2}>
        {text}
      </Text>
    );
  }

  return (
    <Box mt={4} mb={2}>
      <Text whiteSpace="pre-wrap" noOfLines={expanded ? undefined : 3}>
        {text}
      </Text>
      <Button
        size="sm"
        variant="link"
        colorScheme="brown"
        onClick={() => setExpanded(!expanded)}
        mt={2}
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
      </Button>
    </Box>
  );
};

export default function PostTab() {
  const { id } = useParams(); // Get woodworkerId from URL params
  const { data, isLoading, isError } = useGetWoodworkerPostsQuery(id);

  const posts = data?.data || [];

  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        Đã xảy ra lỗi khi tải dữ liệu bài viết.
      </Alert>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        Xưởng mộc này chưa có bài viết nào.
      </Alert>
    );
  }

  return (
    <Stack mt={6} spacing={6}>
      {posts.map((post) => (
        <Flex justifyContent="center" key={post.postId}>
          <Box
            w="100%"
            maxW="680px"
            p={5}
            bgColor="white"
            boxShadow="md"
            borderRadius="10px"
          >
            <Text fontSize="20px" fontWeight="bold">
              {post.title}
            </Text>

            <HStack>
              <Box ml="auto">
                <RelativeTime dateString={post.createdAt} />
              </Box>
            </HStack>

            <ExpandableText text={post.description} />

            <ImageListSelector imgUrls={post.imgUrls} />
          </Box>
        </Flex>
      ))}
    </Stack>
  );
}
