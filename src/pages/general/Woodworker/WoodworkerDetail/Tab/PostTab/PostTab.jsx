import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import ImageListSelector from "../../../../../../components/Utility/ImageListSelector.jsx";
import RelativeTime from "../../../../../../components/Utility/RelativeTime.jsx";

const posts = [
  {
    post_id: 1,
    description: "Đây là mô tả của bài viết",
    img_Urls:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png;https://i.pinimg.com/1200x/4b/3f/e0/4b3fe011ed434521bb7d9d1ccd843ad4.jpg",
    created_at: "2025-03-19T12:00:00Z",
    title: "Dự án chế tác gỗ 1",
  },
  {
    post_id: 2,
    description: "Bài viết khác về dự án chế tác gỗ",
    img_Urls:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png;https://i.pinimg.com/1200x/4b/3f/e0/4b3fe011ed434521bb7d9d1ccd843ad4.jpg",
    created_at: "2025-03-18T10:00:00Z",
    title: "Dự án chế tác gỗ 2",
  },
  // Add more posts as needed
];

export default function PostTab() {
  return (
    <Stack mt={6} spacing={6}>
      {posts.map((post) => (
        <Flex justifyContent="center" key={post.post_id}>
          <Box
            w="100%"
            maxW="680px"
            p={5}
            bgColor="white"
            boxShadow="md"
            borderRadius="10px"
          >
            <HStack>
              <Text fontSize="20px" fontWeight="bold">
                {post.title}
              </Text>

              <Spacer />

              <Box>
                <RelativeTime dateString={post.created_at} />
              </Box>
            </HStack>

            <Text mt={4} mb={2}>
              {post.description}
            </Text>

            <ImageListSelector imgUrls={post.img_Urls} />
          </Box>
        </Flex>
      ))}
    </Stack>
  );
}
